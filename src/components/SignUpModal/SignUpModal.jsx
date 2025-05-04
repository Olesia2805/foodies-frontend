import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { emailRegexp } from '../../constants/regex.js';
import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import { useAuth } from '../../hooks';
import { ERROR_MESSAGES } from '../../constants/validationMessages.js';
import Modal from '../Modal/Modal.jsx';

const SignUpSchema = yup.object({
  name: yup.string().required(ERROR_MESSAGES.NAME_IS_REQUIRED),
  email: yup
    .string()
    .matches(emailRegexp, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    })
    .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  password: yup.string().required(ERROR_MESSAGES.PASSWORD_IS_REQUIRED),
});

const SignUpModal = ({ isOpen, onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (values) => {
    await signUp(values);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name')} placeholder="Name*" />
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
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};

export default SignUpModal;
