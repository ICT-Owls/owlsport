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
};

const LocationFormPresenter: FC<LocationFormPresenterProps> = (
    props: LocationFormPresenterProps
) => {
    const [marker, setMarker] = useState<google.maps.LatLng | null>(null);

    useEffect(() => {
        if (props.value) {
            geocode(props.value.description).then(
                (result: GeoData[] | undefined) => {
                    if (!result) return;
                    const first: GeoData = result[0];
                    setMarker(
                        new google.maps.LatLng({
                            lat: first.latitude,
                            lng: first.longitude,
                        })
                    );
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
