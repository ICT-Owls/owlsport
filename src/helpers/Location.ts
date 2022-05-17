import throttle from 'lodash/throttle';
import React, { useEffect } from 'react';

const GOOGLE_MAPS_API_KEY = '***REMOVED***';

const kistaCoords = {
    lng: 17.949738982453862,
    lat: 59.4050838849778,
};

const swedenBounds: google.maps.LatLngBoundsLiteral = {
    south: 11.0273686052,
    west: 55.3617373725,
    north: 23.9033785336,
    east: 69.1062472602,
};

export type GooglePlace = {
    description: string;
    main_text: string;
    secondary_text?: string;
};

function loadScript(src: string, position: HTMLElement | null, id: string) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

export function GoogleMapsLoader() {
    const loaded = React.useRef(false);

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
                document.querySelector('head'),
                'google-maps'
            );
        }
        loaded.current = true;
    }

    return null;
}

export function usePlaceCompletion() {
    const fetch = React.useMemo(
        () =>
            throttle(
                (
                    request: { input: string },
                    callback: (results?: readonly PlaceType[]) => void
                ) => {
                    (autocompleteService.current as any).getPlacePredictions(
                        { ...request, bounds: swedenBounds, componentRestrictions:{country: 'se'} },
                        callback
                    );
                },
                200
            ),
        []
    );

    useEffect(() => {
        if (!autocompleteService.current && (window as any).google) {
            autocompleteService.current = new (
                window as any
            ).google.maps.places.AutocompleteService();
        }
    }, [fetch]);

    return fetch;
}

// Place predict API types
export type MainTextMatchedSubstrings = {
    offset: number;
    length: number;
};
export type StructuredFormatting = {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
};
export type PlaceType = {
    description: string;
    structured_formatting: StructuredFormatting;
};

const autocompleteService = { current: null };
