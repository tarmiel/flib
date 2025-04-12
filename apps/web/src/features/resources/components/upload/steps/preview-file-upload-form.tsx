import { Button } from '@/components/ui/button';
import { FileUploader } from '@/components/widgets/file-uploader';
import { useFileUpload } from '@/features/file-upload/api/upload-file';
import { X } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import type { ResourceUploadFormData } from '../schemas';

export const PreviewFileUploadForm = () => {
  const form = useFormContext<ResourceUploadFormData>();
  const { mutateAsync, isPending } = useFileUpload();

  const onUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    const { fileName: bucketFileName } = await mutateAsync(file);

    form.setValue('previewImageName', bucketFileName);
    if ('preview' in file) form.setValue('previewImageUrl', file.preview as string);
  };

  const onRemove = async (fileName: string) => {
    form.setValue('previewImageName', undefined);
    form.setValue('previewImageUrl', undefined);
  };

  const imageName = form.watch('previewImageName');
  const imageUrl = form.watch('previewImageUrl');

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Завантаження файлу ресурсу</h2>
        <FileUploader
          maxFileCount={1}
          maxSize={100 * 1024 * 1024}
          accept={{
            'image/*': [],
          }}
          onUpload={onUpload}
          disabled={isPending || !!imageName}
        />
        {imageUrl && imageName && (
          <ImagePreview url={imageUrl} name={imageName} onDelete={() => onRemove('')} />
        )}
      </div>
    </div>
  );
};

interface ImagePreviewProps {
  name?: string;
  url?: string;
  onDelete?: () => void;
}

const ImagePreview = ({ name, url, onDelete }: ImagePreviewProps) => {
  return (
    <div className="relative group w-full max-w-xs">
      <img
        src={url}
        alt={name || 'Зображення'}
        className="w-full h-auto rounded-lg shadow-md object-contain aspect-[3/4]"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = '/placeholder.svg';
        }}
      />

      <Button
        type={'button'}
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        onClick={onDelete}
        aria-label="Видалити зображення"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};
