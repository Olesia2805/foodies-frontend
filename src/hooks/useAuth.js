import { useDispatch, useSelector } from 'react-redux';
import {
  signInUserOps,
  selectIsAuthenticated,
  signUpUserOps,
  logOutUserOps,
  getMeOps,
  selectUser,
  selectIsAuthLoading,
  verifyUserWithTokenOps,
} from '../redux/auth';
import { fetchFavoriteRecipes } from '../redux/recipes/operations';

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsAuthLoading);

  const signUp = async (credentials) => {
    return await dispatch(signUpUserOps(credentials)).unwrap();
  };

  const signIn = async (credentials) => {
    const result = await dispatch(signInUserOps(credentials)).unwrap();
    // Fetch favorite recipes
    try {
      dispatch(fetchFavoriteRecipes());
    } catch (e) {
      console.error("Failed to load favorites after login:", e);
    }
    return result;
  };

  const logOut = async () => {
    return await dispatch(logOutUserOps()).unwrap();
  };

  const getUser = async () => {
    return await dispatch(getMeOps()).unwrap();
  };

  const verifyUser = async (token) => {
    return await dispatch(verifyUserWithTokenOps(token)).unwrap();
  };

  return {
    isAuthenticated,
    user,
    isLoading,
    getUser,
    signUp,
    signIn,
    logOut,
    verifyUser,
  };
};

export default useAuth;
