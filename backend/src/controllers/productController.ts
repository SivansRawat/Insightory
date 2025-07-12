// backend/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product'; // Importing the Product model

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Fetch products directly from your MongoDB Product collection
    // This assumes you have already seeded your database using 'npm run seed'
    const products = await Product.find({}); // Fetch all products from your DB

    // You can also add pagination, filtering, or sorting here based on req.query if needed
    // Example: const products = await Product.find(req.query).limit(10).skip(0);

    res.status(200).json({
      products: products,
      total: products.length, // Add total for consistency with dummyjson API structure
      skip: 0,
      limit: products.length
    });
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error fetching product data from database.', error: errorMsg });
  }
};