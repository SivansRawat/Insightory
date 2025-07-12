"use client";

import React from 'react';

export default function OverviewPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Overview</h1>
      <p className="text-gray-700">Welcome to your dashboard overview! Here you can see a summary of your inventory, sales, and other key metrics. Add your analytics and summary widgets here.</p>
      {/* Example widgets or summary cards can be added below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-indigo-600">120</p>
        </div>
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
          <p className="text-3xl font-bold text-green-600">$15,000</p>
        </div>
        <div className="p-4 border rounded-md bg-white shadow">
          <h2 className="text-lg font-semibold mb-2">Low Stock Items</h2>
          <p className="text-3xl font-bold text-red-600">8</p>
        </div>
      </div>
    </div>
  );
}
