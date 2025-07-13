"use client";

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// *** CRITICAL CHANGE: Update Product interface to use _id: string ***
interface Product {
  _id: string; // MongoDB uses _id as the unique identifier, which is a string
  id?: number; // The original dummyjson 'id' might still be present, but often not used as the primary key from MongoDB
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // *** CRITICAL FIX: Access the 'products' array from the data object ***
        setProducts(data.products); // Correctly set products state to the array
      } catch (err) {
        console.error("Error fetching products:", err);
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Analytics data for category distribution
  // This calculation is safe because 'products' is initialized as []
  // and will be updated to an array.
  const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
        const categoryName = product.category || 'Unknown Category'; // If category is undefined, use 'Unknown Category'

    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.keys(categoryCounts);
  const categoryData = Object.values(categoryCounts);

  const barChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Number of Products',
        data: categoryData,
        backgroundColor: 'rgba(99, 102, 241, 0.7)', // Indigo-600
      },
    ],
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Products</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <>
          <div className="overflow-x-auto border rounded-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  // *** CRITICAL FIX: Change key={product.id} to key={product._id} ***
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img src={product.thumbnail} alt={product.title} className="h-12 w-12 rounded-md object-cover" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{product.discountPercentage.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{product.rating.toFixed(1)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <section>
            <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
            {products.length > 0 ? ( // Only render chart if products exist
              <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
            ) : (
              <p>No product data available for charts.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ProductsPage;