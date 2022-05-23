import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
} from '@mui/material';
import MapInputPresenter from 'presenters/MapInputPresenter';
import * as React from 'react';
import AvatarView from './AvatarView';

export default function RegisterCarpoolingView({
    isDriver,
    user,
    submit,
    requiresCarpooling,
}) {
    const [open, setOpen] = React.useState(false);
    const [model, setModel] = React.useState('');
    const [registration, setRegistration] = React.useState('');
    const [location, setLocation] = React.useState(undefined);
    const [seats, setSeats] = React.useState(1);

    const submitEnabled = () => {
        return model.length > 0 && registration.length > 0;
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isDriver ? (
                <Button
                    variant="contained"
                    className="black mb-5 ml-4 w-52 bg-primary-100 text-background-100"
                    onClick={() => submit(false, undefined, 1)}
                >
                    Unregister Car
                </Button>
            ) : requiresCarpooling ? null : (
                <Button
                    variant="contained"
                    className="black mb-5 ml-4 w-52 bg-primary-100 text-background-100"
                    onClick={() => setOpen(true)}
                >
                    Register Car
                </Button>
            )}

            <Dialog disablePortal open={open} onClose={handleClose}>
                <DialogTitle>Car Registration</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To register a car, please enter the model, registration,
                        and number of available seats.
                    </DialogContentText>

                    <div className=" flex h-auto w-auto flex-col justify-center rounded-lg bg-gray-100 p-4 sm:p-12">
                        <div className="mb-6">
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Car Model"
                                variant="outlined"
                                value={model}
                                onChange={(e) => {
                                    setModel(e.target.value);
                                }}
                            />
                        </div>
                        <div className="">
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="Plate number"
                                variant="outlined"
                                value={registration}
                                onChange={(e) =>
                                    setRegistration(e.target.value)
                                }
                            />
                        </div>

                        {/* Updown car seats selection */}
                        <div className="p-6">
                            <Typography className="">
                                Number of seats
                            </Typography>
                            <div className="mb-6">
                                <Button
                                    disabled={seats <= 1}
                                    onClick={() => {
                                        if (seats > 1) setSeats(seats - 1);
                                    }}
                                >
                                    <RemoveIcon />
                                </Button>
                                <h3 className="inline justify-items-center">
                                    {seats}
                                </h3>
                                <Button
                                    disabled={seats >= 99}
                                    onClick={() => {
                                        if (seats < 99) setSeats(seats + 1);
                                    }}
                                >
                                    <AddIcon />
                                </Button>
                            </div>
                        </div>
                        <MapInputPresenter onPlace={setLocation} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        disabled={!submitEnabled()}
                        onClick={() => {
                            submit(model, registration, seats, location);
                            setOpen(false);
                        }}
                    >
                        Register Car
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
