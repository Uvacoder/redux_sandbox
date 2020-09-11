import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { id } from "evt/tools/typeSafety/id";

export type State = {
    value: number;
    message: string;
};

export const name = "counter2";

const asyncThunks = {
    ...(() => {

        const typePrefix = "incrementByAmountAfterDelay";

        return {
            [typePrefix]: createAsyncThunk(
                `${name}/${typePrefix}`,
                async (payload: { amount: number; }, { dispatch }) => {

                    const { amount } = payload;

                    await new Promise(resolve => setTimeout(resolve, 500));

                    dispatch(syncActions.setMessage({ "message": "A message in the middle" }));

                    await new Promise(resolve => setTimeout(resolve, 500));

                    return { "amountOut": amount };

                }
            )
        }

    })()
};


import("../../app/store").then(async ({ store })=> {

    const lastReturnedAction = await store.dispatch(asyncThunks.incrementByAmountAfterDelay({ "amount": 100 }));

    if( asyncThunks.incrementByAmountAfterDelay.fulfilled.match(lastReturnedAction) ){


    }


    

});

const reusableReducers = {
    "setMessage": (state: State, { payload }: { payload: { message: string; } }) => {
        const { message } = payload;
        state.message = message;
    }
};


export const slice = createSlice({
    name,
    "initialState": id<State>({
        "value": 666,
        "message": ""
    }),
    "reducers": {
        "incrementBothCounter": state => {
            state.value += 1;
        },
        "decrement": state => {
            state.value -= 1;
        },
        ...reusableReducers
    },
    "extraReducers": builder => {

        builder.addCase(
            asyncThunks.incrementByAmountAfterDelay.fulfilled,
            (state, { payload }) => {

                const { amountOut } = payload;

                reusableReducers.setMessage(
                    state,
                    { "payload": { "message": "Done!" } }
                );

                state.value += amountOut;

            }
        );

        builder.addCase(
            asyncThunks.incrementByAmountAfterDelay.pending,
            state => {

                reusableReducers.setMessage(
                    state,
                    { "payload": { "message": "Start incrementByAmountAfterDelay" } }
                );

            }
        );

    }
});

const syncActions = slice.actions;

export const actions = {
    ...syncActions,
    ...asyncThunks
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const select = (state: RootState) => state.counter2;

export const reducer = slice.reducer;
