import * as React from 'react';
import EventCreatingView from '../views/EventCreatingView';
import { createEvent } from '../helpers/Firebase';
import EventCreatingView2 from '../views/EventCreatingView';

export const EventCreatingPresenter = (
    props /*: {onCreateEvent: (event) => void} */
) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState(Date.now());
    const [endDateTime, setEndDateTime] = React.useState(
        Date.now() + 1000 * 3600
    );
    const [members, setMembers] = React.useState([]);

    const submit = () => {
        createEvent({
            title,
            description,
            location,
            startDateTime,
            endDateTime,
            members,
        });
    };

    return EventCreatingView2({
        title,
        setTitle,
        description,
        setDescription,
        location,
        setLocation,
        startDateTime,
        setStartDateTime,
        endDateTime,
        setEndDateTime,
        members,
        setMembers,
        submit,
    });
};
