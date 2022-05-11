const admin = require('firebase-admin');
const serviceAccount = require('./***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        '***REMOVED***',
});

const database = admin.database();
const users = database.ref('/users');
const events = database.ref('/events');

module.exports = { admin, database, users, events };
