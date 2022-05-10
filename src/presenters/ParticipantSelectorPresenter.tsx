import React from 'react';
import ParticipantSelectorView from '../views/ParticipantSelectorView';

export type ParticipantSelectorPresenterProps = {
    placeholderText?: string;
    buttonText?: string;
    multiple?: boolean;
};

export type UserOption = {
    label: string;
    email: string;
};

export default function ParticipantSelectorPresenter(
    props: ParticipantSelectorPresenterProps
) {
    const [options, setOptions] = React.useState<UserOption[]>([]);
    const [isValid, setValid] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [loaded, setLoaded] = React.useState(false);

    const loading = (!loaded || options.length <= 1) && inputValue !== '';

    React.useEffect(() => {
        let active = true;

        // TODO: Test if email is valid

        const newOptions = [
            { label: 'Erik Eriksson', email: 'erik@erik.erik' },
            { label: 'Test Test', email: 'test@test.com' },
            { label: 'James Bond', email: 'the007@mi6.firebaseapp.io' },
            { label: 'Best Friend', email: 'niceperson@smilemail.gov.uk' },
        ]; // TODO: Load from user's friends (and other known users?)

        setOptions(newOptions);

        if (!loading) {
            return undefined;
        }
        setLoaded(false);

        (async () => {
            if (active) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000);
                });
                setLoaded(true);
            }
        })();

        return () => {
            active = false;
        };
    }, [inputValue]);

    return (
        <ParticipantSelectorView
            valid={isValid}
            placeholderText={props.placeholderText}
            buttonText={props.buttonText}
            options={options}
            loading={loading}
            setInputValue={setInputValue}
            inputValue={inputValue}
            multiple={props.multiple}
        />
    );
}
