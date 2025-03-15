import { cn } from '@/utils/cn';
import { useDjvuFileViewer, type DjVuViewerConfig } from './DjvuFileViewer.service';
import { ComponentProps } from 'react';

export interface DjvuFileViewerProps extends ComponentProps<'div'> {
  fileUrl: string;
}

const config = {
  //   name: 'MyDjVuDocument.djvu',
  viewMode: 'continuous',
  pageNumber: 10,
  //   pageRotation: 90,
  pageScale: 1.5,
  language: 'en',
  theme: 'dark',
  //   djvuOptions: {
  //     baseUrl: '/url/to/directory/with/indirect/djvu/',
  //   },
  uiOptions: {
    hideFullPageSwitch: false,
    changePageOnScroll: false,
    showContentsAutomatically: false,
    // onSaveNotification: {
    //   text: 'Here is your notification/agreement for the user',
    //   yesButton: 'Text on the yes button',
    //   noButton: 'Text on the no button',
    // },
    hideOpenAndCloseButtons: true,
    hidePrintButton: true,
    hideSaveButton: true,
  },
} satisfies DjVuViewerConfig;

export const DjvuFileViewer = ({ fileUrl, className, ...props }: DjvuFileViewerProps) => {
  const srv = useDjvuFileViewer(fileUrl, config);
  return (
    <div
      ref={srv.viewerWrapper}
      className={cn('h-[90vh] max-w-[90vw]', className)}
      {...props}
    ></div>
  );
};
