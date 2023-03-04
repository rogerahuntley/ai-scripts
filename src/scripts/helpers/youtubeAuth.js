import { google } from 'googleapis';
import readline from 'readline';
import dotenv from 'dotenv';
dotenv.config()

// put your API key in a .env file in the root of the project
const API_KEY = process.env.GOOGLE_API_KEY;

// to get the better auth we need this
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// to generate this (unless we have it in the .env file)
const ACCESS_TOKEN = process.env.GOOGLE_ACCESS_TOKEN;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

// Replace with your desired redirect URI
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

const getAPIKey = async () => {
  if(!API_KEY) return console.error("You need to add your API key to the .env file")

  return API_KEY;
}

const getAccessToken = async () => {
  if(!CLIENT_ID || !CLIENT_SECRET) return console.error("You need to add your client id and secret to the .env file")

  const auth = await new Promise((resolve) => {
    // Create a new OAuth2 client with the API key
    if(!ACCESS_TOKEN){
      const authClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

      // Set up a readline interface for prompting the user for authorization
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      // Generate a URL for the user to visit to authorize our app
      const authUrl = authClient.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/youtube'],
      });
      
      console.log(`Please visit this URL to authorize the app: ${authUrl}`);

      rl.question('Enter the authorization code:', async (code) => {
        // Exchange the authorization code for an access token and refresh token
        const {tokens} = await authClient.getToken(code);

        // Set the access token and refresh token on the OAuth2 client
        authClient.setCredentials({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token
        });

        console.log("Add your token to the .env file\n" + 
        `GOOGLE_ACCESS_TOKEN=${tokens.access_token}\n` +
        `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
      
        resolve(authClient);
      })
    } else {

      // Create a new OAuth2 client with your access token
      const authClient = new google.auth.OAuth2();
      authClient.setCredentials({
        access_token: ACCESS_TOKEN,
        refresh_token: REFRESH_TOKEN
      });

      resolve(authClient);
    }
  })

  return auth;
}

export { getAPIKey, getAccessToken }