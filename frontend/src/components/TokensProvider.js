// src/components/TokensProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAuthSession } from '@aws-amplify/auth';

const TokensContext = createContext();

export const TokensProvider = ({ children }) => {
  const [tokens, setTokens] = useState({ accessToken: '', idToken: '' });

  useEffect(() => {
    const getTokens = async () => {
      try {
        const cognitoTokens = (await fetchAuthSession()).tokens;
        setTokens({
          accessToken: cognitoTokens?.accessToken || '',
          idToken: cognitoTokens?.idToken || ''
        });
      } catch (error) {
        console.error('Error retrieving tokens:', error);
      }
    };

    getTokens();
  }, []);

  return (
    <TokensContext.Provider value={tokens}>
      {children}
    </TokensContext.Provider>
  );
};

export const useTokens = () => useContext(TokensContext);
