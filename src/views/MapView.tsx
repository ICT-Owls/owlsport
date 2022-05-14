import React, { FC, RefObject, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: '***REMOVED***',
    version: 'weekly',
    libraries: ['places'],
});

const mapOptions = {
    center: {
        lng: 17.949738982453862,
        lat: 59.4050838849778,
    },
    zoom: 15,
};

type MapViewProps = {
    startAt?: {
        lng: number;
        lat: number;
    };
};

const MapView: FC<MapViewProps> = (props: MapViewProps) => {
    const mapRef: RefObject<HTMLDivElement> = React.createRef();

    useEffect(() => {
        const mapDiv = mapRef.current;
        if (mapDiv) {
            loader
                .load()
                .then((google) => {
                    new google.maps.Map(mapDiv, mapOptions);
                })
                .catch((e) => {
                    // do something
                });
        }
    });
    return <div ref={mapRef} className={'h-full w-full bg-slate-600'}></div>;
};
export default MapView;
