import React, { useEffect } from 'react';
import EventDetailsView from '../views/EventDetailsView';
import { userApi, eventApi } from '../helpers/Firebase';
import { useParams } from 'react-router-dom';
export default function EventDetailsPresenter({ user }) {
    const { eventId } = useParams();
    const [eventData, setEventData] = React.useState({
        event: undefined,
        creator: undefined,
    });

    useEffect(() => {
        const opts = {
            headers: { authorization: `Bearer ${user.accessToken}` },
        };
        eventApi
            .eventsIdGet(eventId, opts)
            .then((event) => {
                userApi
                    .userIdGet(event.creatorId, opts)
                    .then((creator) => {
                        setEventData({ event, creator });
                    })
                    .catch((err) => console.error(err));
            })
            .catch((err) => console.error(err));
    }, [eventId]);

    const { event, creator } = eventData;

    return EventDetailsView({ event, creator, user });
}
