import { initializeApp } from 'firebase/app';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    EmailAuthProvider,
    GoogleAuthProvider,
} from 'firebase/auth';
import { auth as firebaseuiAuth } from 'firebaseui';
import {
    Configuration as CarpoolingApiConfig,
    UserApi,
} from '../api-client/index.ts';

import 'firebaseui/dist/firebaseui.css';

const backendApiConfig = new CarpoolingApiConfig({
    // Send request to same origin as the web page
    basePath: 'https://carpooling-backend-sy465fjv3q-lz.a.run.app',
});

const userApi = new UserApi(backendApiConfig);

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

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            
            authResult.user.getIdToken().then((idToken) => {
                userApi
                    .userIdGet(authResult.user.uid, {headers:{authorization: `Bearer ${idToken}`}})
                    .then((e) => writestuff(e));
            });
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        },
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            clientId: '***REMOVED***',
        },
        {
            provider: GoogleAuthProvider.PROVIDER_ID,
            clientId: '***REMOVED***',
        },
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>',
};

function writestuff(e) {
    console.log(e);
}

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

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseuiAuth.AuthUI(auth);

export const startLogin = () => {
    // Initialize the FirebaseUI Widget using Firebase.
    ui.start('#firebaseui-auth-container', uiConfig);
};

export { app, registerUser, loginUser };
