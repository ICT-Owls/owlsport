import CreateAccountView from '../views/CreateAccountView';
import { useState, useEffect } from 'react';

export default function CreateAccountPresenter({ showMe, handleVisibility }) {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [emailNotValid, setEmailNotValid] = useState(false);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    useEffect(() => {
        if (password === repeatPassword) setPasswordsDontMatch(false);
        else setPasswordsDontMatch('Passwords do not match');
    }, [password, repeatPassword]);

    useEffect(() => {
        if (password.length >= 6) setPasswordInvalid(false);
        else setPasswordInvalid('Password needs to be at least 6 characters');
    }, [password]);

    useEffect(() => {
        if (
            email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        )
            setEmailNotValid(false);
        else setEmailNotValid('Email not valid');
    }, [email]);

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
    });
}
