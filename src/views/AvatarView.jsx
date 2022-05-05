import { Avatar, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { AvatarGenerator } from 'random-avatar-generator';
const avatarGenerator = new AvatarGenerator();

export default function AvatarView(props) {
    const user = props.user;
    const name = user.firstName + ' ' + user.lastName;
    user.avatar = avatarGenerator.generateRandomAvatar();
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if neccessary)
    return (
        <Tooltip title={name}>
            <Avatar alt={name} src={avatarGenerator.generateRandomAvatar()} />
        </Tooltip>
    );
}

AvatarView.propTypes = {
    user: PropTypes.object,
};
