// "use client";

// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Button } from '@/components/ui/button';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// interface Product {
//   _id: string;
//   id?: number;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   brand: string;
//   category: string;
//   thumbnail: string;
//   images: string[];
// }

// const ProductsPage = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/products');
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         const data = await res.json();
//         setProducts(data.products);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setError('Failed to fetch products.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const categoryCounts = products.reduce<Record<string, number>>((acc, product) => {
//     acc[product.category] = (acc[product.category] || 0) + 1;
//     return acc;
//   }, {});

//   const categories = Object.keys(categoryCounts);
//   const categoryData = Object.values(categoryCounts);

//   const barChartData = {
//     labels: categories,
//     datasets: [
//       {
//         label: 'Number of Products',
//         data: categoryData,
//         backgroundColor: 'rgba(99, 102, 241, 0.7)',
//       },
//     ],
//   };

//   return (
//     <div className="space-y-8">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">Products</h1>
//       </div>
//       {loading && <p>Loading products...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && !error && (
//         <>
//           <div className="overflow-x-auto border rounded-md">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thumbnail</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price ($)</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Discount (%)</th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
//                   <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {products.map((product) => (
//                   <tr key={product._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <img src={product.thumbnail} alt={product.title} className="h-12 w-12 rounded-md object-cover" />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.title}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
//                     <td className="px-6 py-4 text-sm text-right text-gray-900">{product.price.toFixed(2)}</td>
//                     <td className="px-6 py-4 text-sm text-right text-gray-900">{product.discountPercentage.toFixed(2)}</td>
//                     <td className="px-6 py-4 text-sm text-right text-gray-900">{product.rating.toFixed(1)}</td>
//                     <td className="px-6 py-4 text-sm text-right text-gray-900">{product.stock}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <section>
//             <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
//             {products.length > 0 ? (
//               <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
//             ) : (
//               <p>No product data available for charts.</p>
//             )}
//           </section>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductsPage;




'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  TrendingDown, 
  Package,
  Star,
  DollarSign,
  AlertTriangle,
  Eye,
  MoreHorizontal
} from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface Product {
  _id: string;
  id?: number;
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories;
  };

  const getCategoryStats = () => {
    const categoryCount = products.reduce<Record<string, number>>((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});
    return categoryCount;
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'bg-red-100 text-red-800', icon: AlertTriangle };
    if (stock < 10) return { label: 'Low Stock', color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle };
    return { label: 'In Stock', color: 'bg-green-100 text-green-800', icon: Package };
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Chart data
  const categoryStats = getCategoryStats();
  const barChartData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        label: 'Number of Products',
        data: Object.values(categoryStats),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats),
        backgroundColor: [
          '#6366f1',
          '#8b5cf6',
          '#06b6d4',
          '#10b981',
          '#f59e0b',
          '#ef4444',
        ],
        borderWidth: 0,
      },
    ],
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading products</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={fetchProducts}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
          <p className="mt-2 text-gray-600">
            Manage and analyze your product inventory ({filteredProducts.length} of {products.length} products)
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Package className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-gray-900">
                  {products.filter(p => p.stock < 10).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, categories, or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              {getCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <div className="flex border border-gray-200 rounded-md">
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('table')}
                className="rounded-r-none"
              >
                Table
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-l-none"
              >
                Grid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Display */}
      {viewMode === 'table' ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.stock);
                    const StockIcon = stockStatus.icon;
                    
                    return (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0">
                              <img 
                                className="h-12 w-12 rounded-lg object-cover" 
                                src={product.thumbnail} 
                                alt={product.title}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = '/placeholder-product.png';
                                }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {product.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.brand}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline" className="capitalize">
                            {product.category}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex flex-col">
                            <span className="font-medium">${product.price.toFixed(2)}</span>
                            {product.discountPercentage > 0 && (
                              <span className="text-xs text-green-600">
                                {product.discountPercentage}% off
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <StockIcon className="h-4 w-4 mr-2" />
                            <Badge className={stockStatus.color}>
                              {product.stock} {stockStatus.label}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Star className={`h-4 w-4 mr-1 ${getRatingColor(product.rating)}`} />
                            <span className="text-sm font-medium">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            
            return (
              <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.png';
                    }}
                  />
                  {product.discountPercentage > 0 && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      -{product.discountPercentage}%
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-sm truncate">{product.title}</h3>
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className={`h-4 w-4 mr-1 ${getRatingColor(product.rating)}`} />
                        <span className="text-sm">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    
                    <Badge className={stockStatus.color} variant="outline">
                      {product.stock} in stock
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Category Distribution
            </CardTitle>
            <CardDescription>
              Product count by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar 
                data={barChartData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: { 
                    legend: { display: false }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Category Breakdown
            </CardTitle>
            <CardDescription>
              Distribution of products across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut 
                data={doughnutData} 
                options={{ 
                  responsive: true, 
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom'
                    }
                  }
                }} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductsPage;

