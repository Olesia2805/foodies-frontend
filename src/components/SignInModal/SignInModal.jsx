import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import Icon from '../Icon/Icon.jsx';
import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import Button from '../Button/Button.jsx';
import Input from '../Input/Input.jsx';
import ModalActions from '../ModalActions/ModalActions.jsx';

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants/messages.js';
import { emailRegexp } from '../../constants/regex.js';

import { useAuth } from '../../hooks';

import FormInputs from '../FormInputs/FormInputs.jsx';
import ModalSwitchMessage from '../ModalSwitchMessage/ModalSwitchMessage.jsx';

const SignInSchema = yup.object({
  email: yup
    .string()
    .matches(emailRegexp, {
      message: ERROR_MESSAGES.INVALID_EMAIL,
    })
    .required(ERROR_MESSAGES.EMAIL_IS_REQUIRED),
  password: yup.string().required(ERROR_MESSAGES.PASSWORD_IS_REQUIRED),
});

const SignInModal = ({ isOpen, onClose, setOtherModal }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signIn, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (values) => {
    try {
      await signIn(values);
      onClose();
      toast.success(SUCCESS_MESSAGES.SIGN_IN_SUCCESSFUL);
    } catch (error) {
      toast.error(error);
    }
  };

  const fields = watch(['email', 'password']);

  const isDisabled = isLoading || fields.some((value) => !value);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Sign In" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputs>
          <Input
            {...register('email')}
            placeholder="Email"
            required
            error={errors.email?.message}
          />

          <Input
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'Password'}
            placeholder="Password"
            required
            icon={
              <Icon name={isPasswordVisible ? 'eye' : 'closed-eye'} size={24} />
            }
            onIconClick={() => setIsPasswordVisible((prevState) => !prevState)}
            error={errors.password?.message}
          />
        </FormInputs>

        <ModalActions>
          <Button
            fullWidth
            type="submit"
            loading={isLoading}
            disabled={isDisabled}
          >
            Sign in
          </Button>

          <ModalSwitchMessage
            message="Don't have an account?"
            buttonText="Create an account"
            onClick={() => {
              setOtherModal();
              reset();
            }}
          />
        </ModalActions>
      </form>
    </Modal>
  );
};

export default SignInModal;
