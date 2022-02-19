import { api } from '../axios';

export const getAllMessages = async () => {
  const response = await api.get('/chat/messages');

  return response.data;
};
