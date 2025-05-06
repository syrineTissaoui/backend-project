const Product = require('../models/product.js');

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      category,
      description,
      userId
    } = req.body;
console.log('req.file',req.file.path)
    if (!name || !price || !stock) {
      return res.status(400).json({ error: 'Champs requis manquants.' });
    }

    const product = new Product({
      name,
      price,
      stock,
      category,
      userId,
      description,
      image: req.file.path,
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Erreur création produit :', err);
    res.status(500).json({ error: err.message });
  }
};


// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.path;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
