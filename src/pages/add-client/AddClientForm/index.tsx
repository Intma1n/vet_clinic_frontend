import { Controller, useForm } from 'react-hook-form';
import { IInitialFormState } from './types';
import { useState } from 'react';
import {
  StyledButton,
  StyledChangeAuthText,
  StyledFormHeaderText,
  StyledInput,
  StyledSignInForm,
  StyledSignInFormWrapper,
} from '../../auth-page/SignIn/components/SignInForm/style';
import {
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../../utils/validation/validation';
import { IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { clientRegister } from '../../../utils/api';
const defaultValues = {
  firstname: '',
  lastname: '',
  phone_number: '',
  password: '',
};
const AddClientForm = () => {
  const { handleSubmit, control, getValues } = useForm<IInitialFormState>({
    defaultValues,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onSubmitButton = (formData: IInitialFormState) => {
    console.log(formData);
    const { firstname, lastname, phone_number, password } = formData;
    const data = { firstname, lastname, phone_number, password };
    clientRegister(data).then((data) => {
      console.log(data);
    });
  };

  return (
    <StyledSignInFormWrapper>
      <StyledFormHeaderText>Зарегистрировать клиента</StyledFormHeaderText>
      <StyledSignInForm onSubmit={handleSubmit(onSubmitButton)}>
        <Controller
          rules={{
            required: true,
            validate: () => {
              return validateName(getValues('firstname'));
            },
          }}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              type="text"
              label="Name"
              helperText={
                (getValues('firstname').length > 0 &&
                  !validateName(getValues('firstname')) &&
                  'Неправильный формат имени') ||
                (error && 'Поле обязательно')
              }
            />
          )}
          name={'firstname'}
        />
        <Controller
          rules={{
            required: true,
            validate: () => {
              return validateName(getValues('lastname'));
            },
          }}
          control={control}
          name={'lastname'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              label="lastname"
              helperText={
                (getValues('lastname').length > 0 &&
                  !validateName(getValues('lastname')) &&
                  'Неправильный формат фамилии') ||
                (error && 'Поле обязательно')
              }
            />
          )}
        />
        <Controller
          control={control}
          name={'phone_number'}
          rules={{
            required: true,
            validate: () => {
              return validatePhoneNumber(getValues('phone_number'));
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              onChange={onChange}
              value={value}
              label="Phone number"
              error={!!error}
              helperText={
                (getValues('phone_number').length > 0 &&
                  !validatePhoneNumber(getValues('phone_number')) &&
                  'Неправильный формат телефона') ||
                (error && 'Поле обязательно')
              }
            />
          )}
        />
        <Controller
          control={control}
          name={'password'}
          rules={{
            required: true,
            validate: () => {
              return validatePassword(getValues('password'));
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              type={isPasswordVisible ? 'text' : 'password'}
              onChange={onChange}
              value={value}
              label="Password"
              error={!!error}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              helperText={
                (getValues('password').length > 0 &&
                  !validatePassword(getValues('password')) &&
                  'Пароль должен содержать не менее 8 символов и включать в себя хотя бы 1 цифру и букву') ||
                (error && 'Поле обязательно')
              }
            />
          )}
        />

        <StyledButton type="submit" size="large" variant="contained">
          Зарегистрировать
        </StyledButton>
      </StyledSignInForm>
    </StyledSignInFormWrapper>
  );
};

export default AddClientForm;
