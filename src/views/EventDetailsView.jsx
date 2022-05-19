import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    Avatar,
    AvatarGroup,
    Card,
    DialogActions,
    Grid as Box,
    IconButton,
    Switch,
} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
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
import MapLocationPresenter from 'presenters/MapLocationPresenter';
import { leaveEvent } from 'api';
export default function EventDetailsView({
    event,
    creator,
    user,
    setCarpooling,
}) {
    const [open, setOpen] = React.useState(true);
    const [isDriver, setIsDriver] = React.useState(false);
    const navigate = useNavigate();

    if (!event || !creator) return null;

    const {
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

    const memberObj = members?.[user.id];

    const requiresCarpooling = memberObj?.requiresCarpooling | false;

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
            maxWidth={'xl'}
        >
            <DialogContent>
                <div className="flex justify-between">
                    <FormControlLabel
                        control={
                            <Switch
                                value={isDriver}
                                onChange={(e) => setIsDriver(e.target.checked)}
                            >
                                Is Driver
                            </Switch>
                        }
                        label={isDriver ? 'Driver sees: ' : 'Non-driver sees: '}
                    />
                    <IconButton
                        onClick={handleClose}
                        sx={{ maxWidth: 'min-content' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
                <div className="flex flex-col justify-around">
                    <div className="flex flex-row items-center justify-between">
                        <div className="h-20 w-20" />
                        <div className="flex flex-col">
                            <h2 className="m-1 text-3xl font-bold">{title}</h2>
                            <div className="flex flex-row items-center">
                                <AvatarView user={creator} />
                                <Typography className="m-2">
                                    Organized by {formatUsername(creator)}
                                </Typography>
                            </div>
                        </div>

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
                                ? DriverView({ members })
                                : CarpoolerView({
                                      driver: user,
                                      seats: 4,
                                      passengers: [user, user],
                                  })}
                            <CarpoolerView
                                driver={user}
                                seats="4"
                                passengers={[user, user]}
                            />
                            <CarpoolerView
                                driver={user}
                                seats="4"
                                passengers={[user, user]}
                            />
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
                />
                <Button onClick={handleLeave}>
                    {creator.id === user.id
                        ? 'DELETE EVENT'
                        : "I don't want to attend this event"}
                </Button>
            </div>
        </Dialog>
    );
}

function DriverView({ members }) {
    const requireCarpooling = members ? Object.values(members).filter(
        (m) => m.requiresCarpooling
    ) : [];
    return requireCarpooling.map((m) => {
        return (
            <DriversCardPresenter
                key={m.id}
                id={m.id}
                address={m.location.address}
            />
        );
    });
}

function CarpoolerView({ driver, seats, passengers }) {
    const free = seats - passengers.length;
    return (
        <div className="m-2 inline-flex justify-start">
            {/* <Card sx={{ minWidth: 150 }}> */}
            <Card>
                <div className="m-2 ml-4 flex flex-col">
                    <div className="mr-2 flex flex-row items-center">
                        <AvatarView user={driver} />

                        <Typography
                            className="ml-2"
                            variant="h6"
                            component="div"
                        >
                            {formatUsername(driver)}
                        </Typography>
                    </div>

                    <div className="flex">
                        <IconButton
                            aria-label="location"
                            className="m-0"
                            size="small"
                        >
                            <LocationOnIcon fontSize="small" />
                            <p>Location</p>
                        </IconButton>
                    </div>

                    <div className=" flex justify-start ">
                        <AvatarGroup max={seats}>
                            {[...Array(free)].map((i) => (
                                <Avatar
                                    key={i}
                                    alt="Free Seat"
                                    src="Logotype.png"
                                />
                            ))}
                            {passengers.map((passenger) => (
                                <AvatarView
                                    key={passenger.id}
                                    user={passenger}
                                />
                            ))}
                        </AvatarGroup>

                        <div className="ml-20 flex">
                            <Button
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
}
