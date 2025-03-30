import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService {
  private minioClient: Minio.Client;

  constructor(private readonly configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: configService.get('MINIO_ENDPOINT')!,
      port: configService.get('MINIO_PORT'),
      useSSL: false,
      accessKey: configService.get('MINIO_ACCESS_KEY'),
      secretKey: configService.get('MINIO_SECRET_KEY'),
    });
  }

  async startMultipartUpload(
    bucketName: string,
    objectName: string,
  ): Promise<string> {
    await this.ensureBucket(bucketName);
    const uploadId = await this.minioClient.initiateNewMultipartUpload(
      bucketName,
      objectName,
      {},
    );
    return uploadId;
  }

  async getPresignedUrlForPart(
    bucketName: string,
    objectName: string,
    uploadId: string,
    partNumber: number,
    expiry: number = 3600,
  ): Promise<string> {
    return this.minioClient.presignedUrl(
      'PUT',
      bucketName,
      objectName,
      expiry,
      { partNumber: partNumber.toString(), uploadId: uploadId },
    );
  }

  async completeMultipartUpload(
    bucketName: string,
    objectName: string,
    uploadId: string,
    parts: { etag: string; part: number }[],
  ): Promise<void> {
    await this.minioClient.completeMultipartUpload(
      bucketName,
      objectName,
      uploadId,
      parts,
    );
  }

  async getPresignedUrlForDownload(
    bucketName: string,
    objectName: string,
    expires?: number,
  ): Promise<string> {
    return this.minioClient.presignedGetObject(bucketName, objectName, expires);
  }

  async removeObject(bucketName: string, objectName: string): Promise<void> {
    await this.minioClient.removeObject(bucketName, objectName);
  }

  async objectExists(bucketName: string, objectName: string): Promise<boolean> {
    try {
      await this.minioClient.statObject(bucketName, objectName);

      return true;
    } catch {
      return false;
    }
  }

  private async ensureBucket(bucketName: string): Promise<void> {
    const exists = await this.minioClient.bucketExists(bucketName);
    if (!exists) {
      await this.minioClient.makeBucket(bucketName);
    }
  }
}
