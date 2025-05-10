import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const { VITE_API_URL } = import.meta.env;


export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_API_URL, 
    prepareHeaders(headers, { getState }) {
      const token = getState().auth.token|| 
      localStorage.getItem('token');
    
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    fetchCurrentUser: builder.query({
      query: () => "/auth/me",
      providesTags: ["Profile"],
    }),
    fetchUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ["Profile"],
    }),
    fetchUserFollowers: builder.query({
      query: (userId) => `/users/followers/${userId}`,
      providesTags: ["Profile"],
    }),
    fetchUserFollowings: builder.query({
      query: (userId) => `/users/followings/${userId}`,
      providesTags: ["Profile"],
    }),
    followUser: builder.mutation({
      query: (followerId) => ({
        url: `/users/followings/${followerId}`,
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    unfollowUser: builder.mutation({
      query: (followerId) => ({
        url: `/users/followings/${followerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
    }),
    updateUserAvatar: builder.mutation({
      query: (formData) => ({
        url: "/users/avatars",
        method: "PATCH",
        body: formData,
        token: true,
      }),
      invalidatesTags: ["Profile"],
    }),
    fetchOwnRecipes: builder.query({
      query: () => "/recipes/own",
      providesTags: ["Profile"],
    }),
    fetchFavoriteRecipes: builder.query({
      query: () => "/recipes/favorites",
      providesTags: ["Profile"],
    }),
    addToFavorites: builder.mutation({
      query: (recipeId) => ({
        url: "/recipes/favorites",
        method: "POST",
        body: { recipeId },
      }),
      invalidatesTags: ["Profile"],
    }),
    removeFromFavorites: builder.mutation({
      query: (recipeId) => ({
        url: "/recipes/favorites",
        method: "DELETE",
        body: { recipeId },
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useFetchCurrentUserQuery,
  useFetchUserByIdQuery,
  useFetchUserFollowersQuery,
  useFetchUserFollowingsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useUpdateUserAvatarMutation,
  useFetchOwnRecipesQuery,
  useFetchFavoriteRecipesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
} = profileApi;
