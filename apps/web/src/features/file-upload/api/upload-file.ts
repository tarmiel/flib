import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api-client';
import type { MutationConfig } from '@/lib/react-query';

interface StartMultipartResponse {
  uploadId: string;
  fileName: string;
}

interface PresignedUrlResponse {
  url: string;
}

interface CompleteMultipartResponse {
  message: string;
}

interface Part {
  etag: string;
  part: number;
}

interface CompleteMultipartPayload {
  fileName: string;
  uploadId: string;
  parts: Part[];
}

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const startMultipart = async (fileName: string): Promise<StartMultipartResponse> => {
  const response = await api.post('/files-upload/start-multipart', { fileName });

  return response.data;
};

const getPresignedUrl = async (payload: {
  fileName: string;
  uploadId: string;
  partNumber: number;
}): Promise<PresignedUrlResponse> => {
  const response = await api.post('/files-upload/presigned-part-url', payload);

  return response.data;
};

const uploadChunk = async (url: string, chunk: Blob): Promise<string> => {
  const response = await axios.put(url, chunk, {
    headers: { 'Content-Type': 'application/octet-stream' },
  });
  return response.headers['etag'];
};

const completeMultipart = async (
  payload: CompleteMultipartPayload,
): Promise<CompleteMultipartResponse> => {
  const response = await api.post('/files-upload/complete-multipart', payload);

  return response.data;
};

async function uploadFileInChunks(file: File) {
  try {
    const totalParts = Math.ceil(file.size / CHUNK_SIZE);

    // Start multipart upload
    const { uploadId, fileName } = await startMultipart(file.name);

    // Upload chunks
    const partsPromises = Array.from({ length: totalParts }, async (_, i) => {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      const { url } = await getPresignedUrl({
        fileName,
        uploadId,
        partNumber: i + 1,
      });

      const etag = await uploadChunk(url, chunk);
      return { etag, part: i + 1 };
    });

    const parts = await Promise.all(partsPromises);

    // Complete multipart upload
    const { message } = await completeMultipart({
      fileName,
      uploadId,
      parts,
    });

    return {
      fileName,
      message,
    };
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}

type UseFileUploadOptions = {
  mutationConfig?: MutationConfig<typeof uploadFileInChunks>;
};

export const useFileUpload = ({ mutationConfig = {} }: UseFileUploadOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    onSuccess: (...args) => {
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: uploadFileInChunks,
  });
};
