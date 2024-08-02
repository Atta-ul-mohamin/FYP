
require('dotenv').config(); // Include .env file for environment variables
const express = require('express');
const { ParseServer } = require('parse-server');
const cors = require('cors');
const app = express();

// Setup Parse Server with environment variables
const api = new ParseServer({
  databaseURI: process.env.databaseURI,
  cloud: process.env.cloudPath, // Use environment variable for cloud code path
  appId: process.env.appId,
  masterKey: process.env.masterKey,
  serverURL: process.env.serverURL,
  enableAnonymousUsers: true,
  allowClientClassCreation: true,
});

// Enable CORS for all routes
app.use(cors());

// Mount the Parse API server at /parse
app.use('/parse', api);

// Basic route to check server status
app.get('/', (req, res) => {
  res.send("RUNNING!!!");
});

// Start the server
const port = process.env.port || 1336;
app.listen(port, () => {
  console.log(`parse-server-example running on port ${port}`);
});

// httpServer.listen(process.env.port, () => {
//   console.log(`Server running on port ${process.env.port}`);
// });
// ParseServer.createLiveQueryServer(httpServer);



// require('dotenv').config(); //include .env file(db credentials)
// const express = require('express');
// const ParseServer = require('parse-server').ParseServer;
// const app = express();
// const router = express.Router()
// const cors = require('cors');
// const { OAuth2Client } = require('google-auth-library'); // Add this line

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 
// const api = ParseServer({
//   databaseURI: process.env.databaseURI,
//   cloud: __dirname + '/cloud/main.js', // Absolute path to your Cloud Code
//   appId: process.env.appId,
//   masterKey: process.env.masterKey,
//   serverURL: process.env.serverURL,
//   enableAnonymousUsers: true,
//   allowClientClassCreation: true
// });
// app.use(cors());
// app.use('/parse', api);
// app.use(express.json()); 
// app.post('/auth/google', async (req, res) => {
//   const { token }  = req.body;
//   async function verify() {
//       const ticket = await client.verifyIdToken({
//           idToken: token,
//           audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       });
//       const payload = ticket.getPayload();
//       const userid = payload['sub'];

//       res.status(200).json({ message: 'Google sign-in processed', user: payload });
//   }
//   verify().catch(console.error);
// });
// app.get('/', (req, res) => {
//   res.send("RUNNING!!!");
// });
// app.listen(process.env.port, function () {
//   console.log('parse-server-example running on port ' + process.env.port);
// });
