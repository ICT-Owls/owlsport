const { body, param, oneOf } = require('express-validator');
const { validate, authorize } = require('../utils.js');

const express = require('express');
const router = express.Router();

require('isomorphic-fetch');

/**
 * Get geo location from place name
 */
router.get(
    '/forward/:place',
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

        if (geoData.length < 1) {
            return res.status(404).send('No results from mapquest');
        }
        try {
            return res.status(200).send({
                latitude: geoData[0].lat,
                longitude: geoData[0].lon,
                address: req.params['place'],
            });
        } catch (error) {
            if (error.name !== 'TypeError') throw error;
        }
        console.error(geoData)[0];
        return res.status(502).send('Bad data from mapquest');
    }
);

router.get(
    '/reverse',
    authorize,
    param('lat').isNumeric(),
    param('lng').isNumeric(),
    validate,
    async (req, res) => {
        console.warn("Fetching lat:" + req.query['lat'] + ", lng:" + req.query['lng']);
        const geoData = await (
            await fetch(
                'http://open.mapquestapi.com/nominatim/v1/reverse.php?key=***REMOVED***&format=json&lat=' +
                    req.query['lat'] +
                    '&lon=' +
                    req.query['lng']
            )
        ).json();

        console.warn("Received response from server:");
        console.warn(geoData);
        /*const geoData = await geoApi.geoPlaceGet(accents(query), {
        headers: { authorization: `Bearer ${token}` },
    });*/

        if (geoData.length < 1) {
            return res.status(404).send('No results from mapquest');
        }
        try {
            return res.status(200).send({
                latitude: geoData[0].lat,
                longitude: geoData[0].lon,
                address: geoData[0].display_name,
            });
        } catch (error) {
            if (error.name !== 'TypeError') throw error;
        }

        return res.status(404).send('Bad data received from mapquest');
    }
);

module.exports = router;
