import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Avatar, AvatarGroup, Card, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import {
    formatDateMonthDay,
    formatFullDate,
    formatLocation,
    formatUsername,
} from '../helpers/Format';
import AvatarView from './AvatarView';

export default function EventDetailsView({ event, creator, user }) {
    const [open, setOpen] = React.useState(true);

    if (!event || !creator) return null;

    const {
        title,
        description,
        location,
        members,
        startDateTime,
        endDateTime,
    } = event;

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            disablePortal
            open={open}
            onClose={handleClose}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth={'lg'}
            fullWidth={true}
        >
            <DialogContent>
                <div className="flex flex-col justify-around">
                    <div className="flex flex-row items-center justify-between">
                        {/*TOP BAR*/}
                        <div className="flex flex-col">
                            <h2 className="m-1 text-3xl font-bold">{title}</h2>
                            <div className="flex flex-row items-center">
                                <AvatarView user={creator} />
                                <Typography className="m-2">
                                    Organized by {formatUsername(creator)}
                                </Typography>
                            </div>
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                className="black mb-5 w-52 bg-primary-100 text-background-100"
                            >
                                Request ride
                            </Button>
                        </div>

                        <div className="flex items-center justify-center">
                            <Box className="m-2 flex aspect-square h-16 w-16 items-center justify-center rounded-lg bg-primary-100 p-3 text-background-100">
                                <p className="text-xl font-bold">
                                    {formatDateMonthDay(startDate)}
                                </p>
                            </Box>
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

                    <div className="my-3 flex flex-row justify-around bg-gray-300 py-3">
                        <div>Description</div>
                        <div>Carpooling</div>
                        <div>Events</div>
                    </div>
                    <div className="h-max-48 h-48 overflow-y-scroll">
                        <List className="flex flex-row flex-wrap justify-center">
                            {CarpoolerView({
                                driver: user,
                                seats: 4,
                                passengers: [user, user],
                            })}
                        </List>
                    </div>
                    <Divider variant="middle" />

                    <div className="my-2 h-fit w-full text-center text-sm">
                        <h3 className="m-2">Description</h3>
                        {description}
                    </div>
                    <Divider variant="middle" />

                    <div> Map goes here </div>
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Save and exit</Button>
            </DialogActions>
        </Dialog>
    );
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
