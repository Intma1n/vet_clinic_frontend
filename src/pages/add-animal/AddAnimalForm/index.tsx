import { Controller, useForm } from 'react-hook-form';
import { IInitialFormState } from './types';
import { useEffect, useState } from 'react';
import { mockClients, mockEmployees } from '../../../assets/mockData';
import { IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import {
  StyledAddEmployeeForm,
  StyledAddEmployeeFormWrapper,
  StyledButton,
  StyledInput,
  StyledSelectFormControl,
} from './style';
import {
  validateAge,
  validateDocumentId,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateStage,
} from '../../../utils/validation/validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { addAnimal, getClients } from '../../../utils/api';
import { IAnimal } from '../../../constants/commonInterfaces';
const defaultValues = {
  client_id: '',
  animal_name: '',
  animal_type: '',
  animal_breed: '',
  animal_sex: '',
  animal_age: '',
};
const AddAnimalForm = () => {
  const [clients, setClients] = useState<any>([]);
  const { handleSubmit, control, getValues, register } = useForm<IInitialFormState>({
    defaultValues,
  });

  useEffect(() => {
    getClients().then((response) => setClients(response.data));
  }, []);
  let isClient = localStorage.getItem('userType') === 'client';
  const onSubmitButton = (formData: IInitialFormState) => {
    const { client_id, animal_breed, animal_name, animal_type } = formData;

    const data = {
      client_id: isClient ? localStorage.getItem('id') : client_id.toString(),
      animal_breed,
      animal_name,
      animal_type,
    };
    //@ts-ignore
    addAnimal(data);
  };
  const clientsArray =
    clients.length > 0
      ? //@ts-ignore
        clients.map((client) => (
          //@ts-ignore
          <MenuItem key={client.client_id} value={client.client_id}>
            {client.firstname + ' ' + client.lastname}
          </MenuItem>
        ))
      : null;

  return (
    <StyledAddEmployeeFormWrapper>
      <h3>Добавить животное клиенту</h3>
      <StyledAddEmployeeForm onSubmit={handleSubmit(onSubmitButton)}>
        {!isClient && (
          <Controller
            control={control}
            name={'client_id'}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              //@ts-ignore
              <StyledSelectFormControl error={error}>
                <InputLabel>Выберите клиента</InputLabel>
                <Select
                  fullWidth
                  value={value}
                  label="Выберите клиента"
                  onChange={onChange}
                >
                  {clientsArray}
                </Select>
              </StyledSelectFormControl>
            )}
          />
        )}
        <Controller
          rules={{
            required: true,
            validate: () => {
              return validateName(getValues('animal_name'));
            },
          }}
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <StyledInput
              error={!!error}
              onChange={onChange}
              value={value}
              type="text"
              label="Кличка"
              helperText={error && 'Поле обязательно'}
            />
          )}
          name={'animal_name'}
        />
        {/*<Controller*/}
        {/*  rules={{*/}
        {/*    required: true,*/}
        {/*  }}*/}
        {/*  control={control}*/}
        {/*  render={({ field: { onChange, value }, fieldState: { error } }) => (*/}
        {/*    <StyledInput*/}
        {/*      error={!!error}*/}
        {/*      onChange={onChange}*/}
        {/*      value={value}*/}
        {/*      type="number"*/}
        {/*      label="Возраст"*/}
        {/*      helperText={error && 'Поле обязательно'}*/}
        {/*    />*/}
        {/*  )}*/}
        {/*  name={'animal_age'}*/}
        {/*/>*/}
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
              type="text"
              label="Порода"
              helperText={error && 'Поле обязательно'}
            />
          )}
          name={'animal_breed'}
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
              type="text"
              label="Тип"
              helperText={error && 'Поле обязательно'}
            />
          )}
          name={'animal_type'}
        />
        {/*<Controller*/}
        {/*  rules={{*/}
        {/*    required: true,*/}
        {/*  }}*/}
        {/*  control={control}*/}
        {/*  render={({ field: { onChange, value }, fieldState: { error } }) => (*/}
        {/*    //@ts-ignore*/}
        {/*    <StyledSelectFormControl error={error}>*/}
        {/*      <InputLabel>Выберите пол</InputLabel>*/}
        {/*      <Select fullWidth value={value} label="Выберите пол" onChange={onChange}>*/}
        {/*        <MenuItem value="male">Мужской</MenuItem>*/}
        {/*        <MenuItem value="female">Женский</MenuItem>*/}
        {/*      </Select>*/}
        {/*    </StyledSelectFormControl>*/}
        {/*  )}*/}
        {/*  name={'animal_sex'}*/}
        {/*/>*/}
        <StyledButton type="submit" size="large" variant="contained">
          Добавить животное
        </StyledButton>
      </StyledAddEmployeeForm>
    </StyledAddEmployeeFormWrapper>
  );
};

export default AddAnimalForm;
