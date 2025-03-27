import { Head } from '@/components/seo';
import { ResourcesSearchResults, ResourcesSearchSection } from '@/features/resources/components';
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7';

const BrowseRoute = () => {
  const searchParams = useOptimisticSearchParams();

  console.log({ searchParams });
  return (
    <>
      <Head title={'Browse'} />
      <div className="py-3 md:py-6">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-6">Перегляд матеріалів</h1>
        <ResourcesSearchSection />
        <ResourcesSearchResults />
      </div>
    </>
  );
};

export default BrowseRoute;
