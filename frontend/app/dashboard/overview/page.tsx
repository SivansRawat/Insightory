"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function OverviewPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const products = data.products;

        setTotalProducts(products.length);

        // Calculate low stock items (stock less than 10)
        const lowStockCount = products.filter((p: any) => p.stock < 10).length;
        setLowStockItems(lowStockCount);

        // Calculate total sales as sum of price * (initial stock - current stock)
        // Since we don't have initial stock, use price * stock as placeholder
        const sales = products.reduce((acc: number, p: any) => acc + p.price * p.stock, 0);
        setTotalSales(sales);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="text-gray-700">Welcome to your dashboard overview! Here you can see a summary of your inventory, sales, and other key metrics. Add your analytics and summary widgets here.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-indigo-600">{totalProducts}</p>
        </div>
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Low Stock Items</h2>
          <p className="text-3xl font-bold text-red-600">{lowStockItems}</p>
        </div>
      </div>
    </div>
  );
}
