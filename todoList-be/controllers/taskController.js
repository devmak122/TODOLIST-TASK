const express = require('express');
const Task = require('../models/task');
const authenticateToken = require('../middleware/authenticateToken');
const { init } = require('../models/user');

exports.getAllTasks = async (req, res) => {
    try {
        const { page = 1, limit = 5, status, search } = req.query;

        let filter = { userId: req.user._id, isDeleted: false };

        if (status && ['pending', 'completed'].includes(status)) {
            filter.status = status;
        }
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const total = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        return res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            data: tasks,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Error fetching tasks",
            error: err.message,
        });
    }
};


exports.getTaskById = async (req, res) => {

    try {
        const task = await Task.findOne({ _id: req.params.id, userId: req.user._id, isDeleted: false });
        if (!task) {
            // return res.status(404).json({ error: 'Task not found' });
        }
        return res.status(200).json({
            success: true,
            message: "Task fetched successfully",
            data: task
        });
    } catch (err) {
        res.status(400).send({ error: 'Error fetching task: ' + err.message });
    }
}

exports.addTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const task = new Task({ userId: req.user._id, title, description, dueDate, status });
        await task.save();
        return res.status(201).json({
            success: true,
            message: 'Task added successfully',
            task: task
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
}

exports.editTask = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;
        const updatedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id },
            { title, description, dueDate, status },
            { new: true }
        );
        if (!updatedTask) return res.status(404).send('Task not found');
        return res.status(200).json({
            sucess: true,
            message: 'Task updated successfully',
            task: updatedTask
        });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id, isDeleted: false },
            { $set: { isDeleted: true } },
            { new: true }
        );
        if (!deletedTask)
            return res.status(404).send("Task not found or already deleted / unauthorized");

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            // task: deletedTask
        });
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
};

