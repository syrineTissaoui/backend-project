const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


const authenticateToken = require('../middleware/authMiddleware');
router.get('/skinType', userController.getAllSkinTypes);

router.post('/register', authController.register); 
router.post('/login', authController.login);


module.exports = router;
