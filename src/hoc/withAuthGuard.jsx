import { Navigate } from 'react-router-dom';

import { ROUTER } from '../constants/router';
import { useAuth } from '../hooks';

const withAuthGuard = (Component) => {
  const { isAuthenticated } = useAuth();

  return (props) => {
    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to={ROUTER.HOME} replace />
    );
  };
};

export default withAuthGuard;
