import { admin } from './database.js';

import cors from 'cors';

import express, { json } from 'express';

import path from 'path';

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

app.use(express.static(path.resolve('..', 'build')));

import userRoute from './routes/userRoute.js';
app.use('/user', userRoute);
app.use('/api/user', userRoute);

import eventRoute from './routes/eventRoute.js';

app.use('/events', eventRoute);
app.use('/api/user', eventRoute);

import geoRoute from './routes/geoRoute.js';

app.use('/geo', geoRoute);
app.use('/api/geo', geoRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

module.exports = { app };
