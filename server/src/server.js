import { database, admin } from './database.cjs';

import cors from 'cors';

import express, { json } from 'express';
import { resolve } from 'path';
const app = express();

const port = parseInt(process.env.PORT);

if (isNaN(port)) {
    console.error('Environment variable PORT must be set!');
    process.exit(1);
}

// TODO: Bad bad, fix later
app.use(
    cors({
        origin: '*',
    })
);

// Enable pre-flight for all requests
app.options('*', cors());

app.use(json());

app.use(async (req, _res, next) => {
    if (req.headers?.authorization?.startsWith('Bearer ')) {
        try {
            // Firebase auth token
            const idToken = req.headers.authorization.split('Bearer ')[1];

            const decodedToken = await admin.auth().verifyIdToken(idToken);
            // The authenticated user is available as the 'user' prop on the express req.
            // This can also be used to check if the user has been authenticated or not.
            req['user'] = decodedToken;
        } catch (err) {
            console.log(err);
        }
    }

    next();
});

app.use(express.static('build'));

import userRoute from './routes/userRoute.cjs';
app.use('/user', userRoute);

import eventRoute from './routes/eventRoute.cjs';
import { exit } from 'process';
app.use('/events', eventRoute);

import discordWebHookRoute from './routes/discordWebHookRoute.js';
app.use('/discordwebhook', discordWebHookRoute);

app.get('/', (_req, res) => {
    res.sendFile(resolve('build', 'index.html'));
});

app.use((err, _req, res, mext) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

export default { app, database };
