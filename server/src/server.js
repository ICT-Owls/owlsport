const { database, admin } = require('./database.js');

const cors = require('cors');

const express = require('express');
const path = require('path');
const app = express();
const port = 30649;

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

app.use(express.static(path.resolve('..', 'build')));

const userRoute = require('./routes/userRoute.js');
app.use('/user', userRoute);

const eventRoute = require('./routes/eventRoute.js');
app.use('/events', eventRoute);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

module.exports = { app, database };
