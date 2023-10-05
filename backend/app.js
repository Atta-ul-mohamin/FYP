require('dotenv').config(); //include .env file(db credentials)
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();
const router = express.Router()
const cors = require('cors');
const api = ParseServer({
  databaseURI: process.env.databaseURI,
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
app.listen(process.env.port, function () {
  console.log('parse-server-example running on port ' + process.env.port);
});