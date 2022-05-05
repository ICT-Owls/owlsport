import admin from 'firebase-admin';
import serviceAccount from '../***REMOVED***-firebase-adminsdk-wf7mw-0e8fb32b51.json' assert { type: 'json' };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        '***REMOVED***',
});
const database = admin.database();
const users = database.ref('/users');
const events = database.ref('/events');

export { admin, database, users, events };
