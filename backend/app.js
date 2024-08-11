require('dotenv').config();
const path = require('path');
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const { Client } = require('pg');
const cors = require('cors');

const app = express();

// Database connection setup
const client = new Client({
    connectionString: process.env.databaseURI,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Parse Server setup
const api = new ParseServer({
    databaseURI: process.env.databaseURI,
    cloud: path.join(__dirname, 'cloud', 'main.js'),
    appId: process.env.appId,
    masterKey: process.env.masterKey,
    serverURL: process.env.serverURL,
    enableAnonymousUsers: true,
    allowClientClassCreation: true,
});

app.use(cors());
app.use('/parse', api);

app.get('/', (req, res) => {
    res.send("RUNNING!!!");
});

// Parse Dashboard setup
const dashboard = new ParseDashboard({
    apps: [
        {
            serverURL: process.env.serverURL,
            appId: process.env.appId,
            masterKey: process.env.masterKey,
            appName: "MyApp"
        }
    ],
    users: [
        {
            user: process.env.dashboardUserId,
            pass: process.env.dashboardUserPassword
        }
    ],
    useEncryptedPasswords: false,
}, { allowInsecureHTTP: true });

app.use('/dashboard', dashboard);

// Start the server
const PORT = process.env.port || 1336;

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
