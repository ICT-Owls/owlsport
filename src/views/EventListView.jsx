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
import React, { useEffect, useState } from 'react';
import { EventCreatingPresenter } from '../presenters/EventCreatingPresenter';
import EventListCardView from './EventListCardView';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventListView({ events, user, loadEvents }) {
    const [, pollEvents] = useEventList();

    const [oldEvents, setOldEvents] = useState(
        events.filter((o) => o.endDateTime <= Date.now())
    );
    const [newEvents, setNewEvents] = useState(
        events.filter((o) => o.endDateTime > Date.now())
    );

    const [haveNewEvents, setHaveNewEvents] = useState(false);
    const [haveOldEvents, setHaveOldEvents] = useState(false);

    useEffect(() => {
        setOldEvents(events.filter((o) => o.endDateTime <= Date.now()));
        setNewEvents(events.filter((o) => o.endDateTime > Date.now()));
        setHaveNewEvents(newEvents.length > 0);
        setHaveOldEvents(oldEvents.length > 0);
    }, [events]);

    // console.log(newEvents.length);
    // console.log(oldEvents.length);

    const [createOpen, setCreateOpen] = React.useState(false);
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <div className="">
            <Dialog
                // for keeping CSS style in EventCreating.jsx
                disablePortal={true}
                open={createOpen}
                onClose={() => {
                    pollEvents();
                    setCreateOpen(false);
                }}
                maxWidth="xl"
                fullWidth={true}
            >
                <Container padding="1rem">
                    <EventCreatingPresenter
                        user={user}
                        onSubmit={() => {
                            setCreateOpen(false);
                            loadEvents();
                        }}
                    />
                </Container>
            </Dialog>

            <Box className={'flex flex-col items-start'}>
                <Typography fontSize={'1.5rem'} fontFamily={'monospace'} color={"#AAA"}>Events</Typography>
                <Button
                    className="w-fit justify-start self-start"
                    onClick={() => setCreateOpen(true)}
                >
                    + Create Event
                </Button>
            </Box>

            {haveNewEvents ? (
                <Typography textAlign={'center'} variant="h5" py-10>
                    New Events
                </Typography>
            ) : (
                <div />
            )}

            {haveNewEvents ? (
                <List
                // sx={{
                //     width: '100%',
                //     // maxWidth: 360,
                //     // position: 'relative',
                //     // overflow: 'scroll',
                //     // height: '100%',
                //     maxHeight: '80%',
                //     minHeight: '60%'}}
                >
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
                    Old Events
                </Typography>
            ) : (
                <div />
            )}

            {haveOldEvents ? (
                <List
                // sx={{
                //         width: '100%',
                //        // maxWidth: 360,
                //        // position: 'relative',
                //        // overflow: 'scroll',
                //        // height: '100%',
                //        maxHeight: '80%',
                //        minHeight: '60%'}}
                >
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

            {/*<Box*/}
            {/*    sx={{ width: '100%', height: '80%', minHeight:'50vh', maxWidth: 360, bgcolor: 'yellow' }}*/}
            {/*>*/}
            {/*<List*/}
            {/*    sx={{*/}
            {/*        width: '100%',*/}
            {/*        maxWidth: 360,*/}
            {/*        bgcolor: 'background.paper',*/}
            {/*        position: 'relative',*/}
            {/*        overflow: 'auto',*/}
            {/*        maxHeight: '90%',*/}
            {/*        '& ul': { padding: 0 },*/}
            {/*    }}*/}
            {/*    subheader={<li />}*/}
            {/*>*/}
            {/*    {[0, 1, 2, 3, 4].map((sectionId) => (*/}
            {/*        <li key={`section-${sectionId}`}>*/}
            {/*            <ul>*/}
            {/*                <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>*/}
            {/*                {[0, 1, 2].map((item) => (*/}
            {/*                    <ListItem key={`item-${sectionId}-${item}`}>*/}
            {/*                        <ListItemText primary={`Item ${item}`} />*/}
            {/*                    </ListItem>*/}
            {/*                ))}*/}
            {/*            </ul>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</List>*/}
            {/*</Box>*/}
        </div>
    );
}

EventListView.propTypes = {
    events: PropTypes.array,
};
