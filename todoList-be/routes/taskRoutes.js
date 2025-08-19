const express = require('express');
const Task = require('../models/task');
const authenticateToken = require('../middleware/authenticateToken');
const { getAllTasks, getTaskById, addTask, editTask, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/', authenticateToken, getAllTasks);

router.get('/:id', authenticateToken, getTaskById);

router.post('/', authenticateToken, addTask);

router.put('/:id', authenticateToken, editTask);

router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;