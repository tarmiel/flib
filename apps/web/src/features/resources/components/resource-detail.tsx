import { useRef, useState } from 'react';

import { Bookmark, BookOpen, Download, ExternalLink, FileText, Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { Link } from '@/components/ui/link';

type ResourceDetailProps = {
  resource: {
    id: string;
    title: string;
    authors: string[];
    coverImage: string;
    publisher: string;
    publishDate: string;
    edition: string;
    isbn: string;
    doi: string;
    category: string;
    subjects: string[];
    language: string;
    pages: number;
    format: string;
    fileFormats: string[];
    fileSize: string;
    description: string;
    keywords: string[];
    citations: number;
    available: boolean;
    accessRestriction: string;
    relatedResources: {
      id: string;
      title: string;
      authors: string[];
    }[];
  };
};

const DetailTabs = {
  OVERVIEW: 'overview',
  DETAILS: 'details',
  VIEWER: 'viewer',
} as const;

export function ResourceDetail({ resource }: ResourceDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(DetailTabs.OVERVIEW);

  const viewerTabRef = useRef<HTMLDivElement>(null);

  const toggleSaved = () => {
    setIsSaved(!isSaved);
  };

  const handleReadOnlineClick = () => {
    setActiveTab(DetailTabs.VIEWER);

    viewerTabRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="relative aspect-[3/4] bg-muted rounded-lg overflow-hidden border">
            <img
              src={resource.coverImage || '/placeholder.svg'}
              alt={resource.title}
              className="object-cover h-full w-full"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full"
              icon={<BookOpen className="h-4 w-4" />}
              onClick={handleReadOnlineClick}
            >
              Read Online
            </Button>
            <Button variant="outline" className="w-full" icon={<Download className="h-4 w-4" />}>
              Download ({resource.fileSize})
            </Button>
            <Button
              variant="outline"
              className="w-full"
              icon={<Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />}
              onClick={toggleSaved}
            >
              {isSaved ? 'Saved to Library' : 'Save to Library'}
            </Button>
            <Button variant="outline" className="w-full" icon={<Share2 className="h-4 w-4" />}>
              Share
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Available Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resource.fileFormats.map((format) => (
                  <TooltipProvider key={format}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" className="h-auto min-w-[50px] px-0 ">
                          <span className={'flex flex-col items-center gap-1'}>
                            <FileText className="h-5 w-5" />
                            <span className={'text-xs'}>{format}</span>
                          </span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{format}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">{resource.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{resource.authors.join(', ')}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline">{resource.category}</Badge>
              {resource.subjects.map((subject) => (
                <Badge key={subject} variant="outline">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue={DetailTabs.OVERVIEW} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={DetailTabs.OVERVIEW}>Overview</TabsTrigger>
              <TabsTrigger value={DetailTabs.DETAILS}>Details</TabsTrigger>
              <TabsTrigger value={DetailTabs.VIEWER}>Online Viewer</TabsTrigger>
            </TabsList>
            <TabsContent value={DetailTabs.OVERVIEW} className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Description</h2>
                <div className="text-sm leading-relaxed whitespace-pre-line">
                  {resource.description}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Keywords</h2>
                <div className="flex flex-wrap gap-2">
                  {resource.keywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Related Resources</h2>
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
              </div>
            </TabsContent>

            <TabsContent value={DetailTabs.DETAILS} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publication Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Publisher</dt>
                      <dd>{resource.publisher}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">
                        Publication Date
                      </dt>
                      <dd>
                        {new Date(resource.publishDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Edition</dt>
                      <dd>{resource.edition}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Language</dt>
                      <dd>{resource.language}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Pages</dt>
                      <dd>{resource.pages}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">Format</dt>
                      <dd>{resource.format}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Identifiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">ISBN</dt>
                      <dd>{resource.isbn}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-muted-foreground">DOI</dt>
                      <dd className="flex items-center gap-1">
                        {resource.doi}
                        <Button variant="ghost" size="icon" className="h-4 w-4">
                          <ExternalLink className="h-3 w-3" />
                          <span className="sr-only">Open DOI</span>
                        </Button>
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Citation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-md text-sm font-mono">
                      {`${resource.authors.join(', ')}. (${new Date(resource.publishDate).getFullYear()}). ${resource.title}. ${resource.publisher}. ${resource.doi}`}
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        Copy Citation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent ref={viewerTabRef} value={DetailTabs.VIEWER} className="space-y-6">
              <div className="border rounded-lg p-8 bg-muted/50 flex flex-col items-center justify-center min-h-[500px] text-center">
                <BookOpen className="h-16 w-16 mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">Online Viewer</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  The online document viewer will be displayed here. You can read the full document
                  without downloading it.
                </p>
                <Button>Open Viewer</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
