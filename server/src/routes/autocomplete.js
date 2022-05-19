import { gmapClient, gmapKey } from '../utils';
import { throttle } from 'lodash';

import express from 'express';

const kistaCoords = {
    lng: 17.949738982453862,
    lat: 59.4050838849778,
};

const swedenBounds = {
    south: 11.0273686052,
    west: 55.3617373725,
    north: 23.9033785336,
    east: 69.1062472602,
};

const acConf = {
    bounds: swedenBounds,
    components: ['country:se'],
};

// TODO: use axios instances
const autocomplete = async (req, res) => {
    const q = req.query['q']?.toString();
    if (!q) {
        console.error('Invalid input was not caught by express-validate!');
        return res.status(400).send('No input provided');
    }
    const acReq = {
        params: {
            input: req.query['q']?.toString() || '',
            key: gmapKey,
            ...acConf,
        },
        timeout: 1000,
    };

    const autoCompleteResult = await gmapClient.placeAutocomplete(acReq);

    if (autoCompleteResult.status === 200) {
        const predictions = autoCompleteResult.data.predictions;
        const renamed = predictions.map((p) => {
            return {
                description: p.description,
                structuredFormatting: {
                    mainText: p.structured_formatting.main_text,
                    secondaryText: p.structured_formatting.secondary_text,
                    mainTextMatchedSubstrings:
                        p.structured_formatting.main_text_matched_substrings,
                },
            };
        });
        return res.status(200).send(renamed);
    }

    console.warn(
        'Failed to get autocomplete results from google (' +
            autoCompleteResult.status +
            ')'
    );
    console.warn(autoCompleteResult.statusText);
    return res.status(500).send('Something went wrong...');
};

// Place predict API types
/*
    type MainTextMatchedSubstrings = {
        offset: number;
        length: number;
    };

    type StructuredFormatting = {
        main_text: string;
        secondary_text: string;
        main_text_matched_substrings: readonly MainTextMatchedSubstrings[];
    };

    type PlaceType = {
        description: string;
        structured_formatting: StructuredFormatting;
};
*/

module.exports = [autocomplete];
