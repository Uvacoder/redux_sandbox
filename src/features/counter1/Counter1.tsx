import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as counter1Actions, select as counter1Select } from './store';
import { actions as counter2Actions } from "../counter2/store";

import styles from './Counter1.module.css';

export function Counter1() {
  const count = useSelector(counter1Select);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment both counters value"
          //onClick={() => dispatch(increment())}
          onClick={() => dispatch(counter2Actions.incrementBothCounter())}
        >
          + (both)
        </button>
        <span className={styles.value}>{count.value}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(counter1Actions.decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(counter1Actions.incrementByAmount({ "amount": Number(incrementAmount) || 0 }))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(counter1Actions.incrementAsync({ "amount": Number(incrementAmount) || 0 }))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
