import { Head } from '@/components/seo';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Spinner } from '@/components/ui/spinner';
import { APP_PATH } from '@/config/paths';
import { useResource } from '@/features/resources/api/get-resource';
import { ResourceDetail } from '@/features/resources/components';
import { Link, useParams } from 'react-router';

const ResourceRoute = () => {
  const params = useParams<{ resourceId: string }>();
  const resourceId = params.resourceId as string;
  const resourceQuery = useResource({
    resourceId: Number(resourceId),
  });

  if (resourceQuery.isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const resource = resourceQuery.data;

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
                  <Link to={APP_PATH.app.resources.getHref()}>Всі ресурси</Link>
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
