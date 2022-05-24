/*
 * Component for selecting a user. Either by entering an email address, or by selecting the name of one of your contacts
 */

import React, { FC } from 'react';
import ParticipantSelectorView from '../views/ParticipantSelectorView';
import { emailRegEx } from '../constants';

export type ParticipantSelectorPresenterProps = {
    placeholderText?: string; // Show this when the textfield is empty
    buttonText?: string; // Show this text on the button
    showButton?: boolean; // Should display the submit button?
    multiple?: boolean; // Can select multiple values?
    onChange?: (newValue: UserOption[]) => void; // Called when options are selected or deselected
    onSubmit?: (selectedOptions: UserOption[]) => void; // Called with a list of all selected options when the button is pressed
};

// An option that can be selected. The label property is for display purposes, and the name "label" is used by MUI
export type UserOption = {
    label: string;
    email: string;
};

const newOptions = [
    { email: 'Test Testson', label: 'test@test.com' },
    { email: 'erik@owlsport.se', label: 'Erik Eriksson' },
    { email: 'muhja@owlsport.se', label: 'Muhja Aboud' },
    { email: 'zach@owlsport.se', label: 'Zacharias Eklund' },
    { email: 'zhkng@owlsport.se', label: 'Zhu Kang' },
    { email: 'munira@owlsport.se', label: 'Munira Regalado' },
    { email: 'amy@owlsport.se', label: 'Amy McMillan' },
    { email: 'amina@owlsport.se', label: 'Amina Negassi' },
    { email: 'marco@owlsport.se', label: 'Marco Dahl' },
]; // TODO: Load from user's friends (and other known users?)

const ParticipantSelectorPresenter: FC<ParticipantSelectorPresenterProps> = (
    props: ParticipantSelectorPresenterProps
) => {
    const [options, setOptions] = React.useState<UserOption[]>(newOptions); // List of options to suggest to the user, including what the user is typing
    const [fixedOptions, setFixedOptions] =
        React.useState<UserOption[]>(newOptions); // List of loaded options, excluding what the user is typing
    const [isInputValid, setIsInputValid] = React.useState(false);
    const [inputValue, setInputValue] = React.useState(''); // The current text in the textfield
    const [selection, setSelection] = React.useState<UserOption[]>([]); // The selected options
    const [loaded, setLoaded] = React.useState(false); // Is the previous loading operation complete?

    const loading = (!loaded || options.length <= 1) && inputValue !== '';

    // Handle user typing
    React.useEffect(() => {
        let active = true;

        // Check if manual input is valid email address
        setIsInputValid(emailRegEx.test(inputValue));

        // Check if entered email already exists in options to not add it twice
        const isExisting = fixedOptions.some(
            (option) => inputValue === option.label
        );

        // Is entered email valid and unique?
        const shouldSuggestInputValue: boolean = !isExisting && isInputValid;

        // Set options presented to user
        setOptions(
            shouldSuggestInputValue
                ? [{ email: inputValue, label: inputValue }, ...fixedOptions]
                : fixedOptions
        );

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

    React.useEffect(() => {
        // Trigger onChange if chaged
        props.onChange?.(
            isInputValid
                ? [{ email: inputValue, label: inputValue }, ...selection]
                : selection
        );
    }, [isInputValid, selection]);

    const handleSubmit = () => {
        props.onSubmit?.(
            isInputValid
                ? [{ email: inputValue, label: inputValue }, ...selection]
                : selection
        );

        setSelection([]); // Clear input
        setInputValue('');
    };

    return (
        <ParticipantSelectorView
            valid={isInputValid}
            placeholderText={props.placeholderText}
            buttonText={props.buttonText}
            showButton={props.showButton}
            options={options}
            loading={loading}
            setInputValue={setInputValue}
            setValue={setSelection}
            inputValue={inputValue}
            value={selection}
            multiple={props.multiple}
            onSubmit={handleSubmit}
        />
    );
};

ParticipantSelectorPresenter.defaultProps = {
    showButton: true,
};

export default ParticipantSelectorPresenter;
