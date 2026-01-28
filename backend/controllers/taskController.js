const Task = require('../models/Task');


exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};


exports.getTasks = async (req, res, next) => {
  try {
    let tasks;

    if (req.user.role === 'admin') {
      tasks = await Task.find().populate('user', 'name email');
    } else {
      tasks = await Task.find({ user: req.user._id });
    }

    res.json(tasks);
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (
      req.user.role !== 'admin' &&
      task.user.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized');
    }

    Object.assign(task, req.body);
    await task.save();

    res.json(task);
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    if (
      req.user.role !== 'admin' &&
      task.user.toString() !== req.user._id.toString()
    ) {
      res.status(403);
      throw new Error('Not authorized');
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
