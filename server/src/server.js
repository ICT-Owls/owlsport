import { database, admin } from './database.js';

import cors from 'cors';

import express from 'express';
import path from 'path';

import websockets from './websockets/index.js';

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

app.use(express.json());

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

const server = app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

const wsServer = websockets(server);

app.use(express.static('../build'));

import userRoute from './routes/userRoute.js';
app.use('/user', userRoute);

import eventRoute from './routes/eventRoute.js';
import { exit } from 'process';
app.use('/events', eventRoute);

app.get('/', (_req, res) => {
    res.sendFile(path.resolve('../build', 'index.html'));
});

app.use((err, _req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



export { app, database };
