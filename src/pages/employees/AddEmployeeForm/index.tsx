import { Controller, useForm } from 'react-hook-form';
import {
  StyledAddEmployeeForm,
  StyledAddEmployeeFormWrapper,
  StyledInput,
  StyledSelectFormControl,
  StyledButton,
} from './style';
import { IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import {
  validateAge,
  validateDocumentId,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateStage,
} from '../../../utils/validation/validation';
import { IAddEmployeeForm, IInitialFormState } from './types';
import { FC, useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { mockEmployees } from '../../../assets/mockData';
import { addEmployee, getEmployees, patchEmployee } from '../../../utils/api';
const defaultValues = {
  employee_id: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  password: '',
  position: '',
  age: '',
  stage: '',
  salary: '',
  document_id: '',
};
const AddEmployeeForm: FC<IAddEmployeeForm> = ({ isUpdating }: IAddEmployeeForm) => {
  const [employees, setEmployees] = useState<any>([]);
  const [updatingEmployeeId, setUpdatingEmployeeId] = useState<number>(1);
  const [updatingEmployeeLastName, setUpdatingEmployeeLastName] = useState<string>('');
  useEffect(() => {
    getEmployees().then((data) => {
      console.log(data.data);
      setEmployees(data.data);
    });
  }, []);
  const { handleSubmit, control, getValues, register } = useForm<IInitialFormState>({
    defaultValues,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const handleShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const onSubmitButton = (formData: IInitialFormState) => {
    const {
      employee_id,
      firstname,
      lastname,
      phone_number,
      password,
      position,
      age,
      stage,
      salary,
      document_id,
    } = formData;
    if (isUpdating) {
      const data = {
        firstname,
        lastname,
        phone_number,
        position,
        age,
        stage,
        salary,
        document_id,
      };
      //@ts-ignore
      patchEmployee(data).then((data) => console.log(data.data));
    } else {
      const data = {
        sex: 'female',
        firstname,
        lastname,
        phone_number,
        password,
        position,
        age,
        stage,
        salary,
        document_id,
      };
      addEmployee(data).then((data) => console.log(data.data));
    }
    console.log(formData);
  };

  const handleSetUserNames = () => {
    const updatingEmployee = employees.filter(
      //@ts-ignore
      (employee) => employee.employee_id === updatingEmployeeId
    );
    return {
      firstname: updatingEmployee[0].firstname,
      lastname: updatingEmployee[0].lastname,
    };
  };
  const handleChange = (id: number) => {
    setUpdatingEmployeeId(id);
  };
  //@ts-ignore
  const employeesArray = employees.map((employee) => (
    <MenuItem value={employee.employee_id}>
      {employee.first_name + ' ' + employee.last_name}
    </MenuItem>
  ));
  return (
    <StyledAddEmployeeFormWrapper isUpdating={isUpdating}>
      <h3>{isUpdating ? 'Обновить информацию о сотруднике' : 'Добавить сотрудника'}</h3>
      <StyledAddEmployeeForm onSubmit={handleSubmit(onSubmitButton)}>
        {/*{isUpdating && (*/}
        {/*  <Controller*/}
        {/*    control={control}*/}
        {/*    name={'employee_id'}*/}
        {/*    rules={{*/}
        {/*      required: true,*/}
        {/*    }}*/}
        {/*    render={({ field: { onChange, value }, fieldState: { error } }) => (*/}
        {/*      //@ts-ignore*/}
        {/*      <StyledSelectFormControl error={error}>*/}
        {/*        <InputLabel>Выберите сотрудника</InputLabel>*/}
        {/*        <Select*/}
        {/*          fullWidth*/}
        {/*          value={value}*/}
        {/*          label="Выберите сотрудника"*/}
        {/*          onChange={onChange}*/}
        {/*        >*/}
        {/*          {employeesArray}*/}
        {/*        </Select>*/}
        {/*      </StyledSelectFormControl>*/}
        {/*    )}*/}
        {/*  />*/}
        {/*)}*/}
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
        {!isUpdating && (
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
        )}
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
        <StyledButton type="submit" size="large" variant="contained">
          {isUpdating ? 'Обновить информацию' : 'Добавить сотрудника'}
        </StyledButton>
      </StyledAddEmployeeForm>
    </StyledAddEmployeeFormWrapper>
  );
};

export default AddEmployeeForm;
