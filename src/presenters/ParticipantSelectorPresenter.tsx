/*
 * Component for selecting a user. Either by entering an email address, or by selecting the name of one of your contacts
 */

import React from 'react';
import ParticipantSelectorView from '../views/ParticipantSelectorView';

export type ParticipantSelectorPresenterProps = {
    placeholderText?: string;   // Show this when the textfield is empty
    buttonText?: string;        // Show this text on the button
    multiple?: boolean;         // Can select multiple values?
    onSubmit?: (selectedOptions: UserOption[]) => void; // Called with a list of all selected options when the button is pressed
};

// An option that can be selected. The label property is for display purposes, and the name "label" is used by MUI
export type UserOption = {
    label: string;
    email: string;
};

export default function ParticipantSelectorPresenter(
    props: ParticipantSelectorPresenterProps
) {
    const [options, setOptions] = React.useState<UserOption[]>([]); // List of options to suggest to the user
    const [isValid, setValid] = React.useState(false); 
    const [inputValue, setInputValue] = React.useState(''); // The current text in the textfield
    const [selection, setSelection] = React.useState<UserOption[]>([]); // The selected options
    const [loaded, setLoaded] = React.useState(false);  // Is the previous loading operation complete?

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

    const handleSelect = () => {
        props.onSubmit?.(selection);
        setSelection([]);
    };

    return (
        <ParticipantSelectorView
            valid={isValid}
            placeholderText={props.placeholderText}
            buttonText={props.buttonText}
            options={options}
            loading={loading}
            setInputValue={setInputValue}
            setValue={setSelection}
            inputValue={inputValue}
            value={selection}
            multiple={props.multiple}
            onSubmit={handleSelect}
        />
    );
}
