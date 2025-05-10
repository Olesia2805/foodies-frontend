import axiosInstance from './axiosInstance';

async function getAll() {
  return axiosInstance.get('/areas');
}

export default {
  getAll,
};
