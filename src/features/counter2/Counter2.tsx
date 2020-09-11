import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
          onClick={() => 
            dispatch(counter2Actions.incrementByAmountAfterDelay({ "amount": parseInt(incrementAmount) ?? 0 }))
          }
        >
          Increment by amount after delay
        </button>
      </div>
    </div>
  );
}
