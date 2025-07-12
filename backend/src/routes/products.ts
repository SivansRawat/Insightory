// backend/src/routes/products.ts
import express from 'express';
import { getProducts } from '../controllers/productController'; // Path relative to routes folder

const router = express.Router();

router.get('/', getProducts);

export default router;