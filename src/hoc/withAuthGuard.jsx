import { Navigate } from 'react-router-dom';

import { ROUTER } from '../constants/router';
import { useAuth } from '../hooks';

const withAuthGuard = (Component) => {
  return function GuardedComponent(props) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Navigate to={ROUTER.HOME} replace />
    );
  };
};
export default withAuthGuard;
