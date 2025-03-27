import { Bookmark } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { cn } from '@/utils';
import type { Resource } from '@/types/api';
import { APP_PATH } from '@/config/paths';

export type ViewMode = 'grid' | 'list';

interface ResourceCardProps {
  viewMode: ViewMode;
  resource: Resource;
  className?: string;
  onToggleSaved?: (resourceId: string | number) => void;
  isSaved?: boolean;
}

export const ResourceCard = ({
  viewMode,
  resource,
  isSaved,
  onToggleSaved,
  className,
}: ResourceCardProps) => {
  if (viewMode === 'grid') {
    return (
      <Card className={cn('overflow-hidden flex flex-col', className)}>
        <div className={'relative aspect-[1]'}>
          <Link to={APP_PATH.app.resource.getHref(resource.id)} className="bg-muted block h-full">
            <img
              src={resource.previewImageUrl || '/placeholder.svg'}
              alt={resource.title}
              className="object-cover"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/placeholder.svg';
              }}
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={() => onToggleSaved?.(resource.id)}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <Link to={APP_PATH.app.resource.getHref(resource.id)} className="hover:underline">
              <h3 className="font-semibold line-clamp-2">{resource.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {resource.authors.join(', ')}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{resource.category.name}</Badge>
              <Badge variant="outline">{new Date(resource.publicationDate).getFullYear()}</Badge>
              <Badge variant="outline">{resource.resourceType.name}</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Link
            to={APP_PATH.app.resource.getHref(resource.id)}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full text-secondary hover:text-secondary',
            )}
          >
            Переглянути
          </Link>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card key={resource.id} className={cn('overflow-hidden', className)}>
      <div className="flex flex-col sm:flex-row">
        <Link
          to={APP_PATH.app.resource.getHref(resource.id)}
          className="relative w-full sm:w-[120px] aspect-[3/4] bg-muted block"
        >
          <img
            src={resource.previewImageUrl || '/placeholder.svg'}
            alt={resource.title}
            className="object-cover h-full"
          />
        </Link>
        <div className="flex flex-col flex-1 p-4">
          <div className="space-y-2 mb-auto">
            <div className="flex justify-between">
              <Link to={APP_PATH.app.resource.getHref(resource.id)} className="hover:underline">
                <h3 className="font-semibold">{resource.title}</h3>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onToggleSaved?.(resource.id)}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="sr-only">Bookmark</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{resource.authors.join(', ')}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{resource.category.name}</Badge>
              <Badge variant="outline">{new Date(resource.publicationDate).getFullYear()}</Badge>
              <Badge variant="outline">{resource.resourceType.name}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to={APP_PATH.app.resource.getHref(resource.id)}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'sm:w-auto text-secondary hover:text-secondary',
              )}
            >
              Переглянути
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
