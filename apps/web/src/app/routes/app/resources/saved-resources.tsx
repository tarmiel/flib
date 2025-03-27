import { Head } from '@/components/seo';
import { ResourcesSearchResults } from '@/features/resources/components';

const SavedResourcesRoute = () => {
  return (
    <>
      <Head title={'Saved Resources'} />
      <div className="py-3 md:py-6">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-6">
          Список збережених ресурсів
        </h1>
        <ResourcesSearchResults />
      </div>
    </>
  );
};

export default SavedResourcesRoute;
