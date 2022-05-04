import {
    Card,
    Container,
    Divider,
    Link,
    List,
    ListItem,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import React from 'react';
import AvatarView from './AvatarView';

export default function EventListView(props) {
    //These views only handle UI. They should not handle any logic outside of ui (They can handle logic specific to some ui element, if necessary)
    return (
        <Container>
            <Typography variant="h2">Events</Typography>
            <List className={'overflow-hidden'}>
                {props.events.map((e) => {
                    return (
                        <ListItem key={e.id}>
                            <Link
                                to={'/events/' + e.id}
                                underline="none"
                                className={'grow'}
                            >
                                <Card
                                    className={
                                        'p-0 last:pb-0 max-h-32 bg-background-100 hover:bg-background-200'
                                    }
                                >
                                    <div className={'flex flex-row grow p-0'}>
                                        <div
                                            className={
                                                'aspect-square flex flex-col justify-center items-center h-32'
                                            }
                                        >
                                            <DateBox
                                                dateTime={e.startDateTime}
                                            />
                                            <hr className={'m-0 w-1/3'} />
                                            <DateBox dateTime={e.endDateTime} />
                                        </div>
                                        <Divider
                                            orientation="vertical"
                                            flexItem
                                        />
                                        <div
                                            className={
                                                'flex flex-col grow md:flex-row lg:flex-row'
                                            }
                                        >
                                            <div
                                                className={
                                                    'mr-auto ml-4 border-r-4'
                                                }
                                            >
                                                <Typography variant="h4" mt={1}>
                                                    {e.title}
                                                </Typography>
                                                <Typography variant="body1">
                                                    Location Here
                                                </Typography>
                                            </div>
                                            <MemberBox
                                                members={e.members}
                                                className={'lg:min-w-full'}
                                            />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
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

function DateBox(props) {
    const date = new Date(props.dateTime);
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

function MemberBox(props) {
    const members = props.members;
    return (
        <List
            className={
                'flex flex-row flex-wrap justify-center items-center child:m-1 last:mr-2'
            }
        >
            {members.map((m) => (
                <AvatarView key={m.id} user={m} />
            ))}
        </List>
    );
}

MemberBox.propTypes = {
    members: PropTypes.array,
};
