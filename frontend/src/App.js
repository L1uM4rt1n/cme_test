// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { Amplify } from 'aws-amplify';
// import awsExports from './aws-exports'; // Amplify config file
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import { fetchAuthSession } from '@aws-amplify/auth';

// Amplify.configure(awsExports);

// function App() {
//   const [balance, setBalance] = useState(null);
//   const [accessToken, setAccessToken] = useState('');
//   const [idToken, setIdToken] = useState('');

//   useEffect(() => {
//     // Function to retrieve the access token and ID token
//     const getTokens = async () => {
//       try {
//         // Fetch the user's session
//         var cognitoTokens = (await fetchAuthSession()).tokens;

//         let rawAccessToken = cognitoTokens?.accessToken?.toString();
//         console.log('rawAccessToken:', rawAccessToken);

//         let rawIDToken = cognitoTokens?.idToken?.toString();
//         console.log('rawIDToken:', rawIDToken);

//       } catch (error) {
//         console.error('Error retrieving tokens:', error);
//       }
//     };

//     getTokens();
//   }, []);

//   const checkBalance = () => {
//     // change it to connection to get balance api
//     setBalance(1000);
//   };

//   return (
//     <Authenticator variation="modal">
//       {({ signOut, user }) => (
//         <div className="container">
//           <h1>Welcome to Your Digital Bank, {user.username}</h1>

//           <button onClick={checkBalance}>Check Balance</button>

//           {balance !== null && (
//             <div>
//               <h2>Your Balance: ${balance}</h2>
//             </div>
//           )}

//           <button onClick={signOut}>Sign Out</button>
//         </div>
//       )}
//     </Authenticator>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { TokensProvider } from './components/TokensProvider';
import Balance from './components/Balance';
import Header from './components/Header';

Amplify.configure(awsExports);

function App() {
<<<<<<< Updated upstream
  const [balance, setBalance] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [idToken, setIdToken] = useState('');

  useEffect(() => {
    // Function to retrieve the access token and ID token
    const getTokens = async () => {
      try {
        var cognitoTokens = (await fetchAuthSession()).tokens;

        let rawAccessToken = cognitoTokens?.accessToken?.toString();
        console.log('rawAccessToken:', rawAccessToken);
        setAccessToken(rawAccessToken);

        let rawIDToken = cognitoTokens?.idToken?.toString();
        console.log('rawIDToken:', rawIDToken);
        setIdToken(rawIDToken);

      } catch (error) {
        console.error('Error retrieving tokens:', error);
      }
    };

    getTokens();
  }, []);

  const checkBalance = () => {
    // change it to connection to get balance api
    console.log("access token: ", accessToken)
    console.log("id token: ", idToken)
    setBalance(1000);
  };

=======
>>>>>>> Stashed changes
  return (
    <Authenticator variation="modal">
      {({ signOut, user }) => (
        <TokensProvider>
          <div className="container">
            <Header username={user.username} onSignOut={signOut} />
            <Balance />
          </div>
        </TokensProvider>
      )}
    </Authenticator>
  );
}

export default App;
