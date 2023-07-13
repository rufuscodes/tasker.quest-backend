// Imports
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models');
const Event = require('../models/event');

// GET route for /events
router.get('/', (req, res) => {
    Event.find()
        .then(events => {
            if (events.length > 0) {
                return res.json({ events: events });
            } else {
                return res.json({ message: 'No events exist' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET route for /events/:id
router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            if (event) {
                return res.json({ event: event });
            } else {
                return res.json({ message: 'Event not found' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// POST route for creating a new event
router.post('/', (req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        location: req.body.location,
        user: req.body.user
    });

    newEvent.save()
        .then(event => {
            console.log('new event created:', event);
            return res.json({ event: event });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// PUT route for updating an event
router.put('/:id', (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(event => {
            if (event) {
                console.log('Event updated:', event);
                return res.json({ event: event });
            } else {
                return res.json({ message: 'Event not found' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// DELETE route for deleting an event
router.delete('/:id', (req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(event => {
            if (event) {
                console.log('event deleted:', event);
                return res.json({ message: 'Event deleted successfully' });
            } else {
                return res.json({ message: 'Event not found' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;
