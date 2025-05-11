import axiosInstance from './axiosInstance';
import { TIMEOUT } from '../constants/api';

async function getAll() {
  return axiosInstance.get('/ingredients', { timeout: TIMEOUT });
}

export default {
  getAll,
};
