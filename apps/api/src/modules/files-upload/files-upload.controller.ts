import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MinioService } from '../minio/minio.service';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

@Controller('files-upload')
export class FilesUploadController {
  private bucketName: string;

  constructor(
    private minioService: MinioService,
    private configService: ConfigService,
    private logger: Logger,
  ) {
    this.bucketName = this.configService.get('MINIO_FILES_BUCKET_NAME')!;
  }

  @Post('start-multipart')
  async startMultipart(
    @Body('fileName') fileName: string,
  ): Promise<{ uploadId: string; fileName: string }> {
    const uniqueFileName = `${Date.now()}-${fileName}`;
    const uploadId = await this.minioService.startMultipartUpload(
      this.bucketName,
      uniqueFileName,
    );
    return { uploadId, fileName: uniqueFileName };
  }

  @Post('presigned-part-url')
  async getPresignedPartUrl(
    @Body('fileName') fileName: string,
    @Body('uploadId') uploadId: string,
    @Body('partNumber') partNumber: number,
  ): Promise<{ url: string }> {
    const url = await this.minioService.getPresignedUrlForPart(
      this.bucketName,
      fileName,
      uploadId,
      partNumber,
    );
    return { url };
  }

  @Post('complete-multipart')
  async completeMultipart(
    @Body('fileName') fileName: string,
    @Body('uploadId') uploadId: string,
    @Body('parts') parts: { etag: string; part: number }[],
  ): Promise<{ message: string }> {
    await this.minioService.completeMultipartUpload(
      this.bucketName,
      fileName,
      uploadId,
      parts,
    );
    return { message: 'File uploaded successfully' };
  }

  @Get(':id')
  async getFile(@Param('id') id: string): Promise<string> {
    const fileName = id;
    const url = await this.minioService.getPresignedUrlForDownload(
      this.bucketName,
      fileName,
    );

    return url;
  }
}
