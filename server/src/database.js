const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const serviceAccount = require('./firebase-adminsdk.json');

const adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
        '***REMOVED***',
});

const firebaseConfig = {
    apiKey: process.env.GOOGLE_API_BROWSER_KEY,
    authDomain: '***REMOVED***',
    databaseURL:
        '***REMOVED***',
    projectId: '***REMOVED***',
    storageBucket: '***REMOVED***',
    messagingSenderId: '***REMOVED***',
    appId: '***REMOVED***',
    measurementId: '***REMOVED***',
}

const fbApp = initializeApp(firebaseConfig);

const database = admin.database();
const users = database.ref('/users');
const events = database.ref('/events');

module.exports = { admin, database, users, events };
