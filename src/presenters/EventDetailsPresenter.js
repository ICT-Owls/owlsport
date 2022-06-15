import { getUser } from 'api';
import { useLoadingStatus } from 'models/Model';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventApi } from '../helpers/Firebase';
import EventDetailsView from '../views/EventDetailsView';
export default function EventDetailsPresenter({ user }) {
    const [loadingStatus, startProcess, clearProcess] = useLoadingStatus();
    const { eventId } = useParams();
    const [eventData, setEventData] = React.useState({
        event: undefined,
        users: undefined,
    });

    const opts = {
        headers: { authorization: `Bearer ${user.accessToken}` },
    };

    useEffect(() => {
        (async () => {
            startProcess('eventDetails');
            const newEvent = await eventApi.eventsIdGet(eventId, opts);
            const newUsers = {};

            for (let userId of Object.keys(newEvent.members)) {
                const u = await getUser(userId);
                if (u) {
                    newUsers[userId] = u;
                }
            }

            setEventData({
                event: newEvent,
                users: newUsers,
            });
            clearProcess('eventDetails');
        })();
    }, [eventId]);

    const setCarpooling = (requiresCarpooling, location, seats) => {
        if (eventData.event.id)
            eventApi
                .eventsIdSelfPatch(
                    {
                        requiresCarpooling,
                        location,
                        seats,
                    },
                    eventData.event.id,
                    opts
                )
                .then((newMember) => {
                    setEventData({
                        ...eventData,
                        event: {
                            ...event,
                            members: {
                                ...event.members,
                                [newMember.id]: newMember,
                            },
                        },
                    });
                })
                .catch((err) => console.error(err));
    };

    const registerCar = (model, registration, seats, location) => {
        eventApi
            .eventsIdCarPost(
                {
                    car: {
                        model,
                        registration,
                        seats,
                    },
                    location,
                },
                eventId,
                opts
            )
            .then((newEvent) => {
                setEventData({
                    ...eventData,
                    event: newEvent,
                });
            })
            .catch((err) => console.error(err));
    };

    const pickup = (passengerId) => {
        eventApi
            .eventsIdPickupPost(
                {
                    passengerId,
                },
                eventId,
                opts
            )
            .then((newEvent) => {
                setEventData({
                    ...eventData,
                    event: newEvent,
                });
            })
            .catch((err) => console.error(err));
    };

    const { event, users } = eventData;

    return EventDetailsView({
        event,
        users,
        user,
        setCarpooling,
        pickup,
        registerCar,
    });
}
