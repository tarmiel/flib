import { Spinner } from '@/components/ui/spinner';
import { useResource } from '@/features/resources/api/get-resource';
import { ResourceEditForm, ResourceUploadForm } from '@/features/resources/components';
import { useParams } from 'react-router';

const getResourceById = (id: string) => {
  // Mock data for demonstration
  return {
    id,
    title: 'Introduction to Algorithms',
    authors: ['Thomas H. Cormen', 'Charles E. Leiserson', 'Ronald L. Rivest', 'Clifford Stein'],
    type: 'book',
    category: 'computer_science',
    description:
      'Some books on algorithms are rigorous but incomplete; others cover masses of material but lack rigor. Introduction to Algorithms uniquely combines rigor and comprehensiveness.',
    keywords: ['Algorithms', 'Data Structures', 'Computer Science'],
    publisher: 'MIT Press',
    publishDate: '2009-07-31',
    edition: '3rd Edition',
    isbn: '978-0262033848',
    language: 'English',
    pages: '1312',
    accessLevel: 'open',
  };
};

export default function EditResourceRoute() {
  const params = useParams<{ resourceId: string }>();

  const resourceQuery = useResource({
    resourceId: Number(params.resourceId),
    queryConfig: {
      enabled: !!params.resourceId,
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Управління Ресурсами</h1>
      </div>

      {resourceQuery.isPending && (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="xl" />
        </div>
      )}

      {!resourceQuery.isError && !resourceQuery.isPending ? (
        <ResourceEditForm
          resourceId={resourceQuery.data.id}
          initialData={{
            title: resourceQuery.data.title,
            authors: resourceQuery.data.authors.map((author) => ({
              name: author,
            })),
            keywords: resourceQuery.data.keywords,
            description: resourceQuery.data.description ?? '',
            category: {
              id: resourceQuery.data.category.id,
              name: resourceQuery.data.category.name,
            },
            resourceType: {
              id: resourceQuery.data.resourceType.id,
              name: resourceQuery.data.resourceType.name,
            },
            publicationDate: new Date(resourceQuery.data.publicationDate)
              .toISOString()
              .split('T')[0],
            citation: resourceQuery.data.citation ?? '',
            additionalInfo: resourceQuery.data.additionalInfo as any,
            fileName: resourceQuery.data.fileName,
            fileFormat: resourceQuery.data.fileFormat,
            fileSize: resourceQuery.data.fileSize,
            previewImageUrl: resourceQuery.data.previewImageUrl,
            resourceTypeName: resourceQuery.data.resourceType.name,
          }}
        />
      ) : null}
    </div>
  );
}
