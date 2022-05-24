import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { LatLngLiteral } from 'api/types';
import { User } from 'firebase/auth';
import MapLocationPresenter from 'presenters/MapLocationPresenter';
import React, { FC } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DialogTitleBase from './DialogBase';

type LocationDialogViewProps = {
    user: User;
};

const LocationDialogView: FC<LocationDialogViewProps> = (props) => {
    const query = useSearchParams();
    const nav = useNavigate();

    const location = () => {
        const lng = query[0].get('lng');
        if (!lng) return { lng: 0, lat: 0 };
        const lat = query[0].get('lat');
        if (!lat) return { lng: 0, lat: 0 };
        return { lng: parseFloat(lng), lat: parseFloat(lat) };
    };

    const handleClose = () => {
        nav(-1);
    };

    return (
        <Dialog disablePortal open={true} maxWidth={'lg'} onClose={handleClose}>
            <DialogTitleBase title={'Location'} onClose={handleClose} />
            <DialogContent
                sx={{
                    width: {
                        xs: '100vw',
                        sm: '90vw',
                        md: '80vw',
                        lg: '70vw',
                        xl: '50vw',
                    },
                    height: '70vh',
                }}
            >
                <MapLocationPresenter
                    location={location()}
                    mapContext="showUserLocation"
                />
            </DialogContent>
        </Dialog>
    );
};

export default LocationDialogView;
