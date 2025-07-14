// "use client";

// import React, { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';

// export default function OverviewPage() {
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [totalSales, setTotalSales] = useState(0);
//   const [lowStockItems, setLowStockItems] = useState(0);

//   useEffect(() => {
//     const fetchOverviewData = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/products');
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         const products = data.products;

//         setTotalProducts(products.length);

//         // Calculate low stock items (stock less than 10)
//         const lowStockCount = products.filter((p: any) => p.stock < 10).length;
//         setLowStockItems(lowStockCount);

//         // Calculate total sales as sum of price * (initial stock - current stock)
//         // Since we don't have initial stock, use price * stock as placeholder
//         const sales = products.reduce((acc: number, p: any) => acc + p.price * p.stock, 0);
//         setTotalSales(sales);
//       } catch (error) {
//         console.error('Error fetching overview data:', error);
//       }
//     };

//     fetchOverviewData();
//   }, []);

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold">Overview</h1>
//       <p className="text-gray-700">Welcome to your dashboard overview! Here you can see a summary of your inventory, sales, and other key metrics. Add your analytics and summary widgets here.</p>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <div className="p-4 border rounded-md bg-white shadow">
//           <h2 className="text-lg font-semibold mb-2">Total Products</h2>
//           <p className="text-3xl font-bold text-indigo-600">{totalProducts}</p>
//         </div>
//         <div className="p-4 border rounded-md bg-white shadow">
//           <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
//           <p className="text-3xl font-bold text-green-600">${totalSales.toFixed(2)}</p>
//         </div>
//         <div className="p-4 border rounded-md bg-white shadow">
//           <h2 className="text-lg font-semibold mb-2">Low Stock Items</h2>
//           <p className="text-3xl font-bold text-red-600">{lowStockItems}</p>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  Star,
  DollarSign,
  BarChart3,
  PieChart
} from 'lucide-react';




interface Product {
  _id?: string;
  id?: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail?: string;
  images?: string[];
}


// You'll need to install recharts: npm install recharts




import {
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';




// Sample data for charts - replace with real API data
const salesData = [
  { month: 'Jan', sales: 12000, orders: 340 },
  { month: 'Feb', sales: 19000, orders: 480 },
  { month: 'Mar', sales: 15000, orders: 420 },
  { month: 'Apr', sales: 22000, orders: 560 },
  { month: 'May', sales: 25000, orders: 680 },
  { month: 'Jun', sales: 28000, orders: 720 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#6366f1' },
  { name: 'Beauty', value: 25, color: '#8b5cf6' },
  { name: 'Furniture', value: 20, color: '#06b6d4' },
  { name: 'Groceries', value: 10, color: '#10b981' },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 1250, trend: 'up' },
  { name: 'Smartphone Case', sales: 980, trend: 'up' },
  { name: 'Coffee Maker', sales: 750, trend: 'down' },
  { name: 'Desk Lamp', sales: 650, trend: 'up' },
];

export default function OverviewPage() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [lowStockItems, setLowStockItems] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // const products = data.products || [];
         const products: Product[] = data.products || [];

        setTotalProducts(products.length);

        // Calculate low stock items (stock less than 10)
        const lowStockCount = products.filter((p) => p.stock < 10).length;
        setLowStockItems(lowStockCount);

        // Calculate total sales and average rating
        const sales = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
        const avgRat = products.reduce((acc, p) => acc + p.rating, 0) / products.length;
        
        setTotalSales(sales);
        setAvgRating(avgRat);
      } catch (error) {
        console.error('Error fetching overview data:', error);
      }
    };

    fetchOverviewData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Welcome back! Here&apos;s what&apos;s happening with your inventory today.
        </p>
      </div>

      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Products</CardTitle>
            <Package className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-indigo-600">{totalProducts}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalSales.toLocaleString()}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Low Stock Items</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{lowStockItems}</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              Needs attention
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-amber-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg Rating</CardTitle>
            <Star className="h-5 w-5 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{avgRating.toFixed(1)}</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +0.3 from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ENHANCED ANALYTICS SECTION - NEW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              <span>Sales & Orders Trend</span>
            </CardTitle>
            <CardDescription>Monthly performance over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                  name="Sales ($)"
                />
                <Line 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  name="Orders"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5 text-indigo-600" />
              <span>Category Distribution</span>
            </CardTitle>
            <CardDescription>Product distribution by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} 
                />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
          <CardDescription>Best sellers this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {product.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm font-medium text-slate-600">${product.sales}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}





