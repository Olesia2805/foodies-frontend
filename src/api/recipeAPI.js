import axiosInstance from './axiosInstance';import { TIMEOUT } from '../constants/api';

async function createRecipe(formData) {
  if (formData instanceof FormData === false)
    throw new Error('Expected FormData');

  return axiosInstance.post('/recipes', formData, {
    timeout: TIMEOUT,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export default {
  createRecipe,
};
