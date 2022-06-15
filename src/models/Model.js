import { Status as MapStatus } from '@googlemaps/react-wrapper';
import { getEvents } from 'api';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { auth, isLoggedIn, userApi } from '../helpers/Firebase';

//-------- ReadMe --------
//To use a existing state, import the wrapper function for that state and use it like you would
//a normal React.useState() hook.

//To create a new app-wide state which persists in local storage, define a
//variable name to which a defaultValue and callback list will be associated
//in the dataStruct object. Then write a wrapper to useCustomHook which
//passes the name of the variable you chose.

//Add Variable name, default value and a empty object for callbacks here:
const dataStruct = {
    Example: { defaultValue: null, callbacks: {} },
    events: { defaultValue: [], callbacks: {} },
    showChat: { defaultValue: false, callbacks: {} },
    mapStatus: { defaultValue: MapStatus.LOADING, callbacks: {} },
    mainContentLoading: { defaultValue: [], callbacks: {} },
};

//-------- Custom Hooks --------
//These use the useCustomHook, which returns a hook which is subscribed to the given struct.
//These are used to app wide state managment, make sure you define a matching entry in the dataStruct object

//Add your own wrappers here:
export function useExample() {
    return useCustomHook('Example');
}

// Returns a poll function instead of a setter
export function useEventList() {
    const [events, setEvents] = useCustomHook('events');

    const poll = async () => {
        const status = fromLocalStorage('mainContentLoading');
        if (!isLoggedIn() || status.includes('pollEvents')) return;
        const freshEvents = await getEvents();
        if (freshEvents != null) setEvents(freshEvents);
    };

    return [events, poll];
}

export function useChat() {
    return useCustomHook('showChat');
}

export function useMapStatus() {
    const hook = useCustomHook('mapStatus');
    return hook || [null, () => null];
}

/**
 *   @returns [status: array, startProcess(process), clearProcess(process)]
 */
export function useLoadingStatus() {
    const [status, setStatus] = useCustomHook('mainContentLoading');
    return [
        status,
        (process) => {
            status.push(process);
            setStatus(status);
        },
        (process) => {
            const i = status.indexOf(process);
            if (i < 0) return;
            status.splice(status.indexOf(process), 1);
            setStatus(status);
        },
    ];
}

//This function is the current implementation of User login persistance. Since auth()
//persists it does not make sense to store in local storage. Also, the user object provided
//by auth() cannot be stringified easily. It would make sense to store both this and our own
//user object in the future.
export function useAuthUser() {
    const [authUser, setAuthUser] = useState(auth.currentUser);
    useEffect(() => auth.onAuthStateChanged((e) => setAuthUser(e)));
    return [authUser];
}

export function useUser() {
    const [authUser] = useAuthUser();
    const [user, setUser] = useState(undefined);
    useEffect(() => {
        if (authUser?.uid)
            userApi
                .userIdGet(authUser.uid, {
                    headers: {
                        authorization: `Bearer ${authUser.accessToken}`,
                    },
                })
                .then((userData) =>
                    setUser({
                        ...userData,
                        accessToken: authUser.accessToken,
                    })
                )
                .catch((err) => console.error(err));
        else setUser(undefined);
    }, [authUser]);
    return [user];
}

//-------- Public Functions --------

//This function is run by App.jsx when mounted. Initialized the model
export function initModel() {
    // Don't persist loadig state
    localStorage.removeItem('mapStatus');
    localStorage.removeItem('mainContentLoading');

    //If value does not exist in local storage, then load default value
    Object.keys(dataStruct).map((e) => {
        localStorage.getItem(e) === null &&
            localStorage.setItem(e, JSON.stringify(dataStruct[e].defaultValue));
    });

    //Put subsciption logic here with our own Database
    //
    //  const unsub1 = mySubscribeFunc1(params)
    //  const unsub2 = mySubscribeFunc2(params)
    //  return(()=>{unsub1(); unsub2();})

    // Temporarily use polling for this
    console.log('setting up events interval');
    setInterval(async () => {
        if (!isLoggedIn()) return;
        const events = await getEvents();
        if (events != null) setValue('events', events);
    }, 10000);
}

//Read value from local storage.
function fromLocalStorage(target) {
    return JSON.parse(localStorage.getItem(target));
}

//Write new value to localstorage
function toLocalStorage(target, value) {
    localStorage.setItem(target, JSON.stringify(value));
}
//-------- Internal funcs --------

//Subscribes to the changes on some value with a callback. Returns the unsubscribe function
function subscribeTo(target, callback) {
    // create uid, add it to callbackStruct
    const id = uuidv4();
    dataStruct[target].callbacks[id] = callback;
    callback(fromLocalStorage(target));
    return () => {
        //return function that removes field in callbackStruct
        delete dataStruct[target].callbacks[id];
    };
}

// Sets a new value for target and calls its callbacks
function setValue(target, value) {
    if (value !== fromLocalStorage(target)) {
        toLocalStorage(target, value);
        callStruct(target);
    }
}

//calls the callbacks of some target.
function callStruct(target) {
    //check if object is empty first.
    Object.keys(dataStruct[target].callbacks).length == 0
        ? console.error(
              `Model Value: ${target}: No callbacks; Use the Custom Hooks`
          )
        : //If there are some callbacks, call them all
          Object.values(dataStruct[target].callbacks).forEach((e) =>
              e(fromLocalStorage(target))
          );
}

//Creates a useState hook that subscribes to model 'target' and updates model & any other states on the same target if changed
function useCustomHook(target) {
    if (
        fromLocalStorage(target) === undefined ||
        dataStruct[target] === undefined
    ) {
        if (process.env.NODE_ENV === 'development') {
            console.error(
                'useCustomHook: Cannot find target: ',
                target,
                '. Make sure that it is defined in the datastruct and that it is available in localstorage'
            );
        }
        return undefined;
    }
    const [val, setVal] = useState(fromLocalStorage(target));
    useEffect(() => {
        return subscribeTo(target, (e) => {
            setVal(e);
        });
    }, []);
    return [val, (e) => setValue(target, e)];
}
