const express = require( 'express');
const  skinTypeController  = require( '../controllers/skinTypeController');

const router = express.Router();

router.get('/', skinTypeController.getSkinProfile);
router.post('/:id', skinTypeController.updateSkinProfile);

module.exports = router;