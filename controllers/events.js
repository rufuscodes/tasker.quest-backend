// Imports
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models');
const Event = require('../models/event');
const Category = require('../models/category');

// GET route for /events
router.get('/', (req, res) => {
    Event.find()
        .populate('category') // Populate the category field
        .then(events => {
            if (events.length > 0) {
                return res.json({ events: events });
            } else {
                return res.json({ message: 'No events exist' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET route for /events/:id
router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .populate('category') // Populate the category field
        .then(event => {
            if (event) {
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

// POST route for creating a new event
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const { title, description, startDate, endDate, priority, location, categoryId } = req.body;

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.json({ message: 'Invalid category ID' });
        }

        const newEvent = new Event({
            title,
            description,
            startDate,
            endDate,
            priority,
            location,
            category: category._id,
            user: req.user._id,
        });

        const event = await newEvent.save();

        return res.json({ event });
    } catch (error) {
        console.log('Error:', error);
        return res.json({ message: 'An error occurred, please try again.' });
    }
});

// router.post('/', async (req, res) => {
//     try {
//         const { title, description, startDate, endDate, priority, location, categoryId } = req.body;

//         console.log('categoryId:', categoryId);

//         // Check if the provided categoryId exists
//         const category = await Category.findById(categoryId);
//         console.log('category:', category);

//         if (!category) {
//             return res.json({ message: 'Invalid category ID' });
//         }

//         const newEvent = new Event({
//             title,
//             description,
//             startDate,
//             endDate,
//             priority,
//             location,
//             category: category._id,
//             user: req.user._id,
//         });

//         const event = await newEvent.save();

//         return res.json({ event });
//     } catch (error) {
//         console.log('Error:', error);
//         return res.json({ message: 'An error occurred, please try again.' });
//     }
// });



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
                console.log('Event deleted:', event);
                return res.json({ message: 'Event deleted successfully' });
            } else {
                return res.json({ message: 'Event not found' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;
