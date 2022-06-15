import React from 'react';
import { Card, Link, Divider, Typography, List, Box } from '@mui/material';
import { formatLocation } from '../helpers/Format';
import AvatarPresenter from '../presenters/AvatarPresenter';
import PropTypes from 'prop-types';

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

const EventListCardView = ({
    id,
    startDateTime,
    endDateTime,
    members,
    title,
    description,
    location,
    user,
}) => {
    return (
        <Link href={'/event/' + id} underline="none" className={'grow'}>
            <Card
                className={
                    'max-h-32 bg-background-100 p-0 last:pb-0 hover:bg-background-200'
                }
                elevation={2}
            >
                <div className={'flex grow flex-row p-0'}>
                    <div
                        className={
                            'flex aspect-square h-32 flex-col items-center justify-center'
                        }
                    >
                        <DateBox dateTime={startDateTime} />
                        <hr className={'m-0 w-1/3'} />
                        <DateBox dateTime={endDateTime} />
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div
                        className={'flex grow flex-col md:flex-row lg:flex-row'}
                    >
                        <div className={'mr-auto ml-4 border-r-4'}>
                            <Typography variant="h5" mt={1}>
                                {title}
                            </Typography>
                            <Typography variant="body1">
                                {formatLocation(location)}
                            </Typography>
                        </div>
                        <MemberBox
                            members={members}
                            user={user}
                            className="lg:min-w-full"
                        />
                    </div>
                </div>
            </Card>
        </Link>
    );
};
export default EventListCardView;

function MemberBox({ members, user }) {
    if (!members) return null;
    return (
        <List
            className={
                'flex flex-row flex-wrap items-center justify-center last:mr-2 child:m-1'
            }
        >
            {Object.values(members || {}).map((m) => (
                <AvatarPresenter key={m} user={m.id} />
            ))}
        </List>
    );
}

MemberBox.propTypes = {
    members: PropTypes.object,
};

function DateBox({ dateTime }) {
    const date = new Date(dateTime);
    const dateText = date.getDate() + ' ' + months[date.getMonth()];
    const timeText =
        (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) +
        ':' +
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    return (
        <Box className="child:text-center">
            <Typography variant="h6">{timeText}</Typography>
            <Typography variant="body2" className="text-secondary-100">
                {dateText}
            </Typography>
        </Box>
    );
}

DateBox.propTypes = {
    dateTime: PropTypes.number,
};
