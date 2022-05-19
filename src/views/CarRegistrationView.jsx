import * as React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AvatarView from './AvatarView';
import TextField from '@mui/material/TextField';

const CarRegistrationView = (props) => {
    const {
        carModel,
        setCarModel,
        carNumber,
        setCarNumber,
        fromLocation,
        setFromLocation,
        seatsCount,
        setSeatsCount,
        submit,
        user,
    } = props;
    console.log('CarRegistrationView', props);
    //const [seatsCount, setSeatsCount] =  React.useState(1);

    const inc = () => {
        setSeatsCount(seatsCount + 1);
    };

    const dec = () => {
        if (seatsCount > 1) setSeatsCount(seatsCount - 1);
    };

    return <h1></h1>;
};

export default CarRegistrationView;
