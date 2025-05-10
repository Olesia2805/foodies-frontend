import axiosInstance from './axiosInstance';

async function createRecipe(formData) {
  if (formData instanceof FormData === false)
    throw new Error('Expected FormData');

  return axiosInstance.post('/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}

export default {
  createRecipe,
};
