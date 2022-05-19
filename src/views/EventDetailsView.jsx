import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, AvatarGroup, Card, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { leaveEvent } from 'api';
import MapLocationPresenter from 'presenters/MapLocationPresenter';
import RegisterCarpoolingPresenter from 'presenters/RegisterCarpoolingPresenter';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    formatDateMonthDay,
    formatFullDate,
    formatLocation,
    formatUsername,
} from '../helpers/Format';
import DriversCardPresenter from '../presenters/DriversCardPresenter';
import RequiresCarpoolingPresenter from '../presenters/RequiresCarpoolingPresenter';
import AvatarView from './AvatarView';
export default function EventDetailsView({
    event,
    users,
    user,
    setCarpooling,
    pickup,
    registerCar,
}) {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate();

    if (event === undefined || users === undefined) return null;

    const {
        creatorId,
        title,
        description,
        location,
        members,
        startDateTime,
        endDateTime,
        id,
    } = event;

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    const userObj = members[user.id];

    const { requiresCarpooling, isDriver, isPassenger } = userObj;

    const handleClose = () => {
        setOpen(false);
        navigate('/events', { replace: true });
    };

    const handleLeave = () => {
        leaveEvent(id);
        handleClose();
    };

    return (
        <Dialog
            className="mt-20"
            disablePortal
            open={open}
            onClose={handleClose}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            fullWidth
            maxWidth={'xl'}
        >
            <DialogContent>
                <div className="flex flex-col justify-around">
                    <div className="flex flex-row items-center justify-between">
                        <div className="h-20 w-20" />
                        <div className="flex flex-col">
                            <h2 className="m-1 text-3xl font-bold">{title}</h2>
                            <div className="flex flex-row items-center">
                                <AvatarView user={users[creatorId]} />
                                <Typography className="m-2">
                                    Organized by{' '}
                                    {formatUsername(users[creatorId])}
                                </Typography>
                            </div>
                        </div>

                        {/*<div>*/}
                        {/*    <Button*/}
                        {/*        variant="contained"*/}
                        {/*        className="black mb-5 w-52 bg-primary-100 text-background-100"*/}
                        {/*    >*/}
                        {/*        Request ride*/}
                        {/*    </Button>*/}
                        {/*</div>*/}

                        <div className=" m-2  flex aspect-square h-8 w-8 items-center  justify-center rounded-lg bg-primary-100 p-3 text-background-100">
                            <p className="text-l">
                                {formatDateMonthDay(startDate)}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex flex-col items-center justify-center">
                        <Typography className="flex items-center">
                            <CalendarMonthIcon className="m-2" />
                            {formatFullDate(startDate)} until{' '}
                            {formatFullDate(endDate)}
                        </Typography>
                        <Typography className="flex items-center">
                            <LocationOnIcon className="m-2" />
                            {formatLocation(location)}
                        </Typography>
                    </div>
                    <Divider variant="fullWidth" />
                    <div className="h-56 overflow-y-scroll">
                        <List className="flex flex-row flex-wrap justify-center">
                            {isDriver
                                ? DriverView({ members, pickup })
                                : CarpoolerView({ members, users })}
                        </List>
                    </div>
                    <Divider variant="fullWidth" />
                    <div className="my-2 h-fit w-full text-center text-sm">
                        <h3 className="m-2">Map</h3>
                        {description}
                    </div>
                    <Divider variant="middle" />
                    <div className="flex h-fit w-full flex-row justify-center">
                        <div className="m-0 h-[40rem] w-full">
                            <MapLocationPresenter
                                location={{
                                    lng: event.location.longitude,
                                    lat: event.location.latitude,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <Divider />
            <div className="flex justify-between p-2">
                <RequiresCarpoolingPresenter
                    requiresCarpooling={requiresCarpooling}
                    setCarpooling={setCarpooling}
                    isDriver={isDriver}
                />
                <RegisterCarpoolingPresenter
                    isDriver={isDriver}
                    registerCar={registerCar}
                    requiresCarpooling={requiresCarpooling}
                />
                <Button onClick={handleLeave}>
                    {creatorId === user.id
                        ? 'DELETE EVENT'
                        : "I don't want to attend this event"}
                </Button>
            </div>
        </Dialog>
    );
}

function DriverView({ members, pickup }) {
    const requireCarpooling = Object.values(members).filter(
        (m) => m.requiresCarpooling && !m.isDriver && !m.isPassenger
    );
    return requireCarpooling.map((m) => {
        return (
            <DriversCardPresenter
                key={m.id}
                id={m.id}
                address={m.location.address}
                seats={m.seats}
                pickup={pickup}
            />
        );
    });
}

function CarpoolerView({ members, users }) {
    const drivers = Object.values(members).filter((m) => m.isDriver);
    return drivers.map((d) => {
        const { car, id, location, passengers } = d;
        const { model, registration, seats } = car;
        const passengerUsers = {};
        for (let passengerId of passengers || []) {
            passengerUsers[passengerId] = members[passengerId];
        }
        const free =
            seats -
            Object.values(passengerUsers).reduce((sum, p) => p.seats + sum, 0);

        let it = 0;

        return (
            <div key={d.id} className="m-2 inline-flex justify-start">
                {/* <Card sx={{ minWidth: 150 }}> */}
                <Card>
                    <div className="m-2 ml-4 flex flex-col">
                        <div className="mr-2 flex flex-row items-center">
                            <AvatarView user={users[id]} />

                            <Typography
                                className="ml-2"
                                variant="h6"
                                component="div"
                            >
                                {formatUsername(users[id])}
                            </Typography>
                        </div>

                        <div className="flex">
                            <IconButton
                                aria-label="location"
                                className="m-0"
                                size="small"
                            >
                                <LocationOnIcon fontSize="small" />
                                <p>{location.address}</p>
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
                                    (passenger) =>
                                        Array(passenger.seats)
                                            .fill(0)
                                            .map((_) => (
                                                <AvatarView
                                                    key={`passenger.id${it++}`}
                                                    user={users[passenger.id]}
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
    });
}
