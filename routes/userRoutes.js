const express = require('express');
const router = express.Router();
const customerController = require('../controllers/userController');

router.get('/', customerController.getAllUsers);
router.post('/', customerController.createUser);
router.put('/:id', customerController.updateUser);
router.delete('/:id', customerController.deleteUser);

module.exports = router;
