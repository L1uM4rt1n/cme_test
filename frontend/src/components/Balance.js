// src/components/Balance.js
import React, { useState } from 'react';
import { useTokens } from './TokensProvider';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const { accessToken, idToken } = useTokens();
  console.log(accessToken);
  console.log(idToken);

  const checkBalance = async () => {
    try {
      const response = await fetch(
        `https://d31tnhiq7k.execute-api.ap-southeast-1.amazonaws.com/test_1/?user_id=${idToken["payload"]["sub"]}`,
        {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
      } else {
        console.error('Error fetching balance:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <div>
      <button onClick={checkBalance}>Check Balance</button>
      {balance !== null && (
        <div>
          <h2>Your Balance: ${balance}</h2>
        </div>
      )}
    </div>
  );
};

export default Balance;
