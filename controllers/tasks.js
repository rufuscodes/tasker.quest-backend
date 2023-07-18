// Imports
const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models');

const Task = require('../models/task');

// GET route for /tasks
router.get('/', (req, res) => {
    Task.find() // Find all tasks
        .then(tasks => {
            if (tasks.length > 0) {
                return res.json({ tasks: tasks });
            } else {
                return res.json({ message: 'No tasks exist' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

// GET route for /tasks/:id
router.get('/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(task => {
            if (task) {
                return res.json({ task: task });
            } else {
                return res.json({ message: 'Task not found' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});


router.post('/', (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        priority: req.body.priority,
        status: req.body.status,
        category: req.body.category,
        user: req.body.user // Remove .user._id
    });

    newTask.save()
        .then(task => {
            console.log('new task created:', task);
            return res.json({ task: task });
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});



// PUT route for updating a task
router.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(task => {
            if (task) {
                console.log('Task updated:', task);
                return res.json({ task: task });
            } else {
                return res.json({ message: 'Task not found' });
            }
        })
        .catch(error => {
            console.log('Error:', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});



// DELETE route for deleting a task
router.delete('/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(task => {
            if (task) {
                console.log('task deleted:', task);
                return res.json({ message: 'Task deleted successfully' });
            } else {
                return res.json({ message: 'Task not found' });
            }
        })
        .catch(error => {
            console.log('error', error);
            return res.json({ message: 'An error occurred, please try again' });
        });
});

module.exports = router;