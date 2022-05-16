import React, { FC } from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import MapView from '../views/MapView';

type MapPresenterProps = object;

const kistaCoords = {
    lng: 17.949738982453862,
    lat: 59.4050838849778,
};

const apiKey = '***REMOVED***';

const MapPresenter: FC<MapPresenterProps> = (props: MapPresenterProps) => {
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

    const render = (status: MapStatus) => {
        switch (status) {
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
                    <MapView
                        startAt={kistaCoords}
                        markers={clicks}
                        onClick={(e: google.maps.MapMouseEvent) => {
                            setClicks([...clicks, e.latLng!]);
                        }}
                    />
                );
        }
    };

    return (
        <MapWrapper id='google-maps' libraries={['places']} apiKey={apiKey} render={render}/>
    );
};

export default MapPresenter;
