import React, { FC, useState } from 'react';
import LocationFormView from '../views/LocationFormView';

export type Place = {
    name: string;
};

type LocationFormPresenterProps = object;

const LocationFormPresenter: FC = (props: LocationFormPresenterProps) => {

    return <LocationFormView />;
};

export default LocationFormPresenter;
