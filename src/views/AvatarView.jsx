import { Avatar, Tooltip } from '@mui/material';
import { generateAvatar } from '../helpers/Generators';
import PropTypes from 'prop-types';
import React from 'react';

export default function AvatarView({ user }) {
    const name = user.firstName + ' ' + user.lastName;
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <Tooltip title={name}>
            <Avatar alt={name} src={generateAvatar()} />
        </Tooltip>
    );
}

AvatarView.propTypes = {
    user: PropTypes.object,
};
