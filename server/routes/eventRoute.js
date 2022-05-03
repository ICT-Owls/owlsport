const { body, param } = require('express-validator');
const { validate, authorize } = require('../utils.js');
const { events } = require('../database.js');

const express = require('express');
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
    validate,
    async (req, res) => {
        const { title, description, startDateTime, endDateTime } = req.body;
        const authUser = req.user;

        const eventRef = events.push();
        await eventRef.set({
            creatorId: authUser.uid,
            id: eventRef.key,
            title: title,
            description: description,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            creationDate: Date.now(),
            members: [],
        });

        const event = await eventRef.get();

        res.send(event.val());
    }
);

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
    body('members').optional().isArray(),
    body('members.*').isString(),
    body('startDateTime').optional().isInt({ min: 0 }),
    body('endDateTime').optional().isInt({ min: 0 }),
    validate,
    async (req, res) => {
        const id = req.params.id;
        const { title, description, members, startDateTime, endDateTime } =
            req.body;

        const eventRef = events.child(id);
        const eventSnapshot = await eventRef.get();

        // Check if the event exists
        if (!eventSnapshot.exists())
            return res.status(404).send('Event not found');

        // Check who created the event
        // Only the event creator can update events
        if (!eventSnapshot.creatorId != req.user.id)
            return res.status(401).send('Unauthorized');

        var update = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (members) update.members = members;
        if (startDateTime) update.startDateTime = startDateTime;
        if (endDateTime) update.endDateTime = endDateTime;

        await eventRef.update(update);

        const updatedEvent = await eventRef.get();
        res.send(updatedEvent.val());
    }
);

router.get('/mine', authorize, async (req, res) => {
    const userId = req.user.uid;

    const events = events.get();
    const userEvents = events.filter(
        (e) => e.creatorId == userId || e.members?.includes()
    );

    res.send(userEvents || []);
});

module.exports = router;