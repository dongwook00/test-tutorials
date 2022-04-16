import './App.css';
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <div>
          <button onClick={() => setCounter((counter) => counter - 1)} data-testid="minus-button">-</button>
          <button onClick={() => setCounter((counter) => counter + 1)} data-testid="plus-button">+</button>
        </div>
      </header>
    </div>
  );
}

export default App;
