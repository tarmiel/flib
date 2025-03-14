import { Grid3X3, List } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Paginator } from '@/components/widgets/paginator';
import { BookCard, type ViewMode } from './book-card';

// Mock data for books
const books = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 2009,
    type: 'Book',
    createdAt: '',
  },
  {
    id: '2',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    authors: ['Robert C. Martin'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 2008,
    type: 'Book',
    createdAt: '',
  },
  {
    id: '3',
    title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
    authors: ['Erich Gamma', 'Richard Helm', 'Ralph Johnson', 'John Vlissides'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 1994,
    type: 'Book',
    createdAt: '',
  },
  {
    id: '4',
    title: 'Artificial Intelligence: A Modern Approach',
    authors: ['Stuart Russell', 'Peter Norvig'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 2020,
    type: 'Book',
    createdAt: '',
  },
  {
    id: '5',
    title: 'The Pragmatic Programmer',
    authors: ['Andrew Hunt', 'David Thomas'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 2019,
    type: 'Book',
    createdAt: '',
  },
  {
    id: '6',
    title: 'Compilers: Principles, Techniques, and Tools',
    authors: ['Alfred V. Aho', 'Monica S. Lam', 'Ravi Sethi', 'Jeffrey D. Ullman'],
    coverImage: '/placeholder.svg?height=400&width=300',
    category: 'Computer Science',
    year: 2006,
    type: 'Book',
    createdAt: '',
  },
];

export function ResourcesList() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Resources</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} viewMode={'grid'} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} viewMode={'list'} />
          ))}
        </div>
      )}

      <Paginator
        currentPage={page}
        totalPages={12}
        onPageChange={(pageNumber) => {
          setPage(pageNumber);
        }}
        showPreviousNext
      />
    </div>
  );
}
