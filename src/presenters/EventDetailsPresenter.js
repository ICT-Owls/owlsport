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

    const opts = {
        headers: { authorization: `Bearer ${user.accessToken}` },
    };

    useEffect(() => {
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

    const setCarpooling = (requiresCarpooling, location) => {
        if (eventData.event.id)
            eventApi
                .eventsIdSelfPatch(
                    {
                        requiresCarpooling,
                        location,
                    },
                    eventData.event.id,
                    opts
                )
                .then((newMember) => {
                    setEventData({
                        event: {
                            ...event,
                            members: {
                                ...event.members,
                                [newMember.id]: newMember,
                            },
                        },
                        creator,
                    });
                })
                .catch((err) => console.error(err));
    };

    const { event, creator } = eventData;

    return EventDetailsView({ event, creator, user, setCarpooling });
}
