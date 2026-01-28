const User = require('../models/User');
const Task = require('../models/Task');

exports.userDashboard = async (req, res, next) => {
  try {
    const totalTasks = await Task.countDocuments({
      user: req.user._id,
      username: req.user.name
    });

    const pendingTasks = await Task.countDocuments({
      user: req.user._id,
      status: { $ne: 'done' }
    });
    const currentUsername = req.user.name;
    res.json({
      totalTasks,
      pendingTasks,
      username: currentUsername
    });
  } catch (error) {
    next(error);
  }
};


exports.adminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();

    res.json({
      totalUsers,
      totalTasks
    });
  } catch (error) {
    next(error);
  }
};
