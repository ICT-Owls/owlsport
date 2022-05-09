import {
    Card,
    Container,
    Divider,
    Link,
    List,
    ListItem,
    Typography,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Slide,
} from '@mui/material';

import PropTypes from 'prop-types';
import React from 'react';
import AvatarPresenter from '../presenters/AvatarPresenter';
import { EventCreatingPresenter } from '../presenters/EventCreatingPresenter';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventListView(props) {
    const [createOpen, setCreateOpen] = React.useState(false);
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <Container sx={{ paddingTop: '2rem' }}>
            <Dialog
                open={createOpen}
                onClose={() => {
                    setCreateOpen(false);
                }}
                maxWidth="xl"
                fullWidth={true}
            >
                <Container padding="1rem">
                    <EventCreatingPresenter
                        callback={() => {
                            setCreateOpen(false);
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
                {props.events.map((e) => {
                    return (
                        <ListItem key={e.id} sx={{ p: 0, mx: 0, my: '1rem' }}>
                            <Link
                                href={'/events/' + e.id}
                                underline="none"
                                className={'grow'}
                            >
                                <Card
                                    className={
                                        'max-h-32 bg-background-100 p-0 last:pb-0 hover:bg-background-200'
                                    }
                                    elevation={2}
                                >
                                    <Card
                                        className={
                                            'max-h-32 bg-background-100 p-0 last:pb-0 hover:bg-background-200'
                                        }
                                    >
                                        <div
                                            className={'flex grow flex-row p-0'}
                                        >
                                            <div
                                                className={
                                                    'flex aspect-square h-32 flex-col items-center justify-center'
                                                }
                                            >
                                                <Typography variant="h5" mt={1}>
                                                    {e.title}
                                                </Typography>
                                                <Typography variant="body1">
                                                    Location Here
                                                </Typography>
                                            </div>
                                            <Divider
                                                orientation="vertical"
                                                flexItem
                                            />
                                            <div
                                                className={
                                                    'flex grow flex-col md:flex-row lg:flex-row'
                                                }
                                            >
                                                <div
                                                    className={
                                                        'mr-auto ml-4 border-r-4'
                                                    }
                                                >
                                                    <Typography
                                                        variant="h4"
                                                        mt={1}
                                                    >
                                                        {title}
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {location.address
                                                            ? location.address
                                                            : `${location.longtitude} - ${location.latitude}`}
                                                    </Typography>
                                                </div>
                                                <MemberBox
                                                    members={members}
                                                    user={user}
                                                    className={'lg:min-w-full'}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </ListItem>
                        );
                    }
                )}
            </List>
        </Container>
    );
}

EventListView.propTypes = {
    events: PropTypes.array,
};

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

function DateBox({ dateTime }) {
    const date = new Date(dateTime);
    const dateText = date.getDate() + ' ' + months[date.getMonth()];
    const timeText =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    return (
        <Box className={'child:text-center'}>
            <Typography variant="h6">{timeText}</Typography>
            <Typography variant="body2" className={'text-secondary-100'}>
                {dateText}
            </Typography>
        </Box>
    );
}

DateBox.propTypes = {
    dateTime: PropTypes.number,
};

function MemberBox({ members, user }) {
    return (
        <List
            className={
                'flex flex-row flex-wrap items-center justify-center last:mr-2 child:m-1'
            }
        >
            {members.map((m) => (
                <AvatarPresenter key={m} user={user} userId={m} />
            ))}
        </List>
    );
}

MemberBox.propTypes = {
    members: PropTypes.array,
};
