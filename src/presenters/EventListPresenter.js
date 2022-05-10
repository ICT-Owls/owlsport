import React, { useEffect } from 'react';
import { eventApi } from '../helpers/Firebase';
import EventListView from '../views/EventListView';
export default function EventListPresenter(props) {
    const [events, setEvents] = React.useState([]);

    useEffect(() => {
        if (props.user) {
            eventApi
                .eventsGet({
                    headers: {
                        authorization: `Bearer ${props.user.accessToken}`,
                    },
                })
                .then((data) =>
                    setEvents(
                        data.map((e) => {
                            if (!e.members) e.members = [];
                            return e;
                        })
                    )
                )
                .catch((err) => console.error(err));
        }
    }, [props.user]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({ events: events, user: props.user });
}
