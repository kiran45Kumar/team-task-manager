const express = require('express');
const {
  userDashboard,
  adminDashboard
} = require('../controllers/dashboardController');


const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/user', protect, userDashboard);
router.get('/admin', protect, roleCheck('admin'), adminDashboard);

module.exports = router;