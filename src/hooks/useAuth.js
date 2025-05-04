import { useDispatch, useSelector } from 'react-redux';
import {
  signInUserOps,
  selectIsAuthenticated,
  signUpUserOps,
  signOutUserOps,
  getMeOps,
  selectUser,
} from '../redux/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const signUp = async (credentials) => {
    dispatch(signUpUserOps(credentials));
  };

  const signIn = async (credentials) => {
    dispatch(signInUserOps(credentials));
  };

  const signOut = async () => {
    dispatch(signOutUserOps());
  };

  const getUser = async () => {
    dispatch(getMeOps());
  };

  return { isAuthenticated, user, getUser, signUp, signIn, signOut };
};

export default useAuth;
