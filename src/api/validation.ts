// API spec compatibility: V0.2.0

import type { Event } from './types';

type ApiType = 'Event' | 'User' | 'EventCreateData';

export const API_DATATYPES = {
    Event: <ApiType>'Event',
    User: <ApiType>'User',
    EventCreateData: <ApiType>'EventCreateData',
};

export type ValidationResult = {
    success: boolean;
    message?: string;
};

// Returns a message describing a type error
function msgType(property: string, got: string, expected: string): string {
    return `property "${property}" is of type "${got}", expected "${expected}"`;
}

// Test if property of object is expected type. Returns null on success
function validateType(
    object: any,
    property: string,
    expected: string
): ValidationResult | null {
    if (property in object && !(typeof object[property] === expected))
        return {
            success: false,
            message: msgType(property, typeof object[property], expected),
        };
    return null;
}

// Validate that an object is valid based on it's type
export function validate(data: object, type: ApiType): ValidationResult {
    // The properties and types of event objects
    const eventProperties: { [property: string]: string } = {
        id: 'string',
        endDateTime: 'number',
        creationData: 'number',
        creatorId: 'string',
        startDateTime: 'number',
        creationDate: 'number',
        title: 'string',
    };
    let dataCast = undefined; // the object, but cast
    try {
        switch (type) {
            case API_DATATYPES.Event:
                dataCast = data as Event;
                if (dataCast.id.length < 2)
                    return {
                        success: false,
                        message: `property "id" too short ${dataCast.id}`,
                    };
                if (dataCast.id.length > 99)
                    return {
                        success: false,
                        message: 'property "id" too long',
                    };
                if (
                    dataCast.location.address !== undefined &&
                    typeof dataCast.location.address !== 'string'
                )
                    return {
                        success: false,
                        message: msgType(
                            'location.address',
                            typeof dataCast.location.address,
                            'string | undefined'
                        ),
                    };
                if (!(typeof dataCast.location.latitude === 'number'))
                    return {
                        success: false,
                        message: msgType(
                            'location.latitude',
                            typeof dataCast.location.address,
                            'number'
                        ),
                    };
                if (!(typeof dataCast.location.longitude === 'number'))
                    return {
                        success: false,
                        message: msgType(
                            'location.longitude',
                            typeof dataCast.location.address,
                            'number'
                        ),
                    };
                for (const p in eventProperties) {
                    const validation = validateType(
                        data,
                        p,
                        eventProperties[p]
                    );
                    if (validation != null) return validation;
                }
                return { success: true };
        }
    } catch (error) {
        return {
            success: false,
            message: `${(error as Error)['name']} occurred: "${
                (error as Error).message
            }"`,
        };
    }
    return {
        success: false,
        message: `Type ${type} has no validation function!`,
    };
}
