import { body, validationResult } from 'express-validator';
const admin = require('firebase-admin');
const serviceAccount = require('../***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        '***REMOVED***',
});
const database = admin.database();

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

async function decodeIDToken(req, res, next) {
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

app.use(decodeIDToken);

app.use(express.static('build'));

app.get('/user/:id',
    params('id').isInt().withMessage('Id is not an int'),
    async (req, res) => {
        const id = req.params.id;
        if (!id) return res.status(400).send('No id');

        const user = database.ref(`/user/${id}`);
        if (!user) return res.status(404).send('User not found');
    });

app.post('/user/:id',
    body('email').isEmail().withMessage('Invalid email'),
    body('friends').isArray().withMessage('Friends is not an array'),
    body('friends.*').isInt().withMessage('Friend id is not an int'),
    async (req, res) => {
        const { email, friends } = req.body;
        if (!email && !friends) return res.status(400).send('Empty body');

    });

app.get('/', (req, res) => {
    res.sendFile(path.resolve('build', 'index.html'));
});

app.use(async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        next();
    else {
        res.status(400).send(errors);
    }
});

app.listen(port, () => {
    console.log(`Web server listening on port ${port}`);
});
