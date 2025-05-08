import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../hooks';

const useVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const hasVerified = useRef(false);

  const { verifyUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');

    const verifyUserHandler = async () => {
      if (hasVerified.current || !token) return;

      hasVerified.current = true;

      try {
        const response = await verifyUser(token);
        toast.success(response.message);
      } catch (error) {
        toast.error(error.message);
      }
      navigate('/', { replace: true });
    };

    verifyUserHandler();
  }, [searchParams]);
};

export default useVerification;
