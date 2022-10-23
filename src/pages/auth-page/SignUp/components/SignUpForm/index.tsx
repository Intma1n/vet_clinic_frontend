import { FC, useState } from 'react';
import { ISignUpProps } from '../../types';

import {
  StyledButton,
  StyledFormHeaderText,
  StyledInput,
  StyledSelectFormControl,
  StyledSignUpForm,
  StyledSignUpFormWrapper,
} from './style';
import {
  validateAge,
  validateDocumentId,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateStage,
} from '../../../../../utils/validation/validation';
import { Controller, useForm } from 'react-hook-form';
import { IInitialFormState, IUserType } from './types';
import {
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { routes } from '../../../../../utils/routes';

const defaultValues = {
  name: '',
  surname: '',
  phoneNumber: '',
  password: '',
  position: '',
  age: '',
  stage: '',
  salary: '',
  documentId: '',
};
const SignUpForm: FC<ISignUpProps> = () => {
  const { handleSubmit, control, getValues, register } = useForm<IInitialFormState>({
    defaultValues,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [userType, setUserType] = useState<IUserType>({ userType: 'director' });

  const handleSetUserType = (userType: IUserType) => {
    setUserType(userType);
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitButton = (formData: IInitialFormState) => {
    console.log(userType.userType);
    console.log(formData);
  };

  return (
    <StyledSignUpFormWrapper>
      <StyledFormHeaderText>Регистрация</StyledFormHeaderText>
      <StyledSignUpForm onSubmit={handleSubmit(onSubmitButton)}>
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
              label="Имя"
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
              label="Фамилия"
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
              label="Номер телефона"
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
              label="Пароль"
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
        {userType.userType === 'employee' && (
          <>
            <Controller
              control={control}
              name={'position'}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                //@ts-ignore
                <StyledSelectFormControl error={error}>
                  <InputLabel>Должность</InputLabel>
                  <Select fullWidth value={value} label="Должность" onChange={onChange}>
                    <MenuItem value={'doctor'}>Доктор</MenuItem>
                    <MenuItem value={'nurse'}>Интерн</MenuItem>
                  </Select>
                </StyledSelectFormControl>
              )}
            />
            <Controller
              rules={{
                required: true,
                validate: () => {
                  //@ts-ignore
                  return validateAge(getValues('age'));
                },
              }}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <StyledInput
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  type="number"
                  label="Возраст"
                  helperText={
                    (getValues('age') &&
                      //@ts-ignore
                      getValues('age').length > 0 &&
                      //@ts-ignore
                      !validateAge(getValues('age')) &&
                      'Введите корректный возраст') ||
                    (error && 'Поле обязательно')
                  }
                />
              )}
              name={'age'}
            />
            <Controller
              rules={{
                required: true,
                validate: () => {
                  //@ts-ignore
                  return validateStage(getValues('stage'), getValues('age'));
                },
              }}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <StyledInput
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  type="text"
                  label="Стаж"
                  helperText={
                    //@ts-ignore
                    (getValues('stage').length > 0 &&
                      //@ts-ignore
                      !validateStage(getValues('stage'), getValues('age')) &&
                      'Введите корректный стаж') ||
                    (error && 'Поле обязательно')
                  }
                />
              )}
              name={'stage'}
            />
            <Controller
              rules={{
                required: true,
                validate: () => {
                  //@ts-ignore
                  return validateDocumentId(getValues('documentId'));
                },
              }}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <StyledInput
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  type="number"
                  label="Номер документа"
                  helperText={
                    (getValues('documentId') &&
                      //@ts-ignore
                      getValues('documentId').length > 0 &&
                      //@ts-ignore
                      !validateDocumentId(getValues('documentId')) &&
                      'Введите действительный номер документа') ||
                    (error && 'Поле обязательно')
                  }
                />
              )}
              name={'documentId'}
            />
            <Controller
              rules={{
                required: true,
              }}
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <StyledInput
                  error={!!error}
                  onChange={onChange}
                  value={value}
                  type="number"
                  label="Зарплата"
                  helperText={error && 'Поле обязательно'}
                />
              )}
              name={'salary'}
            />
          </>
        )}
        <RadioGroup defaultValue="director" row>
          <FormControlLabel
            onClick={() => handleSetUserType({ userType: 'director' })}
            value="director"
            control={<Radio />}
            label="Директор"
          />
          <FormControlLabel
            onClick={() => handleSetUserType({ userType: 'admin' })}
            value="admin"
            control={<Radio />}
            label="Админ"
          />
          <FormControlLabel
            onClick={() => handleSetUserType({ userType: 'employee' })}
            value="employee"
            control={<Radio />}
            label="Сотрудник"
          />
          <FormControlLabel
            onClick={() => handleSetUserType({ userType: 'client' })}
            value="client"
            control={<Radio />}
            label="Клиент"
          />
        </RadioGroup>
        <StyledButton type="submit" size="large" variant="contained">
          Войти
        </StyledButton>
      </StyledSignUpForm>
      <Link replace to={routes.signIn}>
        <h3>Уже есть аккаунт? Войти</h3>
      </Link>
    </StyledSignUpFormWrapper>
  );
};

export default SignUpForm;
