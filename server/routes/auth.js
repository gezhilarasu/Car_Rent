const express = require('express');
const router = express.Router();

const {user_initiateRegistration,user_completeRegistration,admin_initiateRegistration,admin_completeRegistration, loginUser, sentOtp, verifyOtp, resetpassword} = require('../controllers/authController');

router.post('/register/user', user_initiateRegistration);
router.post('/register/user/complete', user_completeRegistration);
router.post('/register/admin', admin_initiateRegistration);
router.post('/register/admin/complete', admin_completeRegistration);
router.post('/login', loginUser);
router.post('/reset/sendotp', sentOtp);
router.post('/reset/verifyotp', verifyOtp);
router.post('/reset/resetpassword', resetpassword);

module.exports = router;