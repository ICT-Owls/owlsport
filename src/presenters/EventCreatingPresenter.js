import * as React from 'react';
import EventCreatingView from '../views/EventCreatingView';
import { createEvent } from '../helpers/Firebase';

export const EventCreatingPresenter = (
    props /*: {onCreateEvent: (event) => void} */
) => {
    console.log('props=',props);

    const submitToServer = (event) => {
        event.id = event.title;
        event.creatorId = localStorage.getItem('uid');
        event.creationDate = Date.now();
        createEvent(event);
    };

    return (
        <EventCreatingView user={props.user}
            callback={
                props.onCreateEvent
                    ? (e) => {
                          props.onCreateEvent(e);
                          submitToServer(e);
                      }
                    : (e) => {
                        submitToServer(e);
                      }
            }
        />
    );
};
