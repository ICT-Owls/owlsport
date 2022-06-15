import React, { FC, SyntheticEvent } from 'react';

import { UserOption } from '../presenters/ParticipantSelectorPresenter';

import {
    Button,
    Box,
    Autocomplete,
    TextField,
    CircularProgress,
    createFilterOptions,
    buttonBaseClasses,
} from '@mui/material';

import { AutocompleteRenderInputParams } from '@mui/material';

const filter = createFilterOptions<UserOption>();

export type ParticipantSelectorViewProps = {
    valid: boolean; // Is the current text input a valid user?
    options: UserOption[]; // Available options in drop-down menu
    placeholderText?: string; // Text to display when textfield is empty
    buttonText?: string; // Text to display on the button
    showButton?: boolean; // Should display the submit button?
    loading: boolean; // Are the options currently being loaded in?
    inputValue?: string; // Text in textfield
    setInputValue?: (textInput: string) => void;
    value?: UserOption[]; // Selected options
    setValue?: (selection: UserOption[]) => void;
    onSubmit?: () => void; // Will be called when the button is pressed
    multiple?: boolean; // Allow multiple options to be selected?
};

// Renderer for the text field
const UserTextField = (props: {
    params: AutocompleteRenderInputParams;
    placeholderText?: string;
    loading: boolean;
    valid: boolean;
}) => {
    return (
        <TextField
            {...props.params}
            sx={{ minWidth: '16em', maxWidth: '32em' }}
            label={
                props.placeholderText ? props.placeholderText : 'E-mail address'
            }
            InputProps={{
                ...props.params.InputProps,
                endAdornment: (
                    <React.Fragment>
                        {props.loading ? (
                            <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {props.params.InputProps.endAdornment}
                    </React.Fragment>
                ),
            }}
        />
    );
};

type ButtonProps = {
    onSubmit?: () => void;
    buttonText?: string;
    showButton?: boolean;
    valid: boolean;
    value?: UserOption[];
};

const SubmitButton: FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <Button
            disabled={props.value?.length === 0 && !props.valid}
            onClick={() => {
                props?.onSubmit?.();
            }}
        >
            {props.buttonText ? props.buttonText : 'Select'}
        </Button>
    );
};

const ParticipantSelectorView: FC<ParticipantSelectorViewProps> = (
    props: ParticipantSelectorViewProps
) => {
    const [open, setOpen] = React.useState(false);

    const button = SubmitButton(props);

    const handleChange = (
        _event: SyntheticEvent,
        newValue: UserOption[] | UserOption | null
    ) => {
        console.info("New Value: " + newValue);
        if (newValue == null) {
            props?.setValue?.([]);
            return;
        }
        if (Array.isArray(newValue)) {
            props?.setValue?.(newValue);
            return;
        }
        props?.setValue?.([newValue]);
    };

    return (
        <Box
            maxWidth="100%"
            sx={{
                flexDirection: 'row',
                display: 'flex',
            }}
        >
            <Autocomplete
                multiple={props.multiple}
                openOnFocus={true}
                clearOnBlur={false}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onInputChange={(_event, newValue: string) => {
                    props?.setInputValue?.(newValue);
                }}
                onChange={handleChange}
                value={props.value}
                inputValue={props.inputValue}
                options={props.options}
                fullWidth={true}
                renderInput={(params: AutocompleteRenderInputParams) => (
                    <UserTextField
                        params={params}
                        placeholderText={props.placeholderText}
                        loading={props.loading}
                        valid={props.valid}
                    />
                )}
                isOptionEqualToValue={(option: UserOption, value: UserOption) =>
                    option.email === value.email
                }
            />

            {props.showButton ? button : null}
        </Box>
    );
};

export default ParticipantSelectorView;
