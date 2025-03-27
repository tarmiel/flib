import { FileUploader } from '@/components/widgets/file-uploader';
import { UploadedFilesCard } from '@/components/widgets/file-uploader/uploaded-file-card';
import { useFormContext } from 'react-hook-form';
import type { ResourceUploadFormData } from '../schemas';

const getFileFormat = (fileType: string) => {
  if (fileType.includes('pdf')) return 'PDF';
  if (fileType.includes('djvu')) return 'DJVU';
  return 'IMAGE';
};

export const ResourceFileUploadForm = () => {
  const form = useFormContext<ResourceUploadFormData>();

  const onUpload = async (files: File[]) => {
    if (!files[0]) return;

    form.setValue('fileName', files[0].name);
    form.setValue('fileFormat', getFileFormat(files[0].type));
    // form.setValue('previewImageUrl', URL.createObjectURL(files[0]));
    console.log('onUpload', files);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Завантаження файлу ресурсу</h2>
        <FileUploader
          maxFileCount={1}
          maxSize={100 * 1024 * 1024}
          accept={{
            'image/*': [],
            'application/pdf': ['.pdf'],
            'image/vnd.djvu': ['.djvu'],
            'image/djvu': ['.djvu'],
          }}
          // progresses={progresses}
          onUpload={onUpload}
          // disabled={isUploading}
        />
        {/* <UploadedFilesCard uploadedFiles={uploadedFiles} /> */}
      </div>
    </div>
  );
};
