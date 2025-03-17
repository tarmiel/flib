import type { UseFormReturn } from 'react-hook-form';
import { FileUp } from 'lucide-react';

import type { ResourceFormValues } from '../resource-upload-form';
import { Badge } from '@/components/ui/badge';

// Update the ReviewForm component to handle editing mode
// Add isEditing prop to the interface
interface ReviewFormProps {
  form: UseFormReturn<ResourceFormValues>;
  isEditing?: boolean;
}

export function ReviewForm({ form, isEditing = false }: ReviewFormProps) {
  const { getValues } = form;
  const values = getValues();

  // Format resource type for display
  const formatResourceType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Format category for display
  const formatCategory = (category: string) => {
    return category.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Get file size in readable format
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  // Format access level for display
  // const formatAccessLevel = (level: string) => {
  //   switch (level) {
  //     case 'open':
  //       return 'Open Access';
  //     case 'restricted':
  //       return 'Restricted Access';
  //     case 'private':
  //       return 'Private Access';
  //     default:
  //       return level;
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Review Your Submission</h2>
        <p className="text-muted-foreground">
          Please review your resource details before {isEditing ? 'updating' : 'submitting'}.
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Title</p>
                <p>{values.title}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <p>{values.type ? formatResourceType(values.type) : 'Not specified'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p>{values.category ? formatCategory(values.category) : 'Not specified'}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground">Authors</p>
                <p>{values.authors?.map((author) => author.name).join(', ') || 'Not specified'}</p>
              </div>
            </div>

            {values.description && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="whitespace-pre-line">{values.description}</p>
              </div>
            )}

            {values.keywords && values.keywords.length > 0 && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Keywords</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {values.keywords.map((keyword, index) => (
                    <Badge key={index} variant="secondary">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Resource Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.publisher && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Publisher</p>
                  <p>{values.publisher}</p>
                </div>
              )}

              {values.publishDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Publication Date</p>
                  <p>{new Date(values.publishDate).toLocaleDateString()}</p>
                </div>
              )}

              {values.language && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Language</p>
                  <p>{values.language}</p>
                </div>
              )}

              {values.edition && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Edition</p>
                  <p>{values.edition}</p>
                </div>
              )}

              {values.isbn && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">ISBN</p>
                  <p>{values.isbn}</p>
                </div>
              )}

              {values.doi && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">DOI</p>
                  <p>{values.doi}</p>
                </div>
              )}

              {values.pages && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pages</p>
                  <p>{values.pages}</p>
                </div>
              )}

              {values.volume && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Volume</p>
                  <p>{values.volume}</p>
                </div>
              )}

              {values.issue && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Issue</p>
                  <p>{values.issue}</p>
                </div>
              )}

              {values.university && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">University</p>
                  <p>{values.university}</p>
                </div>
              )}

              {values.department && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Department</p>
                  <p>{values.department}</p>
                </div>
              )}

              {values.degree && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Degree</p>
                  <p>{values.degree}</p>
                </div>
              )}

              {values.conference && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conference</p>
                  <p>{values.conference}</p>
                </div>
              )}

              {values.conferenceDate && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conference Date</p>
                  <p>{new Date(values.conferenceDate).toLocaleDateString()}</p>
                </div>
              )}

              {values.conferenceLocation && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Conference Location</p>
                  <p>{values.conferenceLocation}</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">File Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">File</p>
                {values.file ? (
                  <div className="flex items-center gap-2">
                    <FileUp className="h-4 w-4" />
                    <span>{values.file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({getFileSize(values.file.size)})
                    </span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    {isEditing ? 'No changes to current file' : 'No file selected'}
                  </p>
                )}
              </div>

              {/* <div>
                <p className="text-sm font-medium text-muted-foreground">Access Level</p>
                <p>{formatAccessLevel(values.accessLevel)}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
