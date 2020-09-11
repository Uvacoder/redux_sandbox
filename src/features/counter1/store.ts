import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from '../../app/store';
import { actions as counter2Actions  } from "../counter2/store";
import { id } from "evt/tools/typeSafety/id"; 

export type State = {
  value: number;
};

export const name = "counter1";

export const slice = createSlice({
  "name": name,
  "initialState": id<State>({
    "value": 0
  }),
  "reducers": {
    "increment": state => {
      state.value += 1;
    },
    "decrement": state => {
      state.value -= 1;
    },
    "incrementByAmount": (state, { payload }: PayloadAction<{ amount: number; }>) => {
      const { amount } = payload;
      state.value += amount;
    }
  },
  "extraReducers": {
    [counter2Actions.incrementBothCounter.type]: state => {
      state.value += 1;
    }
  }
});

const syncActions = slice.actions;



const thunks = { 
  "incrementAsync": (payload: { amount: number; }): AppThunk=> async dispatch => {

    const { amount } = payload;

    await new Promise(resolve=> setTimeout(resolve,1000));

    dispatch(syncActions.incrementByAmount({ amount }));

  }


}

export const actions = {
  ...slice.actions,
  ...thunks
}

export const select = (state: RootState) => state.counter1;

export const reducer= slice.reducer;

