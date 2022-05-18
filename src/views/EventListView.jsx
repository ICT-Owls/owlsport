import {
    Box,
    Button,
    Card,
    Container,
    Dialog,
    Divider,
    Link,
    List,
    ListItem,
    Slide,
    Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { EventCreatingPresenter } from '../presenters/EventCreatingPresenter';
import EventListCardView from './EventListCardView';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventListView({ events, user, loadEvents }) {
    const [createOpen, setCreateOpen] = React.useState(false);
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <Dialog
                // for keeping CSS style in EventCreating.jsx
                disablePortal={true}
                open={createOpen}
                onClose={() => {
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

            <Typography textAlign={'center'} variant="h3">
                Events
            </Typography>
            <Box className={'flex flex-col items-start'}>
                <Button
                    className="w-fit justify-start self-start"
                    onClick={() => setCreateOpen(true)}
                >
                    + Create Event
                </Button>
            </Box>
            <List className={'overflow-hidden'}>
                {events.map((event) => {
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
        </Container>
    );
}

EventListView.propTypes = {
    events: PropTypes.array,
};
