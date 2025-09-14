const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyTokenMiddleware } = require('../middleware/auth');

router.get('/', verifyTokenMiddleware, companyController.getCompany);

module.exports = router;
