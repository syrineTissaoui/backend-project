const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');
router.get('/skinType', userController.getAllSkinTypes);

router.post('/register', authController.register); 
router.post('/login', authController.login);
router.get('/user', authenticateToken, (req, res) => {
    res.json(req.user); // Renvoie les données contenues dans le token
  });
module.exports = router;
