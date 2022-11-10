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
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../../constants/routes';
import { clientRegister, employeeRegister } from '../../../../../utils/api';

const defaultValues = {
  firstname: '',
  lastname: '',
  phone_number: '',
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
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [userType, setUserType] = useState<IUserType>({ userType: 'director' });

  const handleSetUserType = (userType: IUserType) => {
    setUserType(userType);
  };

  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const onSubmitButton = (formData: IInitialFormState) => {
    const {
      firstname,
      lastname,
      phone_number,
      password,
      age,
      stage,
      salary,
      position,
      document_id,
    } = formData;
    if (userType.userType === 'client') {
      //@ts-ignore
      const data = { firstname, lastname, phone_number, password };
      clientRegister(data).then((data) => {
        console.log(data);
        localStorage.setItem('userType', 'client');
        localStorage.setItem('id', data.data.client_id);
        navigate(`/main/client/${data.data.client_id}`, { replace: true });
      });
    }
    if (userType.userType === 'employee') {
      //@ts-ignore
      const data = {
        firstname,
        lastname,
        phone_number,
        password,
        sex: 'female',
        age,
        stage,
        salary,
        position,
        document_id,
      };
      //@ts-ignore
      employeeRegister(data).then((data) => {
        console.log(data);
        localStorage.setItem('userType', data.data.position);
        localStorage.setItem('id', data.data.employee_id);
        if (data.data.position) {
          navigate(`/main/${data.data.position}/${data.data.employee_id}`);
        }
      });
    }
  };

  return (
    <StyledSignUpFormWrapper>
      <StyledFormHeaderText>Регистрация</StyledFormHeaderText>
      <StyledSignUpForm onSubmit={handleSubmit(onSubmitButton)}>
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
              label="Имя"
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
              label="Фамилия"
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
              label="Номер телефона"
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
                    <MenuItem value={'intern'}>Интерн</MenuItem>
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
                  return validateDocumentId(getValues('document_id'));
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
                    (getValues('document_id') &&
                      //@ts-ignore
                      getValues('document_id').length > 0 &&
                      //@ts-ignore
                      !validateDocumentId(getValues('document_id')) &&
                      'Введите действительный номер документа') ||
                    (error && 'Поле обязательно')
                  }
                />
              )}
              name={'document_id'}
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
