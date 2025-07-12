// import mongoose from 'mongoose';
// import axios from 'axios';
// import Product from '../models/Product'; // Correct path relative to src/scripts
// import dotenv from 'dotenv';

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
import mongoose from 'mongoose';
import axios from 'axios';
import Product from '../models/Product';
import dotenv from 'dotenv';

dotenv.config();

async function seedProducts() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // --- CRITICAL LOGS TO OBSERVE ---
    console.log(`Database name from connection: ${mongoose.connection.name}`);
    console.log(`Collection name targeted by Product model: ${Product.collection.name}`);
    // --- END CRITICAL LOGS ---

    console.log('Fetching products from dummyjson.com...');
    const response = await axios.get('https://dummyjson.com/products?limit=100');
    const productsData = response.data.products;
    console.log(`Fetched ${productsData.length} products.`);

    await Product.deleteMany({}); // Clear existing products in the targeted collection
    await Product.insertMany(productsData);
    console.log(`Inserted ${productsData.length} products into the database.`);

    mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();