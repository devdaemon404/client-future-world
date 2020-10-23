import axios from 'axios';
import { toast } from './ToastUtil.js';

/**
 *
 * @param {File} file
 */
export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await axios.post('/api/file/upload-url', {
    fileName: file.name,
    fileType: 'doc',
    fileExtension: 'pdf',
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
