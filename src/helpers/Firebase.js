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
import { v4 as uuidv4 } from 'uuid';

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
                    .userIdGet(authResult.user.uid, {
                        headers: { authorization: `Bearer ${idToken}` },
                    })
                    .then((d) => callOnLogin({ ...d, accessToken: idToken }))
                    .catch((e) => {
                        if (e.status == 404) {
                            userApi
                                .userPost(
                                    {
                                        firstName: 'Kevin',
                                        lastName: 'Kelvin',
                                        dateOfBirth: 0,
                                    },
                                    {
                                        headers: {
                                            authorization: `Bearer ${idToken}`,
                                        },
                                    }
                                )
                                .then((d) =>
                                    callOnLogin({ ...d, accessToken: idToken })
                                )
                                .catch((e) => console.error(e));
                        } else {
                            console.error(e);
                        }
                    });
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
export const auth = getAuth(app);

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

//Function called when the signin window is mounted
export const startLogin = (callback) => {
    //Subscribe to run callback after signin. Also unsubs in the same callback
    var unsub = subscribeToLogin(() => {
        //call callback and unsub. Only
        callback();
        unsub();
    });
    ui.start('#firebaseui-auth-container', uiConfig);
};

let callbackOnLogin = {};

export function subscribeToLogin(callback) {
    // create uid, add it to object
    var id = uuidv4();
    callbackOnLogin[id] = callback;

    return () => {
        //return function that removes field in object
        delete callbackOnLogin.id;
    };
}
function callOnLogin(user) {
    //check if object is empty first.
    Object.keys(callbackOnLogin).length == 0
        ? console.error(
              'Firebase.js callback: Login subscription is empty after login success'
          )
        : //If there are some callbacks, call them all
          Object.values(callbackOnLogin).forEach((e) => e());
}

export { app, registerUser, loginUser };
