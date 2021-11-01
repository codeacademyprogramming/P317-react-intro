import React, { useState } from "react";

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prevState) => {
      const updatedCounter = prevState + 1;
      return updatedCounter;
    });
  };

  const handleDecrement = () => {
    setCounter((prevState) => {
      const updatedCounter = prevState - 1;

      return updatedCounter;
    });
  };

  return (
    <>
      <h1>{counter}</h1>
      <button
        onClick={() => {
          handleDecrement();
          handleIncrement();
        }}
      >
        +
      </button>
    </>
  );
};
