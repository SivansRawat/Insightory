

// backend/src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/Product'; // Importing the Product model

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      products: products,
      total: products.length,
      skip: 0,
      limit: products.length
    });
  } catch (error) {
    console.error('Error fetching products from MongoDB:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error fetching product data from database.', error: errorMsg });
  }
};

export const getProductAnalytics = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({});

    const salesTrendData = {
        "Jan": 1200, "Feb": 1500, "Mar": 1300, "Apr": 1800,
        "May": 2200, "Jun": 1900, "Jul": 2500
    };

    // *** CRITICAL FIX: Handle undefined product.category here ***
    const categoryDistribution: Record<string, number> = products.reduce((acc: Record<string, number>, product) => {
        const categoryName = product.category || 'Unknown Category'; // Provide fallback
        acc[categoryName] = (acc[categoryName] || 0) + 1;
        return acc;
    }, {});

    res.status(200).json({
      sales: salesTrendData,
      categoryDistribution: categoryDistribution,
    });

  } catch (error) {
    console.error('Error fetching analytics data:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    res.status(500).json({ message: 'Error fetching analytics data.', error: errorMsg });
  }
};