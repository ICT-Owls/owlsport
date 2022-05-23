import React, { FC } from 'react';
import { Status as MapStatus } from '@googlemaps/react-wrapper';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import MapView, { Marker } from '../views/MapView';
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
    const [marker, setMarker] = React.useState<Marker>({ latLng: kistaCoords });
    const [textInput, setTextInput] = React.useState<string>();
    const [value, setValue] = React.useState<GooglePlace | null>();
    const [pan, setPan] = React.useState<google.maps.LatLngLiteral>(
        marker.latLng
    );

    React.useEffect(() => {
        if (!marker) return;
        setPan(marker.latLng);
        if (!value?.description || !props.onPlace) return;

        props.onPlace({
            address: value?.description,
            longitude: marker.latLng.lng,
            latitude: marker.latLng.lat,
        });
    }, [marker, value?.description]);

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
                    <div className={'h-full w-full '}>
                        <div className="z-40">
                            <LocationFormPresenter
                                textInput={textInput}
                                setTextInput={setTextInput}
                                value={value}
                                setValue={setValue}
                                onMarkerChange={(
                                    newMarker: google.maps.LatLngLiteral | null
                                ) => {
                                    if (newMarker)
                                        setMarker({ latLng: newMarker });
                                }}
                                onAddressChange={(
                                    newAddress: string | null
                                ) => {
                                    if (newAddress)
                                        setValue({
                                            description: newAddress,
                                            main_text: 'reverse geocoding',
                                            secondary_text: '',
                                        });
                                }}
                            />
                        </div>
                        <MapView
                            startAt={kistaCoords}
                            markers={marker ? [marker] : []}
                            onClick={(e: google.maps.MapMouseEvent) => {
                                if (e.latLng) {
                                    setMarker({ latLng: e.latLng.toJSON() });
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
