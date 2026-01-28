const express = require('express');
const {
  getAllUsers,
  toggleUserStatus
} = require('../controllers/userController');

const protect = require('../middlewares/authMiddleware');
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', protect, roleCheck('admin'), getAllUsers);
router.patch('/:id/status', protect, roleCheck('admin'), toggleUserStatus);

module.exports = router;
