import React, { useEffect } from 'react';
import { userApi } from '../helpers/Firebase';
import AvatarView from '../views/AvatarView';
export default function AvatarPresenter({ user, userId }) {
    const [member, setMember] = React.useState(undefined);

    useEffect(() => {
        if (user)
            userApi
                .userIdGet(userId, {
                    headers: {
                        authorization: `Bearer ${user.accessToken}`,
                    },
                })
                .then((data) => setMember(data))
                .catch((err) => console.error(err));
    }, [user]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    //erhie
    return member ? AvatarView({ user: member }) : '';
}
