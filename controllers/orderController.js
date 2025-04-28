const Order =require ("../models/order.js");
const Product =require ("../models/product.js");

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des commandes" });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { customer, date, status, total, productIds } = req.body;

    const newOrder = new Order({
      customer,
      date,
      status,
      total,
      productIds 
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Erreur lors de la création de la commande:", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la commande" });
  }
};

// Update an order
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour de la commande" });
  }
};
exports.getSellerOrders = async (req, res) => {
  const { userId } = req.params;

  try {
    // 1. Trouver tous les produits créés par ce vendeur
    const sellerProducts = await Product.find({ userId });
    const sellerProductIds = sellerProducts.map(product => product._id);

    // 2. Trouver toutes les commandes contenant au moins un des produits du vendeur
    const sellerOrders = await Order.find({ 
      productIds: { $in: sellerProductIds } // 🔥 Correction ici (sur productIds, pas productId)
    });

    res.status(200).json(sellerOrders);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes du vendeur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

