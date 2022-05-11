import React, { useEffect } from 'react';
import { userApi } from '../helpers/Firebase';
import AvatarView from '../views/AvatarView';
export default function AvatarPresenter(props) {
    const [member, setMember] = React.useState(undefined);

    useEffect(() => {
        if (props.user)
            userApi
                .userIdGet(props.userId, {
                    headers: {
                        authorization: `Bearer ${props.user.accessToken}`,
                    },
                })
                .then((data) => setMember(data))
                .catch((err) => console.error(err));
    }, [props.user]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return member ? AvatarView({ user: member }) : '';
}
