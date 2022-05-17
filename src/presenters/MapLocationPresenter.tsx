import React, { FC } from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import {
    Alert,
    CircularProgress,
    Snackbar,
} from '@mui/material';
import MapView from '../views/MapView';

type MapLocationPresenterProps = {
    location: { lng: number; lat: number };
};

const apiKey = '***REMOVED***';

const MapLocationPresenter: FC<MapLocationPresenterProps> = (
    props: MapLocationPresenterProps
) => {
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
                        <MapView
                            startAt={props.location}
                            markers={[new google.maps.LatLng(props.location)]}
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

export default MapLocationPresenter;
