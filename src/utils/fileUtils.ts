import axios from 'axios';

export const urlToFile = async (
  url: string,
  filename: string,
): Promise<File> => {
  const response = await axios.get(url, {
    responseType: 'blob',
  });

  const blob = new Blob([response.data], {
    type: response.headers['content-type'],
  });
  return new File([blob], filename, { type: blob.type });
};
