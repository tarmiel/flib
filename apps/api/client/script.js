async function uploadFileInChunks(file) {
  const chunkSize = 1024 * 1024 * 5; // 5 MB
  const totalParts = Math.ceil(file.size / chunkSize);

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoib2xlaC5hZG1pbkBtYWlsLmNvbSIsImlhdCI6MTc0MzM2ODI4NCwicm9sZSI6ImFkbWluIiwiZXhwIjoxNzQzNDU0Njg0fQ.R4meHqTRokhkCFZpB-edMeqzq9IvYpfxeFcYvNUbNe4',
  };

  // 1. Начать multipart upload
  const { uploadId, fileName } = await (
    await fetch('http://localhost:3002/files-upload/start-multipart', {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify({ fileName: file.name }),
    })
  ).json();

  const parts = [];
  for (let i = 0; i < totalParts; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    // 2. Получить presigned URL для части
    const { url } = await (
      await fetch('http://localhost:3002/files-upload/presigned-part-url', {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify({ fileName, uploadId, partNumber: i + 1 }),
      })
    ).json();

    // 3. Загрузить часть
    const response = await fetch(url, { method: 'PUT', body: chunk });
    const etag = response.headers.get('ETag');
    parts.push({ etag, part: i + 1 });
  }

  // 4. Завершить multipart upload
  await fetch('http://localhost:3002/files-upload/complete-multipart', {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ fileName, uploadId, parts }),
  });

  console.log('Multipart upload completed');
}

document.getElementById('upload').addEventListener('click', async () => {
  const file = document.getElementById('file').files[0];
  await uploadFileInChunks(file);
});
