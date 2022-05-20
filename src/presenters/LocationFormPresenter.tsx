import { GooglePlace } from 'helpers/Location';
import React, { FC, useEffect, useState } from 'react';
import LocationFormView from '../views/LocationFormView';
import { geocode } from '../api/index';
import { GeoData } from 'api/types';

export type Place = {
    name: string;
};

type LocationFormPresenterProps = {
    value?: GooglePlace | null;
    setValue?: (newValue: GooglePlace | null) => void;
    textInput?: string;
    setTextInput?: (newValue: string) => void;
    onMarkerChange?: (marker: google.maps.LatLngLiteral | null) => void;
    onAddressChange?: (address: string | null) => void;
};

const LocationFormPresenter: FC<LocationFormPresenterProps> = (
    props: LocationFormPresenterProps
) => {
    const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(
        null
    );

    useEffect(() => {
        props.onMarkerChange?.(marker);
    }, [marker]);

    useEffect(() => {
        if (!props.value) return;
        props.onAddressChange?.(props.value?.description);

        // If value is defined and the new value was not attained through reverse geocoding
        if (props.value.main_text !== 'reverse geocoding') {
            geocode(props.value.description).then((result: GeoData | null) => {
                if (!result) return;
                setMarker({ lat: result.latitude, lng: result.longitude });
            });
        }
    }, [props.value?.description]);

    return (
        <LocationFormView
            value={props.value}
            setValue={props.setValue}
            textInput={props.textInput}
            setTextInput={props.setTextInput}
        />
    );
};

export default LocationFormPresenter;
