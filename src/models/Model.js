import { v4 as uuidv4 } from 'uuid';
import { auth } from '../helpers/Firebase';
import { useState, useEffect, useDebugValue } from 'react';

const dataStruct = {
    user: { value: null, callbacks: {} },
};

//-------- Internal funcs --------

//Subscribes to the changes on some value. Returns the unsubscribe function
function subscribeTo(target, callback) {
    // create uid, add it to callbackStruct
    const id = uuidv4();
    dataStruct[target].callbacks[id] = callback;
    callback(dataStruct[target].value);
    return () => {
        //return function that removes field in callbackStruct
        delete dataStruct[target].callbacks[id];
    };
}

// Sets a new value for target and calls its callbacks
function setValue(target, value) {
    if (value !== dataStruct[target].value) {
        dataStruct[target].value = value;
        callStruct(target);
    }
}

//calls the callbacks of some value
function callStruct(target) {
    //check if object is empty first.
    Object.keys(dataStruct[target].callbacks).length == 0
        ? console.error(
              `There are no subscribers on the struct ${target}: ${dataStruct[target].callbacks}. You should use a custom hook.`
          )
        : //If there are some callbacks, call them all
          Object.values(dataStruct[target].callbacks).forEach((e) =>
              e(dataStruct[target].value)
          );
}

function useCustomHook(struct) {
    const [val, setVal] = useState(dataStruct[struct].value);
    useEffect(() => {
        return subscribeTo(struct, (e) => {
            setVal(e);
        });
    }, []);
    return [val, (e) => setValue(struct, e)];
}

//-------- Public Functions --------

//This function is run by App.jsx when mounted. Inits the model
export function initModel() {
    var unsubFromAuth = auth.onAuthStateChanged((e) => setValue('user', e));

    return () => {
        unsubFromAuth();
    };
}

//-------- Custom Hooks --------
//These use the useCustomHook, which returns a hook which is subscribed to the given struct.
//These are used to app wide state managment, make sure you define a matching entry in the dataStruct object

export function useUser() {
    return useCustomHook('user');
}
