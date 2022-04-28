import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: '***REMOVED***',
    authDomain: '***REMOVED***',
    databaseURL:
        '***REMOVED***',
    projectId: '***REMOVED***',
    storageBucket: '***REMOVED***',
    messagingSenderId: '***REMOVED***',
    appId: '***REMOVED***',
    measurementId: '***REMOVED***',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const registerUser = async function (
    firstName,
    lastName,
    dateOfBirth,
    email,
    password
) {
    // Validate or whatever first

    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    const user = await fetch('http://localhost:3001/user/create', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${credentials.user.accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            dateOfBirth: dateOfBirth,
        }),
    }).then((r) => r.json());

    return user;
};

const loginUser = async function (email, password) {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    const user = await fetch(
        `http://localhost:3001/user/${credentials.user.uid}`,
        {
            headers: {
                authorization: `Bearer ${credentials.user.accessToken}`,
            },
        }
    ).then((r) => r.json());
    return user;
};

export { app, registerUser, loginUser };
