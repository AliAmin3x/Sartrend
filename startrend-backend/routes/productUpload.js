const express = require('express');
const router = express.Router();
const Product = require("../models/productSchema");

const ADMIN_EMAIL = "Pk.aliraza001@gmail.com"; 

// POST: Upload a product
router.post("/productUpload", async (req, res) => {
    try {
        const { 
            email,
            name,
            category,
            rate,
            stock,
            description,
            imageurl,
            activecomponents,
            ingredients
        } = req.body;

        if (email !== ADMIN_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only admin can upload products."
            });
        }

        const newProduct = await Product.create({
            name,
            category,
            rate,
            stock,
            description,
            imageurl,
            activecomponents,
            ingredients
        });

        res.json({
            success: true,
            message: "Product uploaded successfully",
            product: newProduct
        });

    } catch (err) {
        console.error("Error uploading product:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

// GET: All Products
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({});

        // Normalize backend → frontend keys
        const normalized = products.map(p => ({
            id: p._id,
            _id: p._id,
            name: p.name,
            category: p.category,
            rate: p.rate,
            stock: p.stock,
            description: p.description,
            imageUrl: p.imageurl,
            activecomponents: p.activecomponents,
            ingredients: p.ingredients
        }));

        res.json({
            success: true,
            products: normalized
        });

    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
});

module.exports = router;
