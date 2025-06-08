// routes/clientRoutes.js
const express = require("express");
const router = express.Router();
const clientController= require("../controllers/clientController");
const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware"); // middleware JWT

router.put("/update-form", authMiddleware, upload.single("photo"), clientController.updateSkinForm);
router.get("/profile", authMiddleware, clientController.getSkinFormByUser );
module.exports = router;
