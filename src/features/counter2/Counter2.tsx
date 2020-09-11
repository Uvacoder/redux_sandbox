import React, { useState } from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "../../app/store";
import type { SerializedError } from "@reduxjs/toolkit";
import { assert, typeGuard } from "evt/tools/typeSafety";

import { actions as counter2Actions, select as counter2Select } from "./store";
import styles from "./Counter2.module.css";

export function Counter2() {

  const count2 = useSelector(counter2Select);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(counter2Actions.incrementBothCounter())}
        >
          +
        </button>
        <span className={styles.value}>{count2.value}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(counter2Actions.decrement())}
        >
          -
        </button>
      </div>
      <p>{count2.message}</p>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.asyncButton}
          onClick={async () => {

            try {

              //Without unwrapResult we have to use matcher to get amountOut
              //see: https://user-images.githubusercontent.com/6702424/92951682-10413200-f45f-11ea-8650-cb6cddfe7154.png
              //see: https://redux-toolkit.js.org/usage/usage-with-typescript#getting-the-dispatch-type
              const { amountOut } = await dispatch(
                counter2Actions.incrementByAmountAfterDelay(
                  { "amount": parseInt(incrementAmount) ?? 0 }
                )
              ).then(unwrapResult);

              console.log(`In component, trunk result: amountOut: ${amountOut}`);

            } catch (error) {

              //NOTE: error is not an instance of Error
              assert(typeGuard<SerializedError>(error));

              console.log(error.message);

            }


          }}
        >
          Increment by amount after delay
        </button>
      </div>
    </div>
  );
}
