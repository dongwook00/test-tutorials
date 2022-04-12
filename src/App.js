import './App.css';
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <h3 data-testid="counter">{counter}</h3>
    </div>
  );
}

export default App;
