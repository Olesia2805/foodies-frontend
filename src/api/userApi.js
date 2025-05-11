import axiosInstance from './axiosInstance';

export const getUserRecipesApi = async (userId, { page, limit }) => {
  const { data } = await axiosInstance.get(
    `/recipes?userId=${userId}&page=${page}&limit=${limit}`
  );
  return data;
};

export const getUserFavoritesApi = async ({ page, limit }) => {
  const { data } = await axiosInstance.get(
    `/recipes/favorites?page=${page}&limit=${limit}`
  );
  return data;
};

export const getUserFollowersApi = async (userId, { page, limit }) => {
  const { data } = await axiosInstance.get(
    `/users/followers/${userId}?page=${page}&limit=${limit}`
  );
  return data;
};

export const getUserFollowingApi = async (userId, { page, limit }) => {
  const { data } = await axiosInstance.get(
    `/users/followings/${userId}?page=${page}&limit=${limit}`
  );
  return data;
};
