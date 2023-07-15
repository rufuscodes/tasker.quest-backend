const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models');
const Category = require('../models/category');

// POST route for creating a new category
router.post('/', (req, res) => {
    const { name, description } = req.body;

    const newCategory = new Category({
        name,
        description
    });

    newCategory.save()
        .then(category => {
            console.log('New category created:', category);
            return res.json({ category });
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET route for retrieving all categories
router.get('/', (req, res) => {
    Category.find()
        .then(categories => {
            if (categories.length > 0) {
                return res.json({ categories });
            } else {
                return res.json({ message: 'No categories exist' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;
