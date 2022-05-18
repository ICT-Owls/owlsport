import React, { useEffect } from 'react';
//import { getEvents } from 'api';
import EventListView from '../views/EventListView';
import { useEventList } from '../models/Model';

export default function EventListPresenter({ user }) {
    const [events, setEvents] = useEventList();

    // Hooks, logic, etc goes here. These presenters manipulate data, transform it into usable functions and values, then passes those to a view.
    // No visual code here.
    return EventListView({ events, user });
}
