const mysql = require('mysql2/promise');
const AWS = require('aws-sdk');

// Function to retrieve secrets from AWS Secrets Manager
async function getSecret() {
  const client = new AWS.SecretsManager({ region: 'ap-southeast-1' });

  try {
    const secretResponse = await client.getSecretValue({ SecretId: 'rds-db/credentials' }).promise();
    const secret = JSON.parse(secretResponse.SecretString);
    console.log('Secret retrieved successfully');
    return secret;
  } catch (error) {
    console.error(`Failed to retrieve secret: ${error.message}`);
    throw new Error('Error retrieving database credentials');
  }
}
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  // Extract user details from the event
  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;
  
  // Generate a random account balance between 100 and 5000
  const accountBalance = (Math.random() * (5000 - 100) + 100).toFixed(2);
  
  // Get the current timestamp
  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Retrieve database credentials from Secrets Manager
  let dbCredentials;
  try {
    dbCredentials = await getSecret();
  } catch (error) {
    console.error('Failed to retrieve database credentials:', error);
    throw new Error('Could not retrieve database credentials');
  }

  // Database connection using credentials retrieved from Secrets Manager
  const connection = await mysql.createConnection({
    host: dbCredentials.host,
    user: dbCredentials.username,
    password: dbCredentials.password,
    database: dbCredentials.dbname,
    port: dbCredentials.port 
  });

  try {
    // Insert user details into the database
    const [result] = await connection.execute(
      `INSERT INTO User (user_id, email, account_balance, created_at) VALUES (?, ?, ?, ?)`,
      [userId, email, accountBalance, createdAt]
    );

    console.log('User data stored successfully:', result);
  } catch (error) {
    console.error('Error storing user data:', error);
    throw new Error('Could not store user data');
  } finally {
    await connection.end();
  }

  // Return the event to ensure successful Cognito flow
  return event;
};

// const mysql = require('mysql2/promise');
// /**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// exports.handler = async (event, context) => {
//   // Extract user details from the event
//   const userId = event.request.userAttributes.sub;
//   const email = event.request.userAttributes.email;
  
//   // Generate a random account balance between 100 and 5000
//   const accountBalance = (Math.random() * (5000 - 100) + 100).toFixed(2);
  
//   // Get the current timestamp
//   const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

//   // Database connection using environment variables
//   const connection = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
//   });

//   try {
//     // Insert user details into the database
//     const [result] = await connection.execute(
//       `INSERT INTO User (user_id, email, account_balance, created_at) VALUES (?, ?, ?, ?)`,
//       [userId, email, accountBalance, createdAt]
//     );

//     console.log('User data stored successfully:', result);
//   } catch (error) {
//     console.error('Error storing user data:', error);
//     throw new Error('Could not store user data');
//   } finally {
//     await connection.end();
//   }

//   // Return the event to ensure successful Cognito flow
//   return event;
// };
