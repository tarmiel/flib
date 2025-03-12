import { DjvuFileViewer, DjvuFileViewerProps } from './features';

export interface FileViewerProps extends DjvuFileViewerProps {}

export const FileViewer = (props: FileViewerProps) => {
  if (props.fileType === 'djvu') return <DjvuFileViewer {...props} />;
  return null;
};
