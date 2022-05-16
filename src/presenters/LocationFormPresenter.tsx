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
    onMarkerChange?: (marker: google.maps.LatLng | null) => void;
};

const LocationFormPresenter: FC<LocationFormPresenterProps> = (
    props: LocationFormPresenterProps
) => {
    const [marker, setMarker] = useState<google.maps.LatLng | null>(null);

    useEffect(() => {
        props.onMarkerChange?.(marker);
    }, [marker]);

    useEffect(() => {
        if (props.value) {
            geocode(props.value.description).then(
                (result: google.maps.LatLng | null) => {
                    if (!result) return;
                    setMarker(result);
                }
            );
        }
    }, [props.value]);

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
