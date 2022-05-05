import { Avatar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function AvatarView(props) {
    const user = props.user;
    const name = user.firstName + ' ' + user.lastName;
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <Tooltip title={name}>
            <Avatar alt={name} src={user.avatar} />
        </Tooltip>
    );
}

AvatarView.propTypes = {
    user: PropTypes.object,
};
