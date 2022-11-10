import { IClient, IEmployee } from '../../constants/commonInterfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IEmployee[] = [];

const employeesSlice = createSlice({
  name: 'employeesDisplay',
  initialState,
  reducers: {
    setEmployees(state, action: PayloadAction<IEmployee[]>) {
      state = action.payload;
    },
    addEmployee(state, action: PayloadAction<IEmployee>) {
      state.push(action.payload);
    },
    deleteEmployee(state, action: PayloadAction<string>) {
      const index = action.payload;

      state = state.filter((elem) => elem.employee_id !== index);
    },
    updateEmployee(state, action: PayloadAction<IEmployee>) {
      state[+action.payload.employee_id] = action.payload;
    },
  },
});

export const { setEmployees, addEmployee, deleteEmployee, updateEmployee } =
  employeesSlice.actions;

export default employeesSlice.reducer;
