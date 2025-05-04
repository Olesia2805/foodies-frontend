import { useDispatch, useSelector } from 'react-redux';
import {
  signInUserOps,
  selectIsAuthenticated,
  signUpUserOps,
  logOutUserOps,
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

  const logOut = async () => {
    dispatch(logOutUserOps());
  };

  const getUser = async () => {
    dispatch(getMeOps());
  };

  return { isAuthenticated, user, getUser, signUp, signIn, logOut };
};

export default useAuth;
