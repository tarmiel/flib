import { ResourceManagement } from "@/components/admin/resource-management"

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resource Management</h1>
      </div>

      <ResourceManagement />
    </div>
  )
}

