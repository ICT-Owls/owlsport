import * as React from 'react';
import EventCreatingView from '../views/EventCreatingView';
import { createEvent } from '../helpers/Firebase';

export const EventCreatingPresenter = ({ user }) => {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState(Date.now());
    const [endDateTime, setEndDateTime] = React.useState(
        Date.now() + 1000 * 3600
    );
    const [members, setMembers] = React.useState([]);
    const [location, setLocation] = React.useState(undefined);

    const submit = () => {
        createEvent({
            title,
            description,
            startDateTime,
            endDateTime,
            members,
            location,
        });
    };

    return EventCreatingView({
        title,
        setTitle,
        description,
        setDescription,
        startDateTime,
        setStartDateTime,
        endDateTime,
        setEndDateTime,
        members,
        setMembers,
        location,
        setLocation,
        submit,
        user,
    });
};
