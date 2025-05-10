import axiosInstance from './axiosInstance';

async function getAll() {
  return axiosInstance.get('/ingredients');
}

export default {
  getAll,
};
