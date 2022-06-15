import {
    Box,
    Button,
    Container,
    Dialog,
    List,
    ListItem,
    Slide,
    Typography,
} from '@mui/material';
import { useEventList } from 'models/Model';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventCreatingPresenter } from '../presenters/EventCreatingPresenter';
import EventListCardView from './EventListCardView';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventListView(props) {
    const {
        events,
        user,
        loadEvents,
        onCreateEventClicked,
        newEvents,
        oldEvents,
        haveNewEvents,
        haveOldEvents,
        hidden,
    } = props;
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <div className={hidden ? 'hidden' : ''}>
            <Box className={'flex flex-col items-start scrollbar-thin'}>
                <Typography
                    fontSize={'1.5rem'}
                    fontFamily={'monospace'}
                    color={'#AAA'}
                >
                    Events
                </Typography>
                <Button
                    className="w-fit justify-start self-start"
                    onClick={onCreateEventClicked}
                >
                    + Create Event
                </Button>
            </Box>

            {haveNewEvents ? (
                <Typography textAlign={'center'} variant="h5" py-10>
                    Upcoming Events
                </Typography>
            ) : (
                <div />
            )}

            {haveNewEvents ? (
                <List>
                    {newEvents.map((event) => {
                        return (
                            <ListItem
                                key={event.id}
                                sx={{ p: 0, mx: 0, my: '1rem' }}
                            >
                                {EventListCardView({
                                    ...event,
                                    user,
                                })}
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <div />
            )}

            {haveOldEvents ? (
                <Typography textAlign={'center'} variant="h5" py-10>
                    Past Events
                </Typography>
            ) : (
                <div />
            )}

            {haveOldEvents ? (
                <List>
                    {oldEvents.map((event) => {
                        return (
                            <ListItem
                                key={event.id}
                                sx={{ p: 0, mx: 0, my: '1rem' }}
                            >
                                {EventListCardView({
                                    ...event,
                                    user,
                                })}
                            </ListItem>
                        );
                    })}
                </List>
            ) : (
                <div />
            )}
        </div>
    );
}

EventListView.propTypes = {
    events: PropTypes.array,
};
