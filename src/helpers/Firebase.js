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
    EventApi,
} from '../api-client/index.ts';
import { v4 as uuidv4 } from 'uuid';

import 'firebaseui/dist/firebaseui.css';

const backendApiConfig = new CarpoolingApiConfig({
    // Send request to same origin as the web page
    basePath: 'https://carpooling-backend-sy465fjv3q-lz.a.run.app',
});

const userApi = new UserApi(backendApiConfig);
const eventApi = new EventApi(backendApiConfig);

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
                localStorage.setItem('auth', idToken); // Store token in localstorage
                localStorage.setItem('uid', authResult.user.uid);
                userApi
                    .userIdGet(authResult.user.uid, {
                        headers: { authorization: `Bearer ${idToken}` },
                    })
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
                                .catch((e) => console.error(e));
                        } else {
                            console.error(e);
                        }
                    });
                callStruct(callbackOnLogin);
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//Add new callbackStructs here for each "thing" you want to listen to
let callbackOnLogin = {};
function subscribeTo(callbackStruct, callback) {
    // create uid, add it to callbackStruct
    var id = uuidv4();
    callbackStruct[id] = callback;

    return () => {
        //return function that removes field in callbackStruct
        delete callbackStruct.id;
    };
}

//Calls all callbacks in a callbackStruct
function callStruct(callbackStruct) {
    //check if object is empty first.
    Object.keys(callbackStruct).length == 0
        ? console.error(
              'Firebase.js callback: Login subscription is empty after login success'
          )
        : //If there are some callbacks, call them all
          Object.values(callbackStruct).forEach((e) => e());
}

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseuiAuth.AuthUI(auth);

export const startLogin = (callback) => {
    //Subscribe to run callback after signin. Also unsubs in the same callback
    var unsub = subscribeTo(callbackOnLogin, () => {
        //call callback and unsub. Only
        callback();
        unsub();
    });
    ui.start('#firebaseui-auth-container', uiConfig);
};

export const logOut = () => {
    localStorage.removeItem('auth');
};

/* API */
let callbackOnEventChange = [];

export function subscribeToEvents(callback) {
    callbackOnEventChange.push(callback);
}

export function isLoggedIn() {
    return (
        localStorage.getItem('auth') != null &&
        localStorage.getItem('uid') != null
    );
}

export async function getUser() {
    const token = localStorage.getItem('auth');
    const uid = localStorage.getItem('uid');
    if (!token || !uid) return;

    const user = await userApi.userIdGet(uid, {
        headers: { authorization: `Bearer ${token}` },
    });

    return user;
}

export async function createEvent(eventInfo) {
    const token = localStorage.getItem('auth');
    if (!token) return;

    await eventApi.eventsPost(eventInfo, {
        headers: { authorization: `Bearer ${token}` },
    });
}

/* *** */

// Implementation stuff

function callOnEventChange(eventId, change) {
    for (const callback of callbackOnEventChange) {
        callback(eventId, change);
    }
}

export { app, userApi, eventApi };
