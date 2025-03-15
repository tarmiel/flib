import { Head } from '@/components/seo';
import { ResourceDetail } from '@/features/resources/components';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useParams } from 'react-router';
import { APP_PATH } from '@/config/paths';

const getBookById = (id: string) => {
  return {
    id,
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    coverImage: '/placeholder.svg?height=600&width=400',
    publisher: 'MIT Press',
    publishDate: '2009-07-31',
    edition: '3rd Edition',
    isbn: '978-0262033848',
    doi: '10.1234/example.doi',
    category: 'Computer Science',
    subjects: ['Algorithms', 'Data Structures', 'Computer Programming'],
    language: 'English',
    pages: 1312,
    format: 'Hardcover',
    fileFormats: ['PDF', 'DJVU'],
    fileSize: '42.3 MB',
    description: `Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness. The book covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.

The first edition became a widely used text in universities worldwide as well as the standard reference for professionals. The second edition featured new chapters on the role of algorithms, probabilistic analysis and randomized algorithms, and linear programming. The third edition has been revised and updated throughout. It includes two completely new chapters, on van Emde Boas trees and multithreaded algorithms, substantial additions to the chapter on recurrence (now called "Divide-and-Conquer"), and an appendix on matrices. It features improved treatment of dynamic programming and greedy algorithms and a new notion of edge-based flow in the material on flow networks. Many exercises and problems have been added for this edition.`,
    keywords: [
      'Algorithms',
      'Data Structures',
      'Computer Science',
      'Programming',
      'Computational Complexity',
    ],
    citations: 64921,
    available: true,
    accessRestriction: 'Open Access',
    relatedResources: [
      { id: '2', title: 'The Art of Computer Programming', authors: ['Donald E. Knuth'] },
      { id: '3', title: 'Algorithm Design Manual', authors: ['Steven S. Skiena'] },
      { id: '4', title: 'Algorithms Unlocked', authors: ['Thomas H. Cormen'] },
    ],
  };
};

const ResourceRoute = () => {
  const params = useParams<{ resourceId: string }>();
  const resourceId = params.resourceId as string;
  const resource = getBookById(resourceId);

  if (!resource) return null;

  return (
    <>
      <Head title={resource.title} />
      <div className="py-3 space-y-4">
        <nav>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={APP_PATH.app.browse.getHref()}>All Resources</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={APP_PATH.app.resource.getHref(resourceId)}>{resource.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </nav>
        <ResourceDetail resource={resource} />
      </div>
    </>
  );
};

export default ResourceRoute;
