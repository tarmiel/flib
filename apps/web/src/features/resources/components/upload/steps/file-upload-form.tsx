import type React from 'react';

import { useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { FileUp, X } from 'lucide-react';

import type { ResourceFormValues } from '../resource-upload-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import {
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// Update the FileUploadForm component to handle editing mode
// Add isEditing prop to the interface
interface FileUploadFormProps {
  form: UseFormReturn<ResourceFormValues>;
  isEditing?: boolean;
}

export function FileUploadForm({ form, isEditing = false }: FileUploadFormProps) {
  const { control, setValue, watch } = form;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Watch file to update UI
  const file = watch('file');

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      // Check file size (limit to 100MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        // toast.error("File size should be less than 100MB")
        console.log('File size exceeded');
        return;
      }

      // Check file type
      const allowedTypes = [
        'application/pdf',
        'image/vnd.djvu',
        'image/x-djvu',
        'pdf',
        'djvu',
        // 'application/msword',
        // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];

      const fileType = selectedFile.type || selectedFile.name.split('.').pop()?.toLowerCase();

      if (!allowedTypes.includes(fileType ?? '')) {
        // toast.error("Please select a PDF, EPUB, DOC, or DOCX file")
        console.log('File type not allowed');
        return;
      }

      setValue('file', selectedFile, { shouldValidate: true });
    }
  };

  // Remove selected file
  const removeFile = () => {
    setValue('file', undefined, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Get file size in readable format
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">File Upload</h2>

        {isEditing && (
          <div className="bg-muted p-4 rounded-md mb-4">
            <p className="text-sm">
              {file
                ? "You've selected a new file to replace the existing one."
                : 'You can upload a new file to replace the existing one, or leave this empty to keep the current file.'}
            </p>
          </div>
        )}

        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
          <FileUp className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">
            {isEditing ? 'Replace Resource File' : 'Upload Resource File'}
          </h3>
          <p className="text-muted-foreground text-center mb-4">
            Drag and drop your file here, or click to browse
          </p>
          <Input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.djvu"
          />
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Browse Files
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            Supported formats: PDF, DJVU. Maximum file size: 100MB
          </p>
        </div>

        {file && (
          <div className="bg-muted rounded-md p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <FileUp className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground">({getFileSize(file.size)})</span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}

        {/* <FormField
          control={control}
          name="accessLevel"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Access Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="open" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Open Access - Available to everyone
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="restricted" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Restricted - Available to registered users only
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Private - Available to specific users only
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>Choose who can access this resource.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </div>
  );
}
