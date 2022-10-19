import { FC, useState } from 'react';
import { SignInProps } from '../../types';

import {
  StyledButton,
  StyledFormHeaderText,
  StyledInput,
  StyledSignInForm,
  StyledSignInFormWrapper,
} from './style';
import { validatePhoneNumber } from '../../../../../utils/validation/validation';
import { Controller, useForm } from 'react-hook-form';
interface initialFormState {
  name: string;
  surname: string;
  phoneNumber: string;
}
const defaultValues = { name: '', surname: '', phoneNumber: '' };
const SignInForm: FC<SignInProps> = () => {

  const { handleSubmit, control, getValues } = useForm<initialFormState>(
    {
      defaultValues,
    }
  );

  const onSubmitButton = (formData: initialFormState) => {
    console.log(formData);
  };
  return (
    <StyledSignInFormWrapper>
      <StyledFormHeaderText>Войдите в систему</StyledFormHeaderText>
      <StyledSignInForm onSubmit={handleSubmit(onSubmitButton)}>
        <Controller
          rules={{ required: true }}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              type="text"
              label="Name"
              helperText={error && 'Поле обязательно'}
            />
          )}
          name={'name'}
        />
        <Controller
          rules={{ required: true }}
          control={control}
          name={'surname'}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              label="Surname"
              helperText={error && 'Поле обязательно'}
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
        <StyledButton type="submit" size="large" variant="contained">
          Войти
        </StyledButton>
      </StyledSignInForm>
    </StyledSignInFormWrapper>
  );
};

export default SignInForm;
