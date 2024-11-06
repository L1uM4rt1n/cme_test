import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { TokensProvider } from './components/TokensProvider';
import Balance from './components/Balance';
import Header from './components/Header';
import Transaction from './components/Transaction';
import { Route, Routes, Link } from 'react-router-dom';
import { AwsRum } from 'aws-rum-web';

if (process.env.NODE_ENV === "production") {
  try {
    const config = {
      sessionSampleRate: 1,
      identityPoolId: "ap-southeast-1:2a7c4946-e48e-4f71-8bfe-1db3134aab3b",
      endpoint: "https://dataplane.rum.ap-southeast-1.amazonaws.com",
      telemetries: ["performance", "errors", "http"],
      allowCookies: true,
      enableXRay: false,
    };

    const APPLICATION_ID = 'cff47b7d-83b3-48d5-83ee-abdad187f43b';
    const APPLICATION_VERSION = '1.0.0';
    const APPLICATION_REGION = 'ap-southeast-1';

    const awsRum = new AwsRum(
      APPLICATION_ID,
      APPLICATION_VERSION,
      APPLICATION_REGION,
      config
    );
  } catch (error) {
    console.error("CloudWatch RUM initialization error:", error);
  }
}

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator variation="modal">
      {({ signOut, user }) => (
        <TokensProvider>
          <div className="container">
            <Header username={user.username} onSignOut={signOut} />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/transaction" element={<Transaction />} />
            </Routes>
          </div>
        </TokensProvider>
      )}
    </Authenticator>
  );
}

const MainPage = () => {
  return (
    <div>
      <Balance />
      <Link to="/transaction">
        <button>Transaction</button>
      </Link>
    </div>
  );
}

export default App;
