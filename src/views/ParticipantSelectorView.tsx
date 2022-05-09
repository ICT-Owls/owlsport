import React, { SetStateAction, Dispatch } from 'react';

import ParticipantSelectorPresenter, {
    UserOption,
} from '../presenters/ParticipantSelectorPresenter';
import Show from '../helpers/Show';

import {
    Dialog,
    DialogTitle,
    Button,
    Box,
    Autocomplete,
    Divider,
    TextField,
    Container,
    ListItem,
    CircularProgress,
} from '@mui/material';

import { AutocompleteRenderInputParams } from '@mui/material';

export type ParticipantSelectorProps = {
    valid: boolean;
    options: UserOption[];
    placeholderText?: string;
    buttonText?: string;
    loading: boolean;
    /* eslint-disable-next-line */ // Why is ESLint getting upset about this??
    setInputValue?: (textInput: string) => void;
    inputValue?: string;
};

const UserTextField = (props: {
    params: AutocompleteRenderInputParams;
    placeholderText?: string;
    loading: boolean;
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

const ParticipantSelectorView = (props: ParticipantSelectorProps) => {
    const [open, setOpen] = React.useState(false);

    return (
        <Box
            maxWidth="100%"
            sx={{
                p: '2em',
                flexDirection: 'row',
                display: 'flex',
            }}
        >
            <Autocomplete
                openOnFocus={true}
                clearOnBlur={false}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onInputChange={(event, newValue: string) =>
                    props?.setInputValue?.(newValue)
                }
                inputValue={props.inputValue}
                options={props.options}
                fullWidth={true}
                renderInput={(params: AutocompleteRenderInputParams) => (
                    <UserTextField
                        params={params}
                        placeholderText={props.placeholderText}
                        loading={props.loading}
                    />
                )}
            />

            <Button>{props.buttonText ? props.buttonText : 'Select'}</Button>
        </Box>
    );
};

export default ParticipantSelectorView;
