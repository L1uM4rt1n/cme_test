import React, { useState } from 'react';
import { useTokens } from './TokensProvider';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
  const { idToken } = useTokens();
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionComplete, setTransactionComplete] = useState(false);
  const navigate = useNavigate();

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://0752yr3bzi.execute-api.ap-southeast-1.amazonaws.com/production', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from_user_id: idToken["payload"]["sub"],
          to_user_id: username,
          amount: parseFloat(amount),
        }),
      });

      if (response.ok) {
        setTransactionComplete(true);
      } else {
        console.error('Transaction failed:', response.statusText);
      }
    } catch (error) {
      console.error('Transaction error:', error);
    }
  };

  return (
    <div>
      <h2>Transaction Page</h2>
      <form onSubmit={handleTransaction}>
        <label>Recipient's User Id:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="amount-input"
        />
        <button type="submit">Transfer</button>
      </form>
      {transactionComplete && (
        <div className="success-popup">
          <p>Transaction is complete!</p>
          <button onClick={() => navigate('/')}>End Transaction</button>
        </div>
      )}
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Transaction;
