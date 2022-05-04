import { Avatar, Tooltip } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

export default function AvatarView(props) {
    const user = props.user;
    const name = user.firstName + ' ' + user.lastName;
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <a href={'/user/' + user.id}>
            <Tooltip title={name}>
                <Avatar alt={name} src={user.avatar} />
            </Tooltip>
        </a>
    );
}

AvatarView.propTypes = {
    user: PropTypes.object,
};
