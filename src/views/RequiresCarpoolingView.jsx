import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
} from '@mui/material';
import MapInputPresenter from 'presenters/MapInputPresenter';
import * as React from 'react';

export default function RequiresCarpoolingView({ requiresCarpooling, submit }) {
    const [open, setOpen] = React.useState(false);
    const [location, setLocation] = React.useState(null);
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
            {requiresCarpooling ? (
                <Button
                    variant="contained"
                    className="black mb-5 w-52 bg-primary-100 text-background-100"
                    onClick={() => submit(false, undefined)}
                >
                    Cancel carpooling
                </Button>
            ) : (
                <Button
                    variant="contained"
                    className="black mb-5 w-52 bg-primary-100 text-background-100"
                    onClick={() => setOpen(true)}
                >
                    Request carpooling
                </Button>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Location</DialogTitle>
                <DialogContent sx={{ minHeight: '50vh' }}>
                    <DialogContentText>
                        To request carpooling, please enter the location you
                        want to be picked up from.
                    </DialogContentText>
                    {/*<TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Location"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            if (e.target.value?.length > 0)
                                setSubmitEnabled(true);
                            else setSubmitEnabled(false);
                            setAddress(e.target.value);
                        }}
                    />*/}
                    <div className="h-full w-full">
                        <MapInputPresenter
                            onPlace={(location) => {
                                setLocation(location);
                            }}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button
                        disabled={!submitEnabled}
                        onClick={() => {
                            submit(true, location);
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
