import throttle from 'lodash/throttle';
import React from 'react';
import {
    Wrapper as MapWrapper,
    Status as MapStatus,
} from '@googlemaps/react-wrapper';
import { useMapStatus } from 'models/Model';
import { geoAutocomplete } from 'api';
import { Place } from 'api-client';

export type GooglePlace = {
    description: string;
    main_text: string;
    secondary_text?: string;
};

const BROWSER_API_KEY = process.env.GOOGLE_API_BROWSER_KEY;

/* Some funky legacy code for loading scripts
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
*/

export function GoogleMapsLoader(props: {
    children: any[];
    onStatusChange?: (status: keyof typeof MapStatus) => void;
}) {
    const [, setStatus] = useMapStatus();
    return MapWrapper({
        children: props.children,
        apiKey: BROWSER_API_KEY,
        callback: (status: keyof typeof MapStatus) => {
            setStatus(status);
        },
    });
}

export function usePlaceCompletion() {
    const fetch = React.useMemo(
        () =>
            throttle(
                (
                    query: string,
                    callback: (results?: readonly Place[]) => void
                ) => {
                    geoAutocomplete(query).then(callback);
                },
                200
            ),
        []
    );
    return fetch;
}
