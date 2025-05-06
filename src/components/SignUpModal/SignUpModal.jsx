import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import Input from '../Input/Input.jsx';
import FormInputs from '../FormInputs/FormInputs.jsx';
import ModalActions from '../ModalActions/ModalActions.jsx';
import ModalSwitchMessage from '../ModalSwitchMessage/ModalSwitchMessage.jsx';

import { emailRegexp } from '../../constants/regex.js';
import { ERROR_MESSAGES } from '../../constants/messages.js';

import { useAuth } from '../../hooks';

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

const SignUpModal = ({ isOpen, onClose, setOtherModal }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { signUp, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(SignUpSchema),
  });

  const onSubmit = async (values) => {
    try {
      await signUp(values);
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  const fields = watch(['name', 'email', 'password']);

  const isDisabled = isLoading || fields.some((value) => !value);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader title="Sign Up" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputs>
          <Input
            {...register('name')}
            placeholder="Name"
            required
            error={errors.name?.message}
          />

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
            Create
          </Button>

          <ModalSwitchMessage
            message="I already have an account?"
            buttonText="Sign in"
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

export default SignUpModal;
