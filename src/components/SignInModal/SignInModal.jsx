import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { emailRegexp } from '../../constants/regex.js';
import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import { useAuth } from '../../hooks';
import { ERROR_MESSAGES } from '../../constants/validationMessages.js';
import Modal from '../Modal/Modal.jsx';

const SignInSchema = yup.object({
  email: yup
    .string()
    .matches(emailRegexp, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    })
    .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  password: yup.string().required(ERROR_MESSAGES.PASSWORD_IS_REQUIRED),
});

const SignInModal = ({ isOpen, onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (values) => {
    await signIn(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('email')} placeholder="Email*" />

        <label>
          <input
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'Password'}
            placeholder="password"
          />

          <button
            type="button"
            onClick={() => setIsPasswordVisible((prevState) => !prevState)}
          >
            <Icon name={isPasswordVisible ? 'eye' : 'closed-eye'} size={24} />
          </button>
        </label>

        <button type="submit">Sign in</button>
      </form>
    </Modal>
  );
};

export default SignInModal;
