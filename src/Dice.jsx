import React from "react";

export default function Dice(props) {
  function Cicle() {
    return <div className="dot"></div>;
  }
  const cicleElement = [...Array(props.value)].map((e, i) => <Cicle key={i} />);
  return (
    <div className="card">
      <button
        className="dot-container"
        onClick={props.holdDice}
        style={
          props.isHeld
            ? { outline: "4px auto -webkit-focus-ring-color" }
            : { outline: "none" }
        }
      >
        {cicleElement}
      </button>
    </div>
  );
}
