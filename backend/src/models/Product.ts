import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  description?: string;
  price?: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
}, { timestamps: true });

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;