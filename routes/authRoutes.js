const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');




router.get('/skinType', userController.getAllSkinTypes);

router.post('/register', authController.register); 
router.post('/login', authController.login);
router.put('/:id', upload.single('image'), authController.updateUtilisateur);

module.exports = router;
