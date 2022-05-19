const { body, param, oneOf, query } = require('express-validator');
const { validate, authorize } = require('../utils.js');

const express = require('express');
const { exists } = require('fs');
const autocomplete = require('./autocomplete.js');
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
    query('lat').exists().withMessage('lat required').bail().isFloat(),
    query('lng').exists().withMessage('lng required').bail().isFloat(),
    validate,
    async (req, res) => {
        const geoData = await (
            await fetch(
                'http://open.mapquestapi.com/nominatim/v1/reverse.php?key=***REMOVED***&format=json&lat=' +
                    req.query['lat'] +
                    '&lon=' +
                    req.query['lng']
            )
        ).json();
        /*const geoData = await geoApi.geoPlaceGet(accents(query), {
        headers: { authorization: `Bearer ${token}` },
    });*/
        try {
            return res.status(200).send({
                latitude: geoData.lat,
                longitude: geoData.lon,
                address: geoData.display_name,
            });
        } catch (error) {
            if (error.name !== 'TypeError') throw error;
        }

        return res.status(404).send('Failed to get address');
    }
);

router.get('/autocomplete', authorize, validate, autocomplete);

module.exports = router;
