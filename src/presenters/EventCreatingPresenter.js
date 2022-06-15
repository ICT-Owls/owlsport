import * as React from 'react';
import EventCreatingView from '../views/EventCreatingView';
import { createEvent } from '../api';
import { useEventList } from 'models/Model';
import EventEditView from 'views/EventEditView';

export const EventCreatingPresenter = ({ user, onSubmit }) => {

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [startDateTime, setStartDateTime] = React.useState(Date.now());
    const [endDateTime, setEndDateTime] = React.useState(
        Date.now() + 1000 * 3600
    );
    const [, pollEvents] = useEventList();
    const [members, setMembers] = React.useState([]);
    const [location, setLocation] = React.useState({
        address: undefined,
        longitude: 0,
        latitude: 0,
    });
    const [date, setDate] = React.useState(Date.now());

    const submit = () => {
        const startDate = new Date(startDateTime);
        const endDate = new Date(endDateTime);

        const newStartDate = new Date(date);
        newStartDate.setUTCHours(startDate.getUTCHours());
        newStartDate.setUTCMinutes(startDate.getUTCMinutes());
        newStartDate.setUTCSeconds(startDate.getUTCSeconds());

        const newEndDate = new Date(date);
        newEndDate.setUTCHours(endDate.getUTCHours());
        newEndDate.setUTCMinutes(endDate.getUTCMinutes());
        newEndDate.setUTCSeconds(endDate.getUTCSeconds());

        let titleValue = title;
        let locationValue = location;
        if (!title || title.length === 0)
            titleValue = "Unnamed event";
        if (location.address === undefined)
            locationValue= {address: 'No address',
                longitude: 0, latitude: 0};

        createEvent({
            title: titleValue,
            description,
            startDateTime: newStartDate.getTime(),
            endDateTime: newEndDate.getTime(),
            members,
            location: locationValue,
        }).then(() => {
            pollEvents();
        });
        onSubmit();
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
        date,
        setDate,
    });
};
