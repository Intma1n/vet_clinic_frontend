import { IProcedure } from '../../../constants/commonInterfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IState {
  clientId: string;
  data: IProcedure[];
}

const initialState: IState[] = [];

const proceduresSlice = createSlice({
  name: 'proceduresDisplay',
  initialState,
  reducers: {
    addProcedure(state, action: PayloadAction<IState>) {
      state.push(action.payload);
    },
    updateProcedure(state, action: PayloadAction<string>) {

    },
  },
});
