const express = require('express');
const router = express.Router();

const {registerUser,registerAdmin, loginUser} = require('../controllers/authController');

router.post('/register/user', registerUser);
router.post('/register/admin',registerAdmin);
router.post('/login', loginUser);

module.exports = router;