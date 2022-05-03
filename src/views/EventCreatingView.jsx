import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function UserInfoView() {
    return (
        <div>
            {/*We need to have a global state with user info to display here*/}
            <div>
                James Bond
            </div>
            <img src='avatar.png' alt='avatar' />
        </div>
    );
}

export default function EventCreatingView() {
    const [value, setValue] = React.useState/*<Date | null>*/(new Date());

    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <div>
            <UserInfoView/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="DateTimePicker"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}
