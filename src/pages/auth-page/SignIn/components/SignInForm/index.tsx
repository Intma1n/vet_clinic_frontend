import { FC, useState } from 'react';
import { SignInProps } from '../../types';

import {
  StyledButton,
  StyledChangeAuthText,
  StyledFormHeaderText,
  StyledInput,
  StyledSignInForm,
  StyledSignInFormWrapper,
} from './style';
import {
  validateName,
  validatePassword,
  validatePhoneNumber,
} from '../../../../../utils/validation/validation';
import { Controller, useForm } from 'react-hook-form';
import { IInitialFormState } from './types';
import { FormControlLabel, IconButton, Radio, RadioGroup } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { routes } from '../../../../../utils/routes';

const defaultValues = {
  name: '',
  surname: '',
  phoneNumber: '',
  password: '',
};
const SignInForm: FC<SignInProps> = () => {
  const { handleSubmit, control, getValues } = useForm<IInitialFormState>({
    defaultValues,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onSubmitButton = (formData: IInitialFormState) => {
    console.log(formData);
  };

  return (
    <StyledSignInFormWrapper>
      <StyledFormHeaderText>Войдите в систему</StyledFormHeaderText>
      <StyledSignInForm onSubmit={handleSubmit(onSubmitButton)}>
        <Controller
          rules={{
            required: true,
            validate: () => {
              return validateName(getValues('name'));
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
                (getValues('name').length > 0 &&
                  !validateName(getValues('name')) &&
                  'Неправильный формат имени') ||
                (error && 'Поле обязательно')
              }
            />
          )}
          name={'name'}
        />
        <Controller
          rules={{
            required: true,
            validate: () => {
              return validateName(getValues('surname'));
            },
          }}
          control={control}
          name={'surname'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              label="Surname"
              helperText={
                (getValues('surname').length > 0 &&
                  !validateName(getValues('surname')) &&
                  'Неправильный формат фамилии') ||
                (error && 'Поле обязательно')
              }
            />
          )}
        />
        <Controller
          control={control}
          name={'phoneNumber'}
          rules={{
            required: true,
            validate: () => {
              return validatePhoneNumber(getValues('phoneNumber'));
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              onChange={onChange}
              value={value}
              label="Phone number"
              error={!!error}
              helperText={
                (getValues('phoneNumber').length > 0 &&
                  !validatePhoneNumber(getValues('phoneNumber')) &&
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
          Войти
        </StyledButton>
      </StyledSignInForm>
      <Link replace to={routes.signUp}>
        <StyledChangeAuthText>Зарегистрироваться</StyledChangeAuthText>
      </Link>
    </StyledSignInFormWrapper>
  );
};

export default SignInForm;
