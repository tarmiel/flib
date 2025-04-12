import { useRef, useState } from 'react';

import { Bookmark, BookOpen, Download, FileText, Share2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Input } from '@/components/ui/input';
import { FileViewer } from '@/components/widgets/FileViewer';
import { useToggleSaveResource } from '@/features/user-resources/api/toggle-save-resource';
import type { ResourceWithSavedStatus } from '@/types/api';
import { ResourceTypeDetails } from './resource-additional-info';
import { useFileUrl } from '@/features/file-upload/api/get-file-url';
import { toast } from 'sonner';

type ResourceDetailProps = {
  resource: ResourceWithSavedStatus;
};

const DetailTabs = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  VIEWER: 'viewer',
} as const;

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const [activeTab, setActiveTab] = useState<string>(DetailTabs.OVERVIEW);
  const [showTooltip, setShowTooltip] = useState(false);

  const viewerTabRef = useRef<HTMLDivElement>(null);

  const toggleSaveResourceMutation = useToggleSaveResource();
  const { data: fileUrl, isLoading } = useFileUrl({
    fileId: resource.fileName,
    queryConfig: {
      enabled: !!resource.fileName,
    },
  });

  const handleDownload = () => {
    window.open(fileUrl, '_blank');
  };

  const handleToggleSaved = async (resourceId: ResourceWithSavedStatus['id'], isSaved: boolean) => {
    toggleSaveResourceMutation.mutate({ resourceId, isSaved });
  };

  const handleReadOnlineClick = () => {
    setActiveTab(DetailTabs.VIEWER);

    viewerTabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);

    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 2000);

    toast.info('Посилання скопійовано до буфера обміну');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden border">
            <img
              src={resource.previewImageUrl || '/placeholder.svg'}
              alt={resource.title}
              className="object-contain h-full w-full"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={handleReadOnlineClick}
            >
              Переглянути Online
            </Button>
            <Button
              variant="outline"
              className="w-full"
              icon={<Download className="h-4 w-4" />}
              onClick={fileUrl ? handleDownload : undefined}
              disabled={!fileUrl || isLoading}
            >
              Завантажити
            </Button>
            <Button
              variant="outline"
              className="w-full"
              icon={<Bookmark className={`h-4 w-4 ${resource.isSaved ? 'fill-current' : ''}`} />}
              onClick={() => handleToggleSaved(resource.id, resource.isSaved)}
            >
              {resource.isSaved ? 'Збережено в бібліотеці' : 'Зберегти до бібліотеки'}
            </Button>
            <TooltipProvider>
              <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full"
                    icon={<Share2 className="h-4 w-4" />}
                    onClick={handleShare}
                  >
                    Поділитися
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Посилання скопійовано!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Доступні формати</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" className="h-auto min-w-[50px] px-0 ">
                        <span className={'flex flex-col items-center gap-1'}>
                          <FileText className="h-5 w-5" />
                          <span className={'text-xs'}>{resource.fileFormat}</span>
                        </span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{resource.fileFormat}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{resource.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{resource.authors.join(', ')}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">{resource.resourceType.name}</Badge>
              <Badge variant="outline">{resource.category.name}</Badge>
            </div>
          </div>

          <Tabs defaultValue={DetailTabs.OVERVIEW} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={DetailTabs.OVERVIEW}>Загальна інформація</TabsTrigger>
              <TabsTrigger value={DetailTabs.DETAILS}>Деталі</TabsTrigger>
              <TabsTrigger value={DetailTabs.VIEWER}>Online Viewer</TabsTrigger>
            </TabsList>
            <TabsContent value={DetailTabs.OVERVIEW} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Опис</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm leading-relaxed whitespace-pre-line">
                    {resource.description}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ключові слова</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {resource.keywords?.map((keyword) => (
                      <Badge key={keyword} variant="secondary">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {resource.citation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Для цитування</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      readOnly
                      value={resource.citation}
                      className={'bg-slate-100 focus-visible:ring-0'}
                    />
                  </CardContent>
                </Card>
              )}

              {/* <div className="space-y-4">
                <h2 className="text-xl font-semibold">Схожі ресурси</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resource.relatedResources.map((resource) => (
                    <Card key={resource.id}>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">
                          <Link to={`/resources/${resource.id}`} className="hover:underline">
                            {resource.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>{resource.authors.join(', ')}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div> */}
            </TabsContent>

            <TabsContent value={DetailTabs.DETAILS} className="space-y-6">
              <ResourceTypeDetails resource={resource} />
            </TabsContent>

            <TabsContent ref={viewerTabRef} value={DetailTabs.VIEWER} className="space-y-6">
              {fileUrl && <FileViewer fileType={resource.fileFormat} fileUrl={fileUrl} />}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
