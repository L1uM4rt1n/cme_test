import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(null);
  
  const login = () => {
    // cognito code changes
    alert(`Logged in as ${username}`);
  };

  const checkBalance = () => {
    // change it to connection to get balance api
    setBalance(1000);
  };

  return (
    <div className="container">
      <h1>Welcome to Your Digital Bank</h1>
      
      <div>
        <label>Username: </label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      
      <button onClick={login}>Login</button>
      <button onClick={checkBalance}>Check Balance</button>
      
      {balance !== null && (
        <div>
          <h2>Your Balance: ${balance}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
