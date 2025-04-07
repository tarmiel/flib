import { FileFormat } from '@prisma/client';

export class ResourceEntity {
  title: string;
  description?: string;
  categoryId: number;
  publicationDate: Date;
  authors: string[];
  keywords: string[];
  fileName: string;
  fileFormat: FileFormat;
  fileSize: string;
  previewImageName?: string | null;
  previewImageUrl?: string | null;
  citation?: string;
  additionalInfo: any;
  resourceTypeId: number;
  uploadedByUserId: number;
}
