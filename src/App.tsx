import React from "react";
import logo from "./logo.svg";
import { Counter1 } from "./features/counter1/Counter1";
import { Counter2 } from "./features/counter2/Counter2";

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Counter 1</h1>
        <Counter1 />
        <h1>Counter 2</h1>
        <Counter2 />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
