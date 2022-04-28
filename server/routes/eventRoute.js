const { body, param } = require('express-validator');
const { validate } = require('../utils.js');
const { events } = require('../database.js');

const express = require('express');
const router = express.Router();

router.post(
    '/create',
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

router.get('/:id', param('id').isString(), validate, async (req, res) => {
    const id = req.params.id;

    const eventRef = events.child(id);
    const event = await (await eventRef.get()).val();
    if (!event) return res.status(404).send('Event not found');

    res.send(event);
});

router.post(
    '/:id',
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

        if (!eventSnapshot.exists())
            return res.status(404).send('Event not found');

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

module.exports = router;
