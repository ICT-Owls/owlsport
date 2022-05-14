import React, { FC } from 'react';
import MapView from '../views/MapView';

type MapPresenterProps = object;

const MapPresenter: FC<MapPresenterProps> = (props: MapPresenterProps) => {
    return MapView({ startAt: { lat: 0, lng: 0 } });
};

export default MapPresenter;
