import { TIMEOUT } from '../constants/api';
import axiosInstance from './axiosInstance';

async function getAll() {
  return axiosInstance.get('/areas', { timeout: TIMEOUT });
}

export default {
  getAll,
};
