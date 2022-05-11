import React, { useEffect } from 'react';
import { getEvents } from 'api';
import EventListView from '../views/EventListView';

export default function EventListPresenter({ user }) {
    const [events, setEvents] = React.useState([]);

    useEffect(() => {
        if (user) {
            getEvents()
                .then((data) => {
                    if (data === null) return;
                    setEvents(
                        data.map((e) => {
                            if (!e.members) e.members = [];
                            return e;
                        })
                    );
                })
                .catch((err) => console.error(err));
        }
    }, [user]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({ events, user });
}
