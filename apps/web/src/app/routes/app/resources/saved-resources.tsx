import { Head } from '@/components/seo';
import { ResourceCard, ResourceCardSkeleton } from '@/features/resources/components';
import { useSavedResources } from '@/features/user-resources/api/get-saved-resources';
import { cn } from '@/utils';

const SavedResourcesRoute = () => {
  const { data: resources = [], isLoading, isFetched, isFetching } = useSavedResources();

  return (
    <>
      <Head title={'Saved Resources'} />
      <div className="py-3 md:py-6">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-6">
          Список збережених ресурсів
        </h1>
        <div className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6')}>
          {isLoading && (
            <>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <ResourceCardSkeleton key={index} />
                ))}
            </>
          )}

          {resources?.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              viewMode={'grid'}
              className={cn({
                'opacity-70 animate-pulse': isFetching,
              })}
            />
          ))}
        </div>

        {isFetched && resources?.length === 0 && (
          <div className="flex h-48 w-full items-center justify-center ">
            <div className="text-muted-foreground text-center">
              Ви ще не зберегли жодного ресурсу
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SavedResourcesRoute;
