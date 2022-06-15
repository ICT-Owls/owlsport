import React, { useEffect, useState } from 'react';
//import { getEvents } from 'api';
import EventListView from '../views/EventListView';
import { useEventList, useLoadingStatus } from '../models/Model';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

export default function EventListPresenter({ user }) {
    const [loadingStatus, startProcess, clearProcess] = useLoadingStatus();

    const [events, pollEvents] = useEventList();
    const match = useMatch('events');

    const [oldEvents, setOldEvents] = useState(
        events.filter((o) => o.endDateTime <= Date.now())
    );
    const [newEvents, setNewEvents] = useState(
        events.filter((o) => o.endDateTime > Date.now())
    );

    const [haveNewEvents, setHaveNewEvents] = useState(false);
    const [haveOldEvents, setHaveOldEvents] = useState(false);

    const [loaded, setLoaded] = useState(false);
    const [hidden, setHidden] = useState(true);

    const nav = useNavigate();

    useEffect(() => {
        if (match) {
            pollEvents().then(() => {
                setLoaded(true);
            });
        }
    }, [match]);

    useEffect(() => {
        setHidden(!loaded || !match);
        console.log('loaded=' + loaded + '\tprocesses=' + loadingStatus);
        if (loaded && loadingStatus.indexOf('eventList') >= 0)
            clearProcess('eventList');
        if (!loaded && loadingStatus.indexOf('eventList') < 0)
            startProcess('eventList');
    }, [loaded]);

    useEffect(() => {
        setOldEvents(events.filter((o) => o.endDateTime <= Date.now()));
        setNewEvents(events.filter((o) => o.endDateTime > Date.now()));
        setHaveNewEvents(newEvents.length > 0);
        setHaveOldEvents(oldEvents.length > 0);
    }, [events]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({
        events,
        user,
        loadEvents: pollEvents,
        onCreateEventClicked: () => nav('./create'),
        haveNewEvents,
        haveOldEvents,
        newEvents,
        oldEvents,
        hidden: hidden,
        loaded,
    });
}
