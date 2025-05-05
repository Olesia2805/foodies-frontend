import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Modal from '../Modal/Modal.jsx';
import ModalHeader from '../ModalHeader/ModalHeader.jsx';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';

import { emailRegexp } from '../../constants/regex.js';
import { ERROR_MESSAGES } from '../../constants/validationMessages.js';

import { useAuth } from '../../hooks';
import Input from '../Input/Input.jsx';
import FormInputs from '../FormInputs/FormInputs.jsx';
import modalStyles from '../Modal/Modal.module.css';
import ModalActions from '../ModalActions/ModalActions.jsx';
import ModalSwitchMessage from '../ModalSwitchMessage/ModalSwitchMessage.jsx';

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
  const { signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
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
      <ModalHeader title="Sign Up" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputs>
          <Input {...register('name')} placeholder="Name" required />

          <Input {...register('email')} placeholder="Email" required />

          <Input
            {...register('password')}
            type={isPasswordVisible ? 'text' : 'Password'}
            placeholder="Password"
            required
            icon={
              <Icon name={isPasswordVisible ? 'eye' : 'closed-eye'} size={24} />
            }
            onIconClick={() => setIsPasswordVisible((prevState) => !prevState)}
          />
        </FormInputs>

        <ModalActions>
          <Button type="submit" fullWidth>
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
