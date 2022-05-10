import { generateString } from '../helpers/Generators';
import {
    Configuration as CarpoolingApiConfig,
    UserApi,
    EventApi,
    Event as EventData,
} from '../api-client';
import { EventCreateData } from './types';

const backendApiConfig = new CarpoolingApiConfig({
    // Send request to same origin as the web page
    basePath: 'https://carpooling-backend-sy465fjv3q-lz.a.run.app',
});

const eventApi = new EventApi(backendApiConfig);

export async function createEvent(eventInfo: EventCreateData) {
    const token = localStorage.getItem('auth');
    const uid = localStorage.getItem('uid');
    if (!token || !uid) return;

    const newEvent: EventData = {
        ...eventInfo,
        id: generateString(16),
        creatorId: uid,
        creationDate: Date.now().valueOf(),
    };

    await eventApi.eventsPost(newEvent, {
        headers: { authorization: `Bearer ${token}` },
    });
}
