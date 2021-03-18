import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { React, useState, useEffect } from "react";
import * as math from "mathjs";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  function handleClear(e) {
    setInput("");
  }

  function handleBackspace() {
    if (input.length !== 0) {
      setInput(input.toString().slice(0, -1));
    }
  }

  function populateInputField(val) {
    setInput(input + val);
  }

  useEffect(() => {
    getLast10Calculations();
  }, []);

  function getLast10Calculations() {
    axios
      .get("https://jash-calculator.herokuapp.com/history")
      .then((response) => response.data)
      .then((response) => setHistory(response));
  }

  function handleResult() {
    var result = "Invalid Input";
    try {
      result = math.evaluate(input);
    } catch (error) {
      console.error("Invalid Input Given");
    }
    const calculation = input + " = " + result;
    if (!(input === result && result !== "Invalid Input")) {
      axios.post("https://jash-calculator.herokuapp.com/addCalculation", {
        calculation,
      });
    }
    setInput(result);
    getLast10Calculations();
  }

  return (
    <div className="App">
      <div className="last10Calculations">
        <h1 className="calculation">Last 10 Calculations</h1>
        {history.map((historyArray) => (
          <div key={historyArray.id} className="calculation">
            {" "}
            {historyArray.Calculation}
          </div>
        ))}
      </div>
      <div className="calc-wrapper">
        <Input input={input}></Input>
        <div className="row">
          <Button handleClick={handleClear}>AC</Button>
          <Button handleClick={handleBackspace}>C</Button>
          <Button handleClick={populateInputField}>%</Button>
          <Button handleClick={populateInputField}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={populateInputField}>7</Button>
          <Button handleClick={populateInputField}>8</Button>
          <Button handleClick={populateInputField}>9</Button>
          <Button handleClick={populateInputField}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={populateInputField}>4</Button>
          <Button handleClick={populateInputField}>5</Button>
          <Button handleClick={populateInputField}>6</Button>
          <Button handleClick={populateInputField}>-</Button>
        </div>
        <div className="row">
          <Button handleClick={populateInputField}>1</Button>
          <Button handleClick={populateInputField}>2</Button>
          <Button handleClick={populateInputField}>3</Button>
          <Button handleClick={populateInputField}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={populateInputField}>0</Button>
          <Button handleClick={populateInputField}>.</Button>
          <Button handleClick={handleResult}>=</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
