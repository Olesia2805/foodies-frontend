import axiosInstance from './axiosInstance';

export const getUserInfoApi = async (userId) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);
  return data;
};

export const getUserRecipesApi = async (userId) => {
  const { data } = await axiosInstance.get(`/recipes?userId=${userId}`);
  return data;
};

export const getUserFavoritesApi = async () => {
  const { data } = await axiosInstance.get(`/recipes/favorites`);
  return data;
};

export const getUserFollowersApi = async (userId) => {
  const { data } = await axiosInstance.get(`/users/followers/${userId}`);
  return data;
};

export const getUserFollowingApi = async (userId) => {
  const { data } = await axiosInstance.get(`/users/followings/${userId}`);
  return data;
};
