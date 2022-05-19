import React, { FC } from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import MapView from '../views/MapView';
import LocationFormPresenter from './LocationFormPresenter';
import { GooglePlace } from 'helpers/Location';
import { reverseGeocode } from 'api';
import { useMapStatus } from 'models/Model';

type MapInputPresenterProps = {
    onPlace?: (location: {
        address: string;
        longitude: number;
        latitude: number;
    }) => void;
};

const kistaCoords = {
    lng: 17.949738982453862,
    lat: 59.4050838849778,
};

const MapInputPresenter: FC<MapInputPresenterProps> = (
    props: MapInputPresenterProps
) => {
    const [mapStatus] = useMapStatus();
    const [marker, setMarker] = React.useState<google.maps.LatLng>(
        new google.maps.LatLng(kistaCoords)
    );
    const [textInput, setTextInput] = React.useState<string>();
    const [value, setValue] = React.useState<GooglePlace | null>();
    const [pan, setPan] = React.useState<google.maps.LatLng>(marker);

    React.useEffect(() => {
        if (!marker || !value?.description || !props.onPlace) return;

        setPan(marker);

        props.onPlace({
            address: value?.description,
            longitude: marker.lng(),
            latitude: marker.lat(),
        });
    }, [marker]);

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
                        <div className="absolute left-48 top-2 z-40">
                            <LocationFormPresenter
                                textInput={textInput}
                                setTextInput={setTextInput}
                                value={value}
                                setValue={setValue}
                                onMarkerChange={(
                                    newMarker: google.maps.LatLng | null
                                ) => {
                                    if (newMarker) setMarker(newMarker);
                                }}
                            />
                        </div>
                        <MapView
                            startAt={kistaCoords}
                            markers={marker ? [marker] : []}
                            onClick={(e: google.maps.MapMouseEvent) => {
                                if (e.latLng) {
                                    setMarker(e.latLng);
                                    reverseGeocode(e.latLng).then(
                                        (addr: string | null) => {
                                            if (addr)
                                                setValue({
                                                    main_text:
                                                        'reverse geocoding',
                                                    description: addr,
                                                    ...e.latLng,
                                                });
                                        }
                                    );
                                }
                            }}
                            pan={pan}
                            setPan={setPan}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return render();
};

export default MapInputPresenter;
