import { DataTableSkeleton } from '@/components/ui/data-table';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
      </div>

      <DataTableSkeleton
        columnCount={6}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={['10rem', '40rem', '12rem', '12rem', '8rem', '8rem']}
        shrinkZero
      />
    </div>
  );
}
