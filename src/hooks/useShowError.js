import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const useShowError = (error) => {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
};