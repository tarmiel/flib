import { Viewer, Worker } from '@react-pdf-viewer/core';
import { usePdfFileViewer } from './PdfFileViewer.service';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import type { ComponentProps } from 'react';

export interface PdfFileViewerProps extends ComponentProps<'div'> {
  fileUrl: string;
}

const WORKER_URL = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

export const PdfFileViewer = ({ fileUrl, ...props }: PdfFileViewerProps) => {
  const { defaultLayoutPluginInstance } = usePdfFileViewer();

  return (
    <Worker workerUrl={WORKER_URL}>
      <div
        style={{
          height: '90vh',
          maxWidth: '90vw',
          marginInline: 'auto',
        }}
        {...props}
      >
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} theme={'light'} />
      </div>
    </Worker>
  );
};
