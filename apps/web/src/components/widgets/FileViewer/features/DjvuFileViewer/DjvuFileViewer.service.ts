import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    DjVu: {
      Viewer: new () => {
        render: (element: HTMLElement) => void;
        loadDocumentByUrl: (url: string) => Promise<void>;
        loadDocumentByData: (data: ArrayBuffer) => Promise<void>;
        configure: (options: DjVuViewerConfig) => void;
      };
    };
  }
}

export interface DjVuViewerConfig {
  name?: string;
  viewMode?: 'continuous' | 'single' | 'text';
  pageNumber?: number;
  pageRotation?: 0 | 90 | 180 | 270;
  pageScale?: number;
  language?: string;
  theme?: 'light' | 'dark';
  djvuOptions?: {
    baseUrl?: string;
  };
  uiOptions?: {
    hideFullPageSwitch?: boolean;
    changePageOnScroll?: boolean;
    showContentsAutomatically?: boolean;
    onSaveNotification?: {
      text: string;
      yesButton: string;
      noButton?: string;
    };
    hideOpenAndCloseButtons?: boolean;
    hidePrintButton?: boolean;
    hideSaveButton?: boolean;
  };
}

export const DjvuFileViewerService = (fileUrl: string, config: DjVuViewerConfig = {}) => {
  const viewerWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!window.DjVu) {
      return;
    }
    const ViewerInstance = new window.DjVu.Viewer();
    ViewerInstance.configure(config);
    ViewerInstance.render(viewerWrapper.current!);
    ViewerInstance.loadDocumentByUrl(fileUrl);
  }, [config, fileUrl]);

  return { viewerWrapper };
};

export const useDjvuFileViewer = DjvuFileViewerService;
