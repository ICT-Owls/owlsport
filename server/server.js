const cors = require('cors');

const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// TODO: Bad bad, fix later
app.use(
    cors({
        origin: '*',
    })
);

app.use(express.json());

    if (req.headers?.authorization?.startsWith('Bearer ')) {
        try {
            const idToken = req.headers.authorization.split('Bearer ')[1];

            const decodedToken = await admin.auth().verifyIdToken(idToken);
            req['user'] = decodedToken;
        } catch (err) {
            console.log(err);
        }
    }

    next();
}

app.use(express.json());

app.use(decodeIDToken);

app.use(express.static('build'));

const userRoute = require('./routes/userRoute.js');
app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});

module.exports = { app, database };
