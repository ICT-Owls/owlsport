import React, { useEffect } from 'react';
//import { getEvents } from 'api';
import EventListView from '../views/EventListView';
import { useEventList } from '../models/Model';
import {  useLocation } from 'react-router-dom';

export default function EventListPresenter({ user }) {
    const [events, pollEvents] = useEventList();

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/events') pollEvents();
    }, [location]);

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({ events, user, loadEvents: pollEvents });
}
