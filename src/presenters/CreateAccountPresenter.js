import CreateAccountView from '../views/CreateAccountView';
import { useState, useEffect } from 'react';
import { use } from 'chai';

export default function CreateAccountPresenter({ showMe, handleVisibility }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailNotValid, setEmailNotValid] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [displayNameError, setDisplayNameError] = useState(false);

    const usedDisplayNames = ['bob', 'david', 'foo', 'bar'];

    useEffect(() => {
        password === repeatPassword
            ? setPasswordsDontMatch(false)
            : setPasswordsDontMatch('Passwords do not match');
    }, [password, repeatPassword]);

    useEffect(() => {
        password.length >= 6
            ? setPasswordInvalid(false)
            : setPasswordInvalid('Password needs to be at least 6 characters');
    }, [password]);

    useEffect(() => {
        email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
            ? setEmailNotValid(false)
            : setEmailNotValid('Email not valid');
    }, [email]);

    useEffect(() => {
        //Check that displayname does not exist

        var exist = false;
        if (displayName === '') setDisplayNameError('You need a name');
        else {
            usedDisplayNames.forEach((name) => {
                if (displayName.toLowerCase() === name.toLowerCase())
                    exist = true;
            });
            exist
                ? setDisplayNameError('Name taken!')
                : setDisplayNameError(false);
        }
    }, [displayName]);

    return CreateAccountView({
        showMe,
        handleVisibility,
        setDisplayName,
        setEmail,
        setPassword,
        setRepeatPassword,
        emailNotValid,
        passwordsDontMatch,
        passwordInvalid,
        displayNameError,
        displayName,
    });
}
