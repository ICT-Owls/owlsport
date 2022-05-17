// API spec compatibility: V0.2.0
import { generateString } from '../helpers/Generators';
import {
    Configuration as CarpoolingApiConfig,
    UserApi,
    EventApi,
    GeoApi,
} from '../api-client';
import { EventCreationParameters, Event } from './types';
import { validate, API_DATATYPES } from './validation';
import accents from 'accents';

const backendApiConfig = new CarpoolingApiConfig({
    // Send request to same origin as the web page
    basePath: 'https://carpooling-backend-sy465fjv3q-lz.a.run.app',
});

const eventApi = new EventApi(backendApiConfig);
const userApi = new UserApi(backendApiConfig);
const geoApi = new GeoApi(backendApiConfig);

export async function createEvent(eventInfo: EventCreationParameters) {
    const token = localStorage.getItem('auth');
    const uid = localStorage.getItem('uid');
    if (!token || !uid) return;

    const newEvent: Event = {
        ...eventInfo,
        id: generateString(16),
        creatorId: uid,
        creationDate: Date.now().valueOf(),
    };

    await eventApi.eventsPost(newEvent, {
        headers: { authorization: `Bearer ${token}` },
    });
}

export async function getEvents(): Promise<Event[] | null> {
    const token = localStorage.getItem('auth');
    if (!token) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to get events; missing auth token.');
        }
        return null;
    }

    const events: Event[] = await eventApi.eventsGet({
        headers: { authorization: `Bearer ${token}` },
    });

    let valid = true;
    events.forEach((event) => {
        const validation = validate(event, API_DATATYPES.Event);
        if (!validation.success) {
            if (process.env.NODE_ENV === 'development') {
                console.warn(
                    `Event failed to validate${
                        validation.message ? `: "${validation?.message}"` : '.'
                    }`
                );
            }
            valid = false;
        }
    });
    if (!valid) {
        return null;
    }

    if (process.env.NODE_ENV === 'development') {
        console.info(`Fetched ${events.length} events`);
    }

    return events;
}

export async function getUser() {
    const token = localStorage.getItem('auth');
    const uid = localStorage.getItem('uid');
    if (!token || !uid) return;

    const user = await userApi.userIdGet(uid, {
        headers: { authorization: `Bearer ${token}` },
    });

    return user;
}

export async function geocode(
    query: string
): Promise<google.maps.LatLng | null> {
    const token = localStorage.getItem('auth');
    if (!token || !query) return null;

    const geoData: { lat: string; lon: string; _: any }[] = await (
        await fetch(
            'http://open.mapquestapi.com/nominatim/v1/search.php?key=***REMOVED***&countrycodes=se&format=json&q=' +
                query
        )
    ).json();

    /*const geoData = await geoApi.geoPlaceGet(accents(query), {
        headers: { authorization: `Bearer ${token}` },
    });*/

    if (geoData && geoData.length > 0 && geoData[0].lat && geoData[0].lon)
        return new google.maps.LatLng({
            lat: Number.parseFloat(geoData[0].lat),
            lng: Number.parseFloat(geoData[0].lon),
        });

    return null;
}
