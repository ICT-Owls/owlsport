import React, { FC, useEffect, useRef } from 'react';

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = React.useState<google.maps.Marker>();

    React.useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    React.useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};

type MapViewProps = {
    startAt?: {
        lng: number;
        lat: number;
    };
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    markers?: google.maps.LatLng[];
    children?: unknown[];
    pan?: google.maps.LatLng
    setPan?: (lngLat: google.maps.LatLng) => void;
};

const MapView: FC<MapViewProps> = (props: MapViewProps) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = React.useState<google.maps.Map>();

    React.useEffect(() => {
        if (map) {
            ['click', 'idle'].forEach((eventName) =>
                google.maps.event.clearListeners(map, eventName)
            );

            if (props.onClick) {
                map.addListener('click', props.onClick);
            }

            if (props.onIdle) {
                map.addListener('idle', () => props.onIdle?.(map));
            }
        }
    }, [map, props.onClick, props.onIdle]);

    useEffect(() => {
        if (!mapRef.current || map) return;
        setMap(
            new window.google.maps.Map(mapRef.current, {
                center: props.startAt,
                zoom: 15,
            })
        );
    }, [mapRef, map]);

    useEffect(() => {
        if (!mapRef.current || !map || !props.pan) return;
        map.panTo(props.pan);
    }, [props.pan]);

    return (
        <>
            <div
                ref={mapRef}
                className={'relative top-0 z-30 h-full w-full bg-slate-600'}
            ></div>
            {props.markers?.map((latlng, i: number) => (
                <Marker key={i} map={map} position={latlng} />
            ))}
        </>
    );
};
export default MapView;
