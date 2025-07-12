"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product")); // Importing the Product model
const getProducts = async (req, res) => {
    try {
        // Fetch products directly from your MongoDB Product collection
        // This assumes you have already seeded your database using 'npm run seed'
        const products = await Product_1.default.find({}); // Fetch all products from your DB
        // You can also add pagination, filtering, or sorting here based on req.query if needed
        // Example: const products = await Product.find(req.query).limit(10).skip(0);
        res.status(200).json({
            products: products,
            total: products.length, // Add total for consistency with dummyjson API structure
            skip: 0,
            limit: products.length
        });
    }
    catch (error) {
        console.error('Error fetching products from MongoDB:', error);
        const errorMsg = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: 'Error fetching product data from database.', error: errorMsg });
    }
};
exports.getProducts = getProducts;
