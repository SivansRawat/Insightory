"use strict";
// import mongoose from 'mongoose';
// import axios from 'axios';
// import Product from '../models/Product'; // Correct path relative to src/scripts
// import dotenv from 'dotenv';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// async function seedProducts() {
//   try {
//     const mongoUri = process.env.MONGO_URI;
//     if (!mongoUri) {
//       throw new Error('MONGO_URI environment variable is not defined');
//     }
//     await mongoose.connect(mongoUri);
//     console.log('Connected to MongoDB');
//     console.log('Fetching products from dummyjson.com...');
//     const response = await axios.get('https://dummyjson.com/products?limit=100');
//     const productsData = response.data.products;
//     console.log(`Fetched ${productsData.length} products.`);
//     await Product.deleteMany({});
//     await Product.insertMany(productsData);
//     console.log(`Inserted ${productsData.length} products into the database.`);
//     mongoose.disconnect();
//     console.log('Disconnected from MongoDB');
//   } catch (error) {
//     console.error('Error seeding products:', error);
//     process.exit(1);
//   }
// }
// seedProducts();
// backend/src/scripts/seedProducts.ts
const mongoose_1 = __importDefault(require("mongoose"));
const axios_1 = __importDefault(require("axios"));
const Product_1 = __importDefault(require("../models/Product"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function seedProducts() {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        await mongoose_1.default.connect(mongoUri);
        console.log('Connected to MongoDB');
        // --- CRITICAL LOGS TO OBSERVE ---
        console.log(`Database name from connection: ${mongoose_1.default.connection.name}`);
        console.log(`Collection name targeted by Product model: ${Product_1.default.collection.name}`);
        // --- END CRITICAL LOGS ---
        console.log('Fetching products from dummyjson.com...');
        const response = await axios_1.default.get('https://dummyjson.com/products?limit=100');
        const productsData = response.data.products;
        console.log(`Fetched ${productsData.length} products.`);
        await Product_1.default.deleteMany({}); // Clear existing products in the targeted collection
        await Product_1.default.insertMany(productsData);
        console.log(`Inserted ${productsData.length} products into the database.`);
        mongoose_1.default.disconnect();
        console.log('Disconnected from MongoDB');
    }
    catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
}
seedProducts();
