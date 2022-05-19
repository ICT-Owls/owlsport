import React, { FC } from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import MapView from '../views/MapView';
import { useMapStatus } from 'models/Model';

type MapLocationPresenterProps = {
    location: { lng: number; lat: number };
};

const MapLocationPresenter: FC<MapLocationPresenterProps> = (
    props: MapLocationPresenterProps
) => {
    const [mapStatus] = useMapStatus();
    const render = () => {
        switch (mapStatus) {
            case MapStatus.LOADING:
                return <CircularProgress />;
            case MapStatus.FAILURE:
                return (
                    <Snackbar>
                        <Alert severity="warning">Map failed to load</Alert>
                    </Snackbar>
                );
            case MapStatus.SUCCESS:
                return (
                    <div className={'relative h-full w-full '}>
                        <MapView
                            startAt={props.location}
                            markers={[new google.maps.LatLng(props.location)]}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return render();
};

export default MapLocationPresenter;
