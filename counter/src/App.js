import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [disabled, setDisabled] = useState(false);


  return (
    <div className="App">
      <header className="App-header">
        <h3 data-testid="counter">{counter}</h3>
        <div>
          <button disabled={disabled} onClick={() => setCounter((counter) => counter - 1)} data-testid="minus-button">-</button>
          <button disabled={disabled} onClick={() => setCounter((counter) => counter + 1)} data-testid="plus-button">+</button>
        </div>
        <button onClick={() => setDisabled((prev) => !prev)} style={{ background: "blue"}} data-testid="on/off-button">on/off</button>
      </header>
    </div>
  );
}

export default App;
