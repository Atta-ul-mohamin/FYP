require('dotenv').config(); //include .env file(db credentials)
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const router = express.Router()

const cors = require('cors');

const api = ParseServer({
    databaseURI:  process.env.databaseURI,
    cloud: __dirname + '/cloud/main.js', // Absolute path to your Cloud Code
    appId: process.env.appId,
    masterKey: process.env.masterKey, 
    serverURL: process.env.serverURL,
    enableAnonymousUsers: true,
    allowClientClassCreation: true
});

app.use(cors());



app.use('/parse', api);

app.get('/', (req, res) => {
        res.send("RUNNING!!!");
    });


app.listen(process.env.port, function() {
  console.log('parse-server-example running on port ' + process.env.port);
});


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