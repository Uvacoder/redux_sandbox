import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import * as counter1 from '../features/counter1/store';
import * as counter2 from "../features/counter2/store";
import * as reactRedux from  "react-redux";

export const store = configureStore({
  "reducer": {
    [counter1.name]: counter1.reducer,
    [counter2.name]: counter2.reducer,
  },
});

export const useDispatch = ()=> reactRedux.useDispatch<typeof store.dispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
