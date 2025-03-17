import { ResourcesTable } from '@/features/resources/components';

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
      </div>

      <ResourcesTable />
    </div>
  );
}
