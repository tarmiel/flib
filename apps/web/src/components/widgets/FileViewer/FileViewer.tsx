import type { ComponentProps } from 'react';
import { DjvuFileViewer, PdfFileViewer } from './features';

export interface FileViewerProps extends ComponentProps<'div'> {
  fileType: 'djvu' | 'pdf';
  fileUrl: string;
}

export const FileViewer = ({ fileType, ...props }: FileViewerProps) => {
  if (fileType === 'djvu') return <DjvuFileViewer {...props} />;
  if (fileType === 'pdf') return <PdfFileViewer {...props} />;
  return null;
};
