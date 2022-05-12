import React, { useEffect } from 'react';
import { userApi } from '../helpers/Firebase';
import { useAuthUser } from '../models/Model';
import DriversCardView from '../views/DriversCardView';
export default function DriversCardPresenter({ id, address }) {
    const [member, setMember] = React.useState(undefined);
    const [authUser] = useAuthUser();

    useEffect(() => {
        userApi
            .userIdGet(id, {
                headers: {
                    authorization: `Bearer ${authUser.accessToken}`,
                },
            })
            .then((data) => setMember(data))
            .catch((err) => console.error(err));
    }, [id]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    //erhie
    return member ? DriversCardView({ member, address }) : '';
}
