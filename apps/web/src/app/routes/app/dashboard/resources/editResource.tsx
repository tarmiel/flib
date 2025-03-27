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

  if (!params.resourceId) return null;

  const resource = getResourceById(params.resourceId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Управління Ресурсами</h1>
      </div>

      <ResourceEditForm resourceId={params.resourceId} initialData={resource} />
    </div>
  );
}
