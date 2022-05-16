const { body, param, oneOf } = require('express-validator');
const { validate, authorize } = require('../utils.js');
const NodeGeocoder = require('node-geocoder');

const express = require('express');
const router = express.Router();

const geocoderOptions = {
    provider: 'mapquest',
    apiKey: '***REMOVED***', // for Mapquest, OpenCage, Google Premier
    formatter: null, // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(geocoderOptions);

/**
 * Get geo location from place name
 */
router.get(
    '/:place',
    authorize,
    param('place').isString(),
    validate,
    async (req, res) => {
        const result = await geocoder.geocode({
            address: 'req.params.place',
            countryCode: 'se',
            limit: 5,
        });
        if (!result) return res.status(404).send('Place not found');
        return res.status(200).send(result);
    }
);

module.exports = router;
