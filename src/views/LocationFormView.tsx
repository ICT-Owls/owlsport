import React, { FC } from 'react';
import {
    TextField,
    Autocomplete,
    AutocompleteRenderInputParams,
} from '@mui/material';
import MapPresenter from '../presenters/MapPresenter';
import { Place } from '../presenters/LocationFormPresenter';

type LocationFormViewProps = { options: Place[] };

const LocationFormView: FC<LocationFormViewProps> = (
    props: LocationFormViewProps
) => {
    const PlaceTextField = () => {
        return <TextField autoComplete="on country"></TextField>;
    };
    return (
        <>
            <Autocomplete
                options={props.options}
                renderInput={(params: AutocompleteRenderInputParams) => {
                    return <PlaceTextField {...params} />;
                }}
            />
            <MapPresenter />
        </>
    );
};

export default LocationFormView;
