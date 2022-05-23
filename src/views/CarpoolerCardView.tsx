import React, { FC } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Typography,
    IconButton,
    AvatarGroup,
    Avatar,
    Button,
} from '@mui/material';
import Card from '@mui/material/Card';
import { Car, EventMember, Id, User, Location } from '../api/types';
import { formatUsername } from 'helpers/Format';
import AvatarView from './AvatarView';

type CarpoolerCardViewProps = {
    driver: EventMember,
    members: { [key: string]: EventMember };
    users: { [key: string]: User };
};

const CarpoolerCardView: FC<CarpoolerCardViewProps> = (props) => {
    if (!props.driver.car || !props.driver.passengers || !props.driver.location) return null;

    const { model, registration, seats } = props.driver.car;
    const passengerUsers: { [key: string]: EventMember } = {};
    for (const passengerId of props.driver.passengers || []) {
        passengerUsers[passengerId] = props.members[passengerId];
    }
    const free =
        seats -
        Object.values(passengerUsers).reduce(
            (sum, p) => (p.seats || 1) + sum,
            0
        );

    let it = 0;

    return (
        <div key={props.driver.id} className="m-2 inline-flex justify-start">
            {/* <Card sx={{ minWidth: 150 }}> */}
            <Card>
                <div className="m-2 ml-4 flex flex-col">
                    <div className="mr-2 flex flex-row items-center">
                        <AvatarView user={props.users[props.driver.id]} />

                        <Typography
                            className="ml-2"
                            variant="h6"
                            component="div"
                        >
                            {formatUsername(props.users[props.driver.id])}
                        </Typography>
                    </div>

                    <div className="flex">
                        <IconButton
                            aria-label="location"
                            className="m-0"
                            size="small"
                        >
                            <LocationOnIcon fontSize="small" />
                            <p>{props.driver.location.address}</p>
                        </IconButton>
                    </div>

                    <div className="flex justify-start ">
                        <AvatarGroup max={seats}>
                            {Array(free)
                                .fill(0)
                                .map((i) => {
                                    console.log('x');
                                    return (
                                        <Avatar
                                            key={it++}
                                            alt="Free Seat"
                                            src="avatar.png"
                                        />
                                    );
                                })}
                            {Object.values(passengerUsers).flatMap(
                                (passenger: EventMember) =>
                                    Array(passenger.seats)
                                        .fill(0)
                                        .map((_) => (
                                            <AvatarView
                                                key={`passenger.id${it++}`}
                                                user={props.users[passenger.id]}
                                            />
                                        ))
                            )}
                        </AvatarGroup>

                        <div className="ml-20 flex">
                            <Button
                                disabled={true}
                                variant="contained"
                                className="border-primary rounded border bg-primary-100 transition duration-500"
                            >
                                JOIN
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CarpoolerCardView;
