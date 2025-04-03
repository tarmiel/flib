import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { EmptyCard } from './empty-card';
import { FileText, X } from 'lucide-react';
import { formatBytes } from '@/utils';
import { Button } from '@/components/ui/button';

export interface UploadedFile {
  name: string;
  size: string | number;
  format: string;
  preview?: string;
}
interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[];
  onRemove?: (fileName: string) => void;
}

export function UploadedFilesCard({ uploadedFiles, onRemove }: UploadedFilesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Завантажені файли</CardTitle>
        <CardDescription>Переглянути завантажені файли</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4 w-full">
            <div className="flex w-full gap-4 flex-col">
              {uploadedFiles.map((file) => (
                <FileCard
                  key={file.name}
                  name={file.name}
                  size={file.size}
                  preview={file.preview}
                  format={file.format}
                  onRemove={() => onRemove?.(file.name)}
                />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="Немає завантажених файлів"
            description="Перетягніть файли сюди або натисніть для вибору файлів"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  );
}

interface FileCardProps extends UploadedFile {
  onRemove: () => void;
}

export function FileCard({ preview, name, size, onRemove }: FileCardProps) {
  return (
    <div className="relative flex items-center gap-2.5">
      <div className="flex flex-1 gap-2.5">
        {preview ? (
          <img
            src={preview}
            alt={name}
            width={48}
            height={48}
            loading="lazy"
            className="aspect-square shrink-0 rounded-md object-cover"
          />
        ) : (
          <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
        )}
        <div className="flex w-full flex-col gap-2">
          <div className="flex flex-col gap-px">
            <p className="line-clamp-1 text-sm font-medium text-foreground/80">{name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(Number(size) || 0)}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button type="button" variant="outline" size="icon" className="size-7" onClick={onRemove}>
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Remove file</span>
        </Button>
      </div>
    </div>
  );
}
