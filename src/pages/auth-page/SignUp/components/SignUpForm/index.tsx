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
      <StyledFormHeaderText>??????????????????????</StyledFormHeaderText>
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
              label="??????"
              helperText={
                (getValues('firstname').length > 0 &&
                  !validateName(getValues('firstname')) &&
                  '???????????????????????? ???????????? ??????????') ||
                (error && '???????? ??????????????????????')
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
              label="??????????????"
              helperText={
                (getValues('lastname').length > 0 &&
                  !validateName(getValues('lastname')) &&
                  '???????????????????????? ???????????? ??????????????') ||
                (error && '???????? ??????????????????????')
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
              label="?????????? ????????????????"
              error={!!error}
              helperText={
                (getValues('phone_number').length > 0 &&
                  !validatePhoneNumber(getValues('phone_number')) &&
                  '???????????????????????? ???????????? ????????????????') ||
                (error && '???????? ??????????????????????')
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
              label="????????????"
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
                  '???????????? ???????????? ?????????????????? ???? ?????????? 8 ???????????????? ?? ???????????????? ?? ???????? ???????? ???? 1 ?????????? ?? ??????????') ||
                (error && '???????? ??????????????????????')
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
                  <InputLabel>??????????????????</InputLabel>
                  <Select fullWidth value={value} label="??????????????????" onChange={onChange}>
                    <MenuItem value={'doctor'}>????????????</MenuItem>
                    <MenuItem value={'intern'}>????????????</MenuItem>
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
                  label="??????????????"
                  helperText={
                    (getValues('age') &&
                      //@ts-ignore
                      getValues('age').length > 0 &&
                      //@ts-ignore
                      !validateAge(getValues('age')) &&
                      '?????????????? ???????????????????? ??????????????') ||
                    (error && '???????? ??????????????????????')
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
                  label="????????"
                  helperText={
                    //@ts-ignore
                    (getValues('stage').length > 0 &&
                      //@ts-ignore
                      !validateStage(getValues('stage'), getValues('age')) &&
                      '?????????????? ???????????????????? ????????') ||
                    (error && '???????? ??????????????????????')
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
                  label="?????????? ??????????????????"
                  helperText={
                    (getValues('document_id') &&
                      //@ts-ignore
                      getValues('document_id').length > 0 &&
                      //@ts-ignore
                      !validateDocumentId(getValues('document_id')) &&
                      '?????????????? ???????????????????????????? ?????????? ??????????????????') ||
                    (error && '???????? ??????????????????????')
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
                  label="????????????????"
                  helperText={error && '???????? ??????????????????????'}
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
            label="??????????????????"
          />
          <FormControlLabel
            onClick={() => handleSetUserType({ userType: 'client' })}
            value="client"
            control={<Radio />}
            label="????????????"
          />
        </RadioGroup>
        <StyledButton type="submit" size="large" variant="contained">
          ??????????
        </StyledButton>
      </StyledSignUpForm>
      <Link replace to={routes.signIn}>
        <h3>?????? ???????? ??????????????? ??????????</h3>
      </Link>
    </StyledSignUpFormWrapper>
  );
};

export default SignUpForm;
