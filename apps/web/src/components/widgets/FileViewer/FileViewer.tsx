import type { ComponentProps } from 'react';
import { DjvuFileViewer, PdfFileViewer } from './features';
import { FILE_FORMAT } from '@/features/resources/lib/resources';
import type { ValueOf } from '@/types/utils';

type FileViewerType = ValueOf<typeof FILE_FORMAT>;
export interface FileViewerProps extends ComponentProps<'div'> {
  fileType: FileViewerType;
  fileUrl: string;
}

export const FileViewer = ({ fileType, ...props }: FileViewerProps) => {
  if (fileType === FILE_FORMAT.DJVU) return <DjvuFileViewer {...props} />;
  if (fileType === FILE_FORMAT.PDF) return <PdfFileViewer {...props} />;
  return null;
};
