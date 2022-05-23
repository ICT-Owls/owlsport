import React, { FC, useEffect, useRef } from 'react';

export type Marker = {
    latLng: google.maps.LatLngLiteral;
    icon?: string | google.maps.Icon | google.maps.Symbol;
};

const MarkerView: React.FC<google.maps.MarkerOptions> = (options) => {
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
    markers?: Marker[];
    children?: unknown[];
    pan?: google.maps.LatLngLiteral;
    setPan?: (lngLat: google.maps.LatLngLiteral) => void;
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

    useEffect(() => {
        if (props.markers) {
            props.markers.forEach(({ latLng: { lat, lng }, icon }) => {
                console.assert(typeof lat === 'number' && typeof lng === 'number', 'Marker has invalid latLng');
            });
        }
    }, [props.markers]);

    return (
        <>
            <div
                ref={mapRef}
                className={'relative top-0 z-30 h-full w-full bg-slate-600'}
            />
            {props.markers?.map((m, i: number) => (
                <MarkerView
                    key={i}
                    map={map}
                    position={m.latLng}
                    icon={m.icon}
                />
            ))}
        </>
    );
};
export default MapView;
