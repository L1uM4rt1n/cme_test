// src/components/ErrorSimulator.js
import React from 'react';

const ErrorSimulator = () => {
  const triggerError = () => {
    throw new Error("Simulated JavaScript error for testing RUM logging.");
  };

  return (
    <div>
      <button onClick={triggerError} style={{ padding: "10px", margin: "20px", backgroundColor: "red", color: "white" }}>
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorSimulator;
