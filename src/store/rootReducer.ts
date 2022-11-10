import { combineReducers } from '@reduxjs/toolkit';
import clientsSlice from '../pages/clients/reducers';
import employeesSlice from '../pages/employees/reducers';

const rootReducer = combineReducers({
  clientsDisplay: clientsSlice,
  employeesDisplay: employeesSlice,
});

export default rootReducer;
