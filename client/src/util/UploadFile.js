import axios from 'axios';
import { toast } from './ToastUtil.js';

/**
 *
 * @param {File} file
 */
export const uploadDocument = async (
  file,
  {
    uploadUrl = '/api/file/upload-url',
    fileType = 'doc',
    fileExtension = 'pdf',
  } = {}
) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post(uploadUrl, {
    fileName: file.name,
    fileType,
    fileExtension,
  });
  const { fileKey, url } = res.data;
  const res2 = await axios.put(url, formData);
  if (res2.status === 200) {
    await axios.post('/api/employee', {
      postParams: {
        name: fileKey,
      },
    });
    toast(`File uploaded successfully`);
    return fileKey;
  }
  return null;
};
