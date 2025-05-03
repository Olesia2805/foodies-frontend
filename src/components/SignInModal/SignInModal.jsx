import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { emailRegexp } from '../../constants/regex.js';
import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import { useAuth } from '../../hooks';
import { ERROR_MESSAGES } from '../../constants/validationMessages.js';

const SignInSchema = yup.object({
  email: yup
    .string()
    .matches(emailRegexp, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    })
    .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  password: yup.string().required(ERROR_MESSAGES.PASSWORD_IS_REQUIRED),
});

const SignInModal = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, signOut, getUser } = useAuth();

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
  };

  const onSignOut = async () => {
    await signOut();
  };

  const onGetUser = async () => {
    await getUser();
  };

  return (
    <>
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
      <button onClick={onSignOut}>log out</button>
      <button onClick={onGetUser}>get user</button>
    </>
  );
};

export default SignInModal;
