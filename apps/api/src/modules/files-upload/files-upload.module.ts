import { Module } from '@nestjs/common';
import { FilesUploadController } from './files-upload.controller';
import { MinioService } from '../minio/minio.service';

@Module({
  controllers: [FilesUploadController],
  providers: [MinioService],
})
export class FilesUploadModule {}
