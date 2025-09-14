

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateFields } = require('../middleware/fieldValidator');
const { verifyTokenMiddleware } = require('../middleware/auth');

// Define routes
const loginFields = ['email', 'password'];
const resetFields = ['token', 'password'];

router.post('/login/:type', validateFields(loginFields), authController.login);
router.post('/logout', verifyTokenMiddleware, authController.logout);
router.post('/refresh', authController.refresh);
router.post('/reset', validateFields(resetFields), authController.reset);
router.post('/recovery/:email', authController.recovery);
router.get('/validate/:token', authController.validate);

module.exports = router;
