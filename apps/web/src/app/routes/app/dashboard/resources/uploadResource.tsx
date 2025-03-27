import { ResourceUploadForm } from '@/features/resources/components';

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Створення ресурсу</h1>
      </div>

      <ResourceUploadForm />
    </div>
  );
}
