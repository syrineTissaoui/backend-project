const express = require("express");
const router = express.Router();
const productController=require('../controllers/productcontroller.js');
const upload = require('../middleware/upload');



router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id',productController.getProductById);
router.put('/:id', upload.single('image'),  productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
