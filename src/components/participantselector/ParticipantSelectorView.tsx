import React, { Dispatch, useEffect } from 'react';

import ParticipantSelectorPresenter from './ParticipantSelectorPresenter';
import Show from '../../helpers/Show';

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
} from '@mui/material';

import { margin } from '@mui/system';
import { stringify } from 'querystring';

type UserOption = {
    label: string;
    email: string;
};

export type ParticipantSelectorProps = {
    valid: boolean;
    placeholderText?: string;
    buttonText?: string;
};

function GetOptions(input: string) : UserOption[] {
    return [{label: "test", email: "email"}];
}

export default function ParticipantSelectorView(
    props: ParticipantSelectorProps
) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    const [options, setOptions]: [
        UserOption[],
        Dispatch<React.SetStateAction<UserOption[]>>
    ] = React.useState<UserOption[]>([]);

    function UserTextField(params: any) {
        return (
            <TextField
                {...params}
                sx={{ minWidth: '16em', maxWidth: '32em' }}
                label={
                    props.placeholderText
                        ? props.placeholderText
                        : 'E-mail address'
                }
            />
        );
    }

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
                multiple
                openOnFocus={true}
                clearOnBlur={false}
                limitTags={1}
                options={options}
                fullWidth={true}
                renderInput={UserTextField}
            />

            <Button>{props.buttonText ? props.buttonText : 'Select'}</Button>
        </Box>
    );
}
