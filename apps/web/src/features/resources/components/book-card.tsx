import { Bookmark } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from '@/components/ui/link';
import { cn } from '@/utils';
import type { Book } from '@/types/api';

export type ViewMode = 'grid' | 'list';

interface BookCardProps {
  viewMode: ViewMode;
  book: Book;
  className?: string;
  onToggleSaved?: (bookId: string | number) => void;
  isSaved?: boolean;
}

export const BookCard = ({ viewMode, book, isSaved, onToggleSaved, className }: BookCardProps) => {
  if (viewMode === 'grid') {
    return (
      <Card className={cn('overflow-hidden flex flex-col', className)}>
        <div className={'relative '}>
          <Link to={`/books/${book.id}`} className="bg-muted block">
            <img
              src={book.coverImage || '/placeholder.svg'}
              alt={book.title}
              className="object-cover"
            />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur-sm"
            onClick={() => onToggleSaved?.(book.id)}
          >
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
        <CardContent className="p-4">
          <div className="space-y-2">
            <Link to={`/books/${book.id}`} className="hover:underline">
              <h3 className="font-semibold line-clamp-2">{book.title}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-1">{book.authors.join(', ')}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{book.category}</Badge>
              <Badge variant="outline">{book.year}</Badge>
              <Badge variant="outline">{book.type}</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Link
            to={`/books/${book.id}`}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'w-full text-secondary hover:text-secondary',
            )}
          >
            View
          </Link>
        </CardFooter>
      </Card>
    );
  }
  return (
    <Card key={book.id} className={cn('overflow-hidden', className)}>
      <div className="flex flex-col sm:flex-row">
        <Link
          to={`/books/${book.id}`}
          className="relative w-full sm:w-[120px] aspect-[3/4] bg-muted block"
        >
          <img
            src={book.coverImage || '/placeholder.svg'}
            alt={book.title}
            className="object-cover h-full"
          />
        </Link>
        <div className="flex flex-col flex-1 p-4">
          <div className="space-y-2 mb-auto">
            <div className="flex justify-between">
              <Link to={`/books/${book.id}`} className="hover:underline">
                <h3 className="font-semibold">{book.title}</h3>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onToggleSaved?.(book.id)}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                <span className="sr-only">Bookmark</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{book.authors.join(', ')}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{book.category}</Badge>
              <Badge variant="outline">{book.year}</Badge>
              <Badge variant="outline">{book.type}</Badge>
            </div>
          </div>
          <div className="mt-4">
            <Link
              to={`/books/${book.id}`}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'sm:w-auto text-secondary hover:text-secondary',
              )}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};
