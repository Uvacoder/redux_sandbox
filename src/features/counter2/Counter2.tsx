import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "../../app/store";

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

            const lastReturnedAction = await dispatch(counter2Actions.incrementByAmountAfterDelay({ "amount": parseInt(incrementAmount) ?? 0 }));

            if (counter2Actions.incrementByAmountAfterDelay.fulfilled.match(lastReturnedAction)) {

              console.log(`In component, trunk result: amountOut: ${lastReturnedAction.payload.amountOut}`);

            }

          }}
        >
          Increment by amount after delay
        </button>
      </div>
    </div>
  );
}
