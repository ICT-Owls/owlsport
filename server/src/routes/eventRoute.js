const { body, param, oneOf } = require('express-validator');
const { validate, authorize, validateLocation } = require('../utils.js');
const { events } = require('../database.js');

const express = require('express');
const { resolveObjectURL } = require('buffer');
const router = express.Router();

/**
 * Create a new event.
 * User making the post request automatically becomes the owner.
 */
router.post(
    '/',
    authorize,
    body('title').isString(),
    body('description').isString(),
    body('startDateTime').isInt(),
    body('endDateTime').isInt(),
    body('members').custom((members) => {
        return Object.entries(members).every(([id, member]) => {
            return (
                id == member.id &&
                validateLocation(member.location) &&
                member.hasOwnProperty('requiresCarpooling')
            );
        });
    }),
    body('location').custom(validateLocation),
    validate,
    async (req, res) => {
        const {
            title,
            description,
            members,
            startDateTime,
            endDateTime,
            location,
        } = req.body;
        const authUser = req.user;

        for (let key of Object.keys(members || {})) {
            members[key].isPassenger = false;
            members[key].isDriver = false;
            members[key].requiresCarpooling = false;
        }

        const eventRef = events.push();
        await eventRef.set({
            creatorId: authUser.uid,
            id: eventRef.key,
            title: title,
            description: description,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            creationDate: Date.now(),
            members: {
                [authUser.uid]: {
                    id: authUser.uid,
                    requiresCarpooling: false,
                    isDriver: false,
                    isPassenger: false,
                },
                ...members,
            },
            location: location,
        });

        const event = await eventRef.get();

        res.send(event.val());
    }
);

/**
 * List all events a user has access to.
 */
router.get('/', authorize, async (req, res) => {
    const userId = req.user.uid;

    const eventsRef = await events.get();
    if (eventsRef.val() === undefined) return res.send([]);
    const userEvents = Object.values(eventsRef.val()).filter(
        (e) => e.creatorId == userId || e.members?.hasOwnProperty(userId)
    );

    res.send(userEvents || []);
});

/**
 * Get an event by its ID.
 * Currently anyone can get any event as long as they know the ID.
 */
router.get(
    '/:id',
    authorize,
    param('id').isString(),
    validate,
    async (req, res) => {
        const id = req.params.id;

        const eventRef = events.child(id);
        const event = await (await eventRef.get()).val();
        if (!event) return res.status(404).send('Event not found');

        res.send(event);
    }
);

/**
 * Update event info.
 */
router.patch(
    '/:id',
    authorize,
    param('id').isString(),
    body('title').optional().isString(),
    body('description').optional().isString(),
    body('members')
        .optional()
        .custom((members) => {
            return Object.entries(members).every(([id, member]) => {
                return (
                    id == member.id &&
                    validateLocation(member.location) &&
                    member.hasOwnProperty('requiresCarpooling')
                );
            });
        }),
    body('location').optional().custom(validateLocation),
    body('startDateTime').optional().isInt({ min: 0 }),
    body('endDateTime').optional().isInt({ min: 0 }),
    oneOf([
        body('title').exists(),
        body('description').exists(),
        body('members').exists(),
        body('location').exists(),
        body('startDateTime').exists(),
        body('endDateTime').exists(),
    ]),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const {
            title,
            description,
            members,
            location,
            startDateTime,
            endDateTime,
        } = req.body;

        const eventRef = events.child(id);
        const eventSnapshot = await eventRef.get();

        // Check if the event exists
        if (!eventSnapshot.exists())
            return res.status(404).send('Event not found');

        // Check who created the event
        // Only the event creator can update events
        if (eventSnapshot.val().creatorId != req.user.uid)
            return res.status(401).send('Unauthorized');

        var update = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (members) update.members = members;
        if (startDateTime) update.startDateTime = startDateTime;
        if (endDateTime) update.endDateTime = endDateTime;
        if (location) update.location = location;

        await eventRef.update(update);

        const updatedEvent = await eventRef.get();
        res.send(updatedEvent.val());
    }
);

router.patch(
    '/:id/self',
    authorize,
    param('id').isString(),
    body('location').optional().custom(validateLocation),
    body('requiresCarpooling').optional().isBoolean(),
    body('seats').optional().isNumeric(),
    oneOf([
        body('location').exists(),
        body('requiresCarpooling').exists(),
        body('seats').exists(),
    ]),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { location, requiresCarpooling, seats } = req.body;

        const memberRef = events.child(`${id}/members/${req.user.uid}`);
        const memberSnapshot = await memberRef.get();

        // Check if the event exists
        if (!memberSnapshot.exists())
            return res.status(404).send('Event not found');

        var update = {};
        if (location) update.location = location;
        if (requiresCarpooling != undefined)
            update.requiresCarpooling = requiresCarpooling;
        if (seats) update.seats = seats;

        await memberRef.update(update);

        const updatedMember = await memberRef.get();
        res.send(updatedMember.val());
    }
);

router.post(
    '/:id/car',
    authorize,
    param('id').isString(),
    body('car.model').isString(),
    body('car.registration').isString(),
    body('car.seats').isNumeric(),
    body('location').custom(validateLocation),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { car, location } = req.body;

        const eventRef = events.child(id);
        const eventSnapshot = await eventRef.get();
        if (!eventSnapshot.exists())
            return res.status(404).send('Event not found');
        const event = eventSnapshot.val();

        await eventRef.update({
            members: {
                ...event.members,
                [req.user.uid]: {
                    ...event.members[req.user.uid],
                    isDriver: true,
                    isPassenger: false,
                    passengers: [],
                    car,
                    location,
                },
            },
        });

        const updatedEvent = await eventRef.get();
        res.send(updatedEvent.val());
    }
);

router.post(
    '/:id/pickup',
    authorize,
    param('id').isString(),
    body('passengerId').isString(),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { passengerId } = req.body;

        if (req.user.uid === passengerId)
            return res.status(400).send('Passenger id cannot equal own id');

        const eventRef = events.child(id);
        const eventSnapshot = await eventRef.get();
        if (!eventSnapshot.exists())
            return res.status(404).send('Event not found');
        const event = eventSnapshot.val();

        const passenger = event?.members?.[passengerId];
        const driver = event?.members?.[req.user.uid];

        if (!passenger) return res.status(404).send('Passenger not found');
        if (!passenger.requiresCarpooling)
            return res.status(400).send('Member does not require carpooling');

        if (!driver) return res.status(404).send('Driver not found');

        const freeSeats =
            driver?.passengers?.reduce(
                (prev, pass) => prev + (pass.seats || 1),
                0
            ) || driver.car.seats;
        if (passenger.seats > freeSeats)
            return res.status(400).send('Not enough seats');

        await eventRef.update({
            members: {
                ...event.members,
                [passenger.id]: {
                    ...passenger,
                    isPassenger: true,
                    isDriver: false,
                },
                [driver.id]: {
                    ...driver,
                    isPassenger: false,
                    isDriver: true,
                    passengers: [...(driver.passengers || []), passenger.id],
                },
            },
        });

        const updatedEvent = await eventRef.get();
        res.send(updatedEvent.val());
    }
);

module.exports = router;
