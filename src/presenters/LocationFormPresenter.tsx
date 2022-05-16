import { GooglePlace } from 'helpers/Location';
import React, { FC, useState } from 'react';
import LocationFormView from '../views/LocationFormView';

export type Place = {
    name: string;
};

type LocationFormPresenterProps = {
    value?: GooglePlace | null;
    setValue?: (newValue: GooglePlace | null) => void;
    textInput?: string;
    setTextInput?: (newValue: string) => void;
};

const LocationFormPresenter: FC<LocationFormPresenterProps> = (props: LocationFormPresenterProps) => {
    
    return <LocationFormView value={props.value} setValue={props.setValue} textInput={props.textInput} setTextInput={props.setTextInput} />;
};

export default LocationFormPresenter;
