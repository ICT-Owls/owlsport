import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import MapInputPresenter from 'presenters/MapInputPresenter';
import * as React from 'react';

export default function RequiresCarpoolingView({
    requiresCarpooling,
    submit,
    isDriver,
}) {
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useState(null);
    const [seats, setSeats] = React.useState(1);
    const [submitEnabled, setSubmitEnabled] = React.useState(false);

    React.useEffect(() => {
        if (location) setSubmitEnabled(true);
        else setSubmitEnabled(false);
    }, [location]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isDriver ? null : requiresCarpooling ? (
                <Button
                    variant="contained"
                    className="black mb-5 w-52 bg-primary-100 text-background-100"
                    onClick={() => submit(false, undefined, 1)}
                >
                    Cancel carpooling
                </Button>
            ) : (
                <Button
                    variant="contained"
                    className="black w-52 bg-primary-100 text-background-100"
                    onClick={() => setOpen(true)}
                >
                    Request carpooling
                </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Location</DialogTitle>
                <DialogContent sx={{ minHeight: '50vh' }}>
                    <Stack spacing={2}>
                        <DialogContentText>
                            To request carpooling, please enter the location you
                            want to be picked up from, and the number of seats
                            required.
                        </DialogContentText>
                        <TextField
                            type="number"
                            placeholder="Required seats"
                            id="seats"
                            label="Seats"
                            fullWidth
                            value={seats}
                            onChange={(e) => {
                                const num = parseInt(e.target.value);
                                if (num >= 1 && num <= 99) {
                                    setSeats(num);
                                }
                            }}
                        ></TextField>
                        <MapInputPresenter
                            size={{ width: '100%', height: '20rem' }}
                            mapContext="requestCarpooling"
                            onPlace={(location) => {
                                setLocation(location);
                            }}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        disabled={!submitEnabled}
                        onClick={() => {
                            submit(true, location, seats);
                            setOpen(false);
                        }}
                    >
                        Request Carpooling
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
