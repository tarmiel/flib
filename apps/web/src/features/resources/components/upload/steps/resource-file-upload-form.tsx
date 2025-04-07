import { FileUploader } from '@/components/widgets/file-uploader';
import { UploadedFilesCard } from '@/components/widgets/file-uploader/uploaded-file-card';
import { useFormContext } from 'react-hook-form';
import type { ResourceUploadFormData } from '../schemas';
import { FILE_FORMAT } from '@/features/resources/lib/resources';
import { useFileUpload } from '@/features/file-upload/api/upload-file';
import { FormField, FormItem, FormMessage } from '@/components/ui/form';

const getFileFormat = (fileType: string) => {
  if (fileType.includes('pdf')) return FILE_FORMAT.PDF;
  if (fileType.includes('djvu')) return FILE_FORMAT.DJVU;
  return null;
};

function removeIdPrefix(filename: string): string {
  const regex = /^\d+-/;
  return filename.replace(regex, '');
}

export const ResourceFileUploadForm = () => {
  const form = useFormContext<ResourceUploadFormData>();
  const { mutateAsync, isPending } = useFileUpload();

  const onUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    const fileFormat = getFileFormat(file.type);
    const fileSize = file.size;
    if (!fileFormat) return;

    const { fileName: bucketFileName } = await mutateAsync(file);

    form.clearErrors(['fileName', 'fileFormat', 'fileSize']);
    form.setValue('fileName', bucketFileName);
    form.setValue('fileFormat', fileFormat);
    form.setValue('fileSize', String(fileSize));
  };

  const onRemove = async (fileName: string) => {
    console.log('onRemove', fileName);

    form.setValue('fileName', undefined);
    form.setValue('fileFormat', undefined);
    form.setValue('fileSize', undefined);

    console.log(form.getValues());
  };

  const name = form.watch('fileName');
  const format = form.watch('fileFormat');
  const size = form.watch('fileSize');

  const uploadedFile = name && format && size ? { name, format, size } : null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Завантаження файлу ресурсу</h2>
        <FormField
          control={form.control}
          name="fileName"
          render={({ formState: { errors } }) => (
            <FormItem>
              <FileUploader
                maxFileCount={1}
                maxSize={100 * 1024 * 1024}
                accept={{
                  // 'image/*': [],
                  'application/pdf': ['.pdf'],
                  'image/vnd.djvu': ['.djvu'],
                  'image/djvu': ['.djvu'],
                }}
                // progresses={progresses}
                onUpload={onUpload}
                disabled={isPending || !!uploadedFile}
              />
              <UploadedFilesCard
                uploadedFiles={uploadedFile ? [uploadedFile] : []}
                onRemove={onRemove}
              />
              <FormMessage>
                {errors.fileName?.message || errors.fileFormat?.message || errors.fileSize?.message}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
