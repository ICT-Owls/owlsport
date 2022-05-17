const { body, param, oneOf } = require('express-validator');
const { validate, authorize } = require('../utils.js');

const express = require('express');
const router = express.Router();


/**
 * Get geo location from place name
 */
router.get(
    '/:place',
    authorize,
    param('place').isString(),
    validate,
    async (req, res) => {
        const geoData = await (
            await fetch(
                'http://open.mapquestapi.com/nominatim/v1/search.php?key=***REMOVED***&countrycodes=se&format=json&q=' +
                    req.params['place']
            )
        ).json();

        /*const geoData = await geoApi.geoPlaceGet(accents(query), {
        headers: { authorization: `Bearer ${token}` },
    });*/
        try {
            return res.status(200).send({ latitude: geoData.lat, longitude: geoData.lon, address: req.params['place']});
        } catch (error) {
            if (error.name === 'TypeError') {
                return res.status(404).send('Place not found');
            } else throw error;
        }
    }
);

router.get(
    '/reverse',
    authorize,
    query('lat').isNumber(),
    query('lng').isNumber(),
    validate,
    async (req, res) => {
        const geoData = await (
            await fetch(
                'http://open.mapquestapi.com/nominatim/v1/reverse.php?key=***REMOVED***&format=json&lat=' +
                req.query['place'] + '&lon=' + req.query['place']
            )
        ).json();

        /*const geoData = await geoApi.geoPlaceGet(accents(query), {
        headers: { authorization: `Bearer ${token}` },
    });*/
        try {
            return res.status(200).send({ latitude: geoData.lat, longitude: geoData.lon, address: req.params['place']});
        } catch (error) {
            if (error.name === 'TypeError') {
                return res.status(404).send('Place not found');
            } else throw error;
        }
    }
);

module.exports = router;
