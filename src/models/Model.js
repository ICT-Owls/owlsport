import { v4 as uuidv4 } from 'uuid';

const dataStruct = {};

//-------- Internal funcs --------

//calls the callbacks of some value
function callStruct(target) {
    //check if object is empty first.
    Object.keys(dataStruct[target]['callbacks']).length == 0
        ? console.error(
              `There are no subscribers on the struct ${target}: ${dataStruct[target]['callbacks']}`
          )
        : //If there are some callbacks, call them all
          Object.values(dataStruct[target]['callbacks']).forEach((e) =>
              e(dataStruct[target]['value'])
          );
}

function checkIfExist(target) {
    if (!dataStruct[target])
        dataStruct[target] = { value: null, callbacks: [] };
}

//-------- Hybrid funcs --------

//Subscribes to the changes on some value. Returns the unsubscribe function
export function subscribeTo(target, callback) {
    checkIfExist(target);
    // create uid, add it to callbackStruct
    var id = uuidv4();
    dataStruct[target]['callbacks'][id] = callback;

    return () => {
        //return function that removes field in callbackStruct
        delete dataStruct[target]['callbacks'][id];
    };
}

// Sets the value of some target, if a change occured then call that values callback
export function setValue(target, value) {
    checkIfExist(target);
    var old = dataStruct[target]['value'];
    dataStruct[target]['value'] = value;
    if (old !== dataStruct[target]['value']) callStruct(target);
}

//-------- External funcs --------

export function subscribeToUser(callback) {
    return subscribeTo('user', callback);
}

export function setUser(value) {
    return setValue('user', value);
}
