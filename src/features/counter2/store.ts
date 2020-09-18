import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
                async (payload: { amount: number; }, thunkApi) => {

                    const { amount } = payload;

                    if( amount < 0 ){

                        throw new Error("The counter was negative");

                    }

                    await new Promise(resolve => setTimeout(resolve, 500));

                    thunkApi.dispatch(syncActions.setMessage({ "message": "A message in the middle" }));

                    await new Promise(resolve => setTimeout(resolve, 500));

                    await thunkApi.dispatch(asyncThunks.setMessageAfterMicroDelay({ "message": "tick" }));


                    //TODO: See if when aborted it still resolves

                    return { "amountOut": amount };

                }
            )
        };

    })(),
    ...(() => {

        const typePrefix = "setMessageAfterMicroDelay";

        return {
            [typePrefix]: createAsyncThunk(
                `${name}/${typePrefix}`,
                async (payload: { message: string; }, { dispatch }) => {

                    const { message } = payload;

                    await new Promise(resolve => setTimeout(resolve, 50));

                    return { "message": `=>${message}<=` };

                }
            )
        }

    })()
};

const reusableReducers = {
    "setMessage": (state: State, { payload }: { payload: { message: string; } }) => {
        const { message } = payload;
        state.message = message;
    }
};


export const slice = createSlice({
    name,
    "initialState": id<State>({
        "value": 0,
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

        builder.addCase(
            asyncThunks.setMessageAfterMicroDelay.fulfilled,
            (state, { payload }) => {

                const { message } = payload;

                reusableReducers.setMessage(
                    state,
                    { "payload": { message } }
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

export const reducer = slice.reducer;
