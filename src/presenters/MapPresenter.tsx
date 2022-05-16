import React, { FC } from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import MapView from '../views/MapView';
import LocationFormPresenter from './LocationFormPresenter';

type MapPresenterProps = object;

const kistaCoords = {
    lng: 17.949738982453862,
    lat: 59.4050838849778,
};

const apiKey = '***REMOVED***';

const MapPresenter: FC<MapPresenterProps> = (props: MapPresenterProps) => {
    const [marker, setMarker] = React.useState<google.maps.LatLng>(
        new google.maps.LatLng(kistaCoords)
    );

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
                    <div className={'relative h-full w-full '}>
                        <div className="absolute left-48 top-2 z-40">
                            <LocationFormPresenter />
                        </div>
                        <MapView
                            startAt={kistaCoords}
                            markers={marker ? [marker] : []}
                            onClick={(e: google.maps.MapMouseEvent) => {
                                setMarker(e.latLng!);
                            }}
                        />
                    </div>
                );
        }
    };

    return (
        <MapWrapper
            id="google-maps"
            libraries={['places']}
            apiKey={apiKey}
            render={render}
        />
    );
};

export default MapPresenter;
