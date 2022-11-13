import { FC, useEffect, useState } from 'react';
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
import { Link, useNavigate } from 'react-router-dom';
import { routes } from '../../../../../constants/routes';
import { IUserType } from '../../../SignUp/components/SignUpForm/types';
import {
  adminAuth,
  clientAuth,
  directorAuth,
  employeeAuth,
  getClients,
  getEmployees,
} from '../../../../../utils/api';
import { IClient, IEmployee } from '../../../../../constants/commonInterfaces';

const defaultValues = {
  firstname: '',
  lastname: '',
  phone_number: '',
  password: '',
};
const SignInForm: FC<SignInProps> = () => {
  const { handleSubmit, control, getValues } = useForm<IInitialFormState>({
    defaultValues,
  });
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [clients, setClients] = useState<IClient[]>([]);

  useEffect(() => {
    getClients().then((data) => {
      console.log(data.data);
      setClients(data.data);
    });
  }, []);

  useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data.data);
      console.log(data.data);
    });
  }, []);
  const navigate = useNavigate();
  const [userType, setUserType] = useState<IUserType>({ userType: 'director' });

  const handleSetUserType = (userType: IUserType) => {
    setUserType(userType);
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onSubmitButton = (formData: IInitialFormState) => {
    const { firstname, lastname, phone_number, password } = formData;
    if (userType.userType === 'director') {
      const data = { firstname, lastname, phone_number, password };
      directorAuth(data).then((data) => {
        console.log(data);
        localStorage.setItem('userType', 'director');
        localStorage.setItem('id', data.data.stff_id);
        navigate(`/main/director`, { replace: true });
      });
    }
    if (userType.userType === 'client') {
      const data = { firstname, lastname, phone_number, password };
      clientAuth(data).then((data) => {
        console.log(data);
        const currentClient = clients.filter(
            (client) =>
                //@ts-ignore
                client.firstname === firstname && client.lastname === lastname
        );
        localStorage.setItem('userType', 'client');
        //@ts-ignore
        localStorage.setItem('id', currentClient[0].client_id);
        //@ts-ignore
        navigate(`/main/client`, { replace: true });
      });
    }
    if (userType.userType === 'admin') {
      const data = { firstname, lastname, phone_number, password };
      adminAuth(data).then((data) => {
        console.log(data);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('id', data.data.employee_id);
        navigate(`/main/admin`, { replace: true });
      });
    }
    if (userType.userType === 'employee') {
      const data = { firstname, lastname, phone_number, password };
      employeeAuth(data).then((data) => {
        console.log(data);
        const currentEmployee = employees.filter(
          (employee) =>
            //@ts-ignore
            employee.first_name === firstname && employee.last_name === lastname
        );
        console.log('currentEmployee', currentEmployee);
        localStorage.setItem('userType', currentEmployee[0].position);
        localStorage.setItem('id', data.data.stff_id);
        navigate(`/main/${currentEmployee[0].position}`, {
          replace: true,
        });
      });
    }
  };

  return (
    <StyledSignInFormWrapper>
      <StyledFormHeaderText>Войдите в систему</StyledFormHeaderText>
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
        </RadioGroup>
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
