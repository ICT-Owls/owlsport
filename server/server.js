const { body, param, validationResult, oneOf } = require('express-validator');
const admin = require('firebase-admin');
const serviceAccount = require('../***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        '***REMOVED***',
});
const database = admin.database();
const users = database.ref('/users');

const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

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

app.use(express.json());

app.use(decodeIDToken);

app.use(express.static('build'));

const validate = function async(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) next();
    else {
        res.status(400).send(errors);
    }
};

app.get(
    '/user/:id',
    param('id').isString().withMessage('Id is not a string'),
    validate,
    async (req, res) => {
        const id = req.params.id;

        const userRef = users.child(id);
        const user = await (await userRef.get()).val();
        if (!user) return res.status(404).send('User not found');

        res.send(user);
    }
);

app.post(
    '/user/:id',
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('friends').optional().isArray().withMessage('Friends is not an array'),
    body('friends.*').isString().withMessage('Friend id is not a string'),
    oneOf([body('friends').exists(), body('email').exists()]),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { email, friends } = req.body;

        const userRef = users.child(id);
        const userSnapshot = await userRef.get();

        console.log(userSnapshot);
        console.log(userSnapshot.exists());

        if (!userSnapshot.exists())
            return res.status(404).send('User not found');

        var update = {};
        if (email) update.email = email;
        if (friends) update.friends = friends;

        await userRef.update(update);

        const updatedUser = await userRef.get();

        res.send(updatedUser.val());
    }
);

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
