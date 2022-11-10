import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IClient } from '../../constants/commonInterfaces';

const initialState: IClient[] = [];

const clientsSlice = createSlice({
  name: 'clientsDisplay',
  initialState,
  reducers: {
    setClients(state, action: PayloadAction<IClient[]>) {
      state = action.payload;
    },
    addClient(state, action: PayloadAction<IClient>) {
      state.push(action.payload);
    },
  },
});

export const { setClients, addClient } = clientsSlice.actions;

export default clientsSlice.reducer;
