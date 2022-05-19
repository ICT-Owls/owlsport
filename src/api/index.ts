// API spec compatibility: V0.2.0
import { generateString } from '../helpers/Generators';
import {
    Configuration as CarpoolingApiConfig,
    UserApi,
    EventApi,
    GeoApi,
    GeoData,
    Place,
} from '../api-client';
import { EventCreationParameters, Event } from './types';
import { validate, API_DATATYPES } from './validation';
import { logOut } from 'helpers/Firebase';

const apiConf = new CarpoolingApiConfig({
    // Send request to same origin as the web page
    basePath:
        process.env.BACKEND_MODE === 'local'
            ? 'http://localhost:32203'
            : 'https://carpooling-backend-sy465fjv3q-lz.a.run.app',
});

const eventApi = new EventApi(apiConf);
const userApi = new UserApi(apiConf);
const geoApi = new GeoApi(apiConf);

export async function createEvent(eventInfo: EventCreationParameters) {
    const token = localStorage.getItem('auth');
    const uid = localStorage.getItem('uid');
    if (!token || !uid) return;
    try {
        const newEvent: Event = {
            ...eventInfo,
            id: generateString(16),
            creatorId: uid,
            creationDate: Date.now().valueOf(),
        };

        await eventApi.eventsPost(newEvent, {
            headers: { authorization: `Bearer ${token}` },
        });
    } catch (e) {
        if (typeof e === 'object' && e !== null) handleError(e as Response);
    }
}

export async function getEvents(): Promise<Event[] | null> {
    const token = localStorage.getItem('auth');
    if (!token) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Failed to get events; missing auth token.');
        }
        return null;
    }

    try {
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
                            validation.message
                                ? `: "${validation?.message}"`
                                : '.'
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
    } catch (e) {
        if (typeof e === 'object' && e !== null) handleError(e as Response);
    }
    return [];
}

export async function getUser(id?: string) {
    const token = localStorage.getItem('auth');
    if (!token) return;
    try {
        const user = id
            ? await userApi.userIdGet(id, {
                  headers: { authorization: `Bearer ${token}` },
              })
            : await userApi.userIdGet('', {
                  headers: { authorization: `Bearer ${token}` },
              });
        return user;
    } catch (e) {
        if (typeof e === 'object' && e !== null) handleError(e as Response);
    }
    return null;
}

export async function leaveEvent(eventId: string): Promise<boolean> {
    const token = localStorage.getItem('auth');
    if (!token || !eventId) return false;

    eventApi.eventsIdSelfDelete(eventId, `Bearer ${token}`);
    return true;
}

export async function geocode(query: string): Promise<GeoData | null> {
    const token = localStorage.getItem('auth');
    if (!token || !query) return null;
    try {
        const geoData = await geoApi.geoForwardPlaceGet(query, {
            headers: { authorization: `Bearer ${token}` },
        });

        return geoData;
    } catch (e) {
        if (typeof e === 'object' && e !== null) handleError(e as Response);
    }
    return null;
}

export async function reverseGeocode(
    query: google.maps.LatLng
): Promise<string | null> {
    const token = localStorage.getItem('auth');
    if (!token || !query) return null;

    try {
        const geoData = await geoApi.geoReverseGet(query.lng(), query.lat(), {
            headers: { authorization: `Bearer ${token}` },
        });

        return geoData.address;
    } catch (e) {
        if (typeof e === 'object' && e !== null) handleError(e as Response);
    }
    return null;
}

export async function geoAutocomplete(
    query: string
): Promise<Place[]> {
    const token = localStorage.getItem('auth');
    if (!token || !query) return [];
    const serverResponse = await geoApi.geoAutocompleteGet(query, {
        headers: { authorization: `Bearer ${token}` },
    });

    return serverResponse;
}

type Response = {
    status: number;
};

function handleError(e: Response) {
    if (e.status === 401) {
        logOut();
    }
}
