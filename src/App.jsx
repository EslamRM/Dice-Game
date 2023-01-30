import { React, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Dice from "./Dice";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allDice());
  const [tenzies, setTenzies] = useState(false);

  function generateDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  // function to get 10 dice
  function allDice() {
    const newDice = [];
    for (let i = 0; i < 12; i++) {
      newDice.push(generateDice());
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld ? die : generateDice();
        })
      );
    } else {
      setDice(allDice());
      setTenzies(false);
    }
  }
  const diceElements = dice.map((die) => (
    <Dice
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  useEffect(() => {
    const diceValue = dice.every((die) => die.value === dice[0].value);
    const allIsHeld = dice.every((die) => die.isHeld);
    if (diceValue && allIsHeld) {
      setTenzies(true);
    }
  }, [dice]);
  return (
    <div className="App">
      {tenzies && <Confetti />}
      <h1>Dice Game</h1>
      <div className="read-the-docs">
        <p>Click each die to freeze it at its current value between rolls.</p>
        <p>until all dice are the same.</p>
      </div>
      <div className="card">{diceElements}</div>
      <button className="roll--btn" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
