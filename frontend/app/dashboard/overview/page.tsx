"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import {
  Package, DollarSign, Star, AlertTriangle, TrendingUp, TrendingDown,
  PieChart as PieIcon, BarChart3, Percent, Award, Target,
} from "lucide-react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, Area, AreaChart,
} from "recharts";

/* ----------------------- types ----------------------- */
interface Product {
  id?: number;
  _id?: string;
  title: string;
  price: number;
  rating: number;
  stock: number;
  category: string;
  discountPercentage?: number;
}

/* ----------------------- helpers --------------------- */
const palette = [
  "#3b82f6", "#8b5cf6", "#06b6d4", "#10b981",
  "#f59e0b", "#ef4444", "#14b8a6", "#e879f9"
];

/* ----------------------- component ------------------- */
export default function OverviewPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://insightory.onrender.com/api/products", { next: { revalidate: 60 } })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(json => setProducts(json.products ?? []))
      .catch(() => setError("Couldn't load products"))
      .finally(() => setLoading(false));
  }, []);

  const data = useMemo(() => {
    if (!products.length) return null;

    // Basic calculations
    const totalValue = products.reduce((a, p) => a + p.price * p.stock, 0);
    const lowStock = products.filter(p => p.stock < 10).length;
    const avgRating = products.reduce((a, p) => a + p.rating, 0) / products.length;
    const avgDisc = products.reduce((a, p) => a + (p.discountPercentage || 0), 0) / products.length;

    // Category aggregates
    const catMap = new Map<string, { count: number, value: number, color: string }>();
    products.forEach(p => {
      const m = catMap.get(p.category) ?? { count: 0, value: 0, color: palette[catMap.size % palette.length] };
      m.count++; m.value += p.price * p.stock; catMap.set(p.category, m);
    });

    // Top performing products (by inventory value)
    const topProducts = [...products]
      .sort((a, b) => (b.price * b.stock) - (a.price * a.stock))
      .slice(0, 5)
      .map((p, i) => ({
        name: p.title.length > 25 ? p.title.substring(0, 25) + "..." : p.title,
        value: p.price * p.stock,
        stock: p.stock,
        price: p.price,
        rating: p.rating,
        color: palette[i % palette.length]
      }));

    // Stock distribution for better insights
    const stockRanges = [
      { range: "0-10", count: 0, label: "Critical (0-10)" },
      { range: "11-50", count: 0, label: "Low (11-50)" },
      { range: "51-100", count: 0, label: "Medium (51-100)" },
      { range: "100+", count: 0, label: "High (100+)" }
    ];

    products.forEach(p => {
      if (p.stock <= 10) stockRanges[0].count++;
      else if (p.stock <= 50) stockRanges[1].count++;
      else if (p.stock <= 100) stockRanges[2].count++;
      else stockRanges[3].count++;
    });

    return {
      totalProducts: products.length,
      totalValue,
      lowStock,
      avgRating,
      avgDisc,
      pieData: [...catMap].map(([name, v]) => ({ name, value: v.count, color: v.color })),
      valueByCat: [...catMap].map(([name, v]) => ({ name, value: v.value, color: v.color })),
      topProducts,
      stockDistribution: stockRanges.map((r, i) => ({ ...r, color: palette[i] })),
      avgValuePerProduct: +(totalValue / products.length).toFixed(0),
      highestValueCategory: [...catMap].reduce((a, [name, v]) => v.value > a.value ? { name, value: v.value } : a, { name: "", value: 0 }),
    };
  }, [products]);

  if (loading) return (
    <div className="flex justify-center items-center h-[60vh]">
      <span className="text-slate-400 text-lg">Loading dashboard...</span>
    </div>
  );
  if (error || !data) return (
    <div className="flex justify-center items-center h-[60vh]">
      <span className="text-red-500 text-lg">{error}</span>
    </div>
  );

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Inventory Analytics Dashboard
        </h1>
        <p className="text-slate-600">
          Real-time insights into your product portfolio and inventory performance
        </p>
      </header>

      {/* Key Metrics */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Products"
          value={data.totalProducts}
          description="Total items in catalog"
          icon={<Package />}
          color="blue"
        />
        <MetricCard
          title="Total Inventory Value"
          value={`$${data.totalValue.toLocaleString()}`}
          description="Sum of (price × stock) for all products"
          icon={<DollarSign />}
          color="green"
        />
        <MetricCard
          title="Low Stock Alert"
          value={data.lowStock}
          description="Products with less than 10 units"
          icon={<AlertTriangle />}
          color="red"
        />
        <MetricCard
          title="Average Rating"
          value={data.avgRating.toFixed(1)}
          description="Mean customer rating across all products"
          icon={<Star />}
          color="yellow"
        />
      </section>

      {/* Secondary Metrics */}
      <section className="grid gap-6 sm:grid-cols-3">
        <MetricCard
          title="Avg Value per Product"
          value={`$${data.avgValuePerProduct}`}
          description="Average inventory value per item"
          icon={<Target />}
          color="purple"
        />
        <MetricCard
          title="Highest Value Category"
          value={data.highestValueCategory.name}
          description={`$${data.highestValueCategory.value.toLocaleString()} total value`}
          icon={<Award />}
          color="indigo"
        />
        <MetricCard
          title="Average Discount"
          value={`${data.avgDisc.toFixed(1)}%`}
          description="Mean discount percentage offered"
          icon={<Percent />}
          color="pink"
        />
      </section>

      {/* Analytics Charts */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Category Distribution */}
        <ChartCard
          title="Product Distribution by Category"
          description="Number of products in each category"
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                data={data.pieData}
                cx="50%" cy="50%"
                outerRadius={100}
                stroke="#ffffff"
                strokeWidth={2}
              >
                {data.pieData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                formatter={(value, name) => [
                  `${value} products (${((Number(value) / data.totalProducts) * 100).toFixed(1)}%)`,
                  name
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Stock Level Distribution */}
        <ChartCard
          title="Stock Level Distribution"
          description="How many products fall into each stock range"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.stockDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value} products`, 'Count']}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {data.stockDistribution.map((d, i) => (
                  <Cell key={i} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* Top Products */}
      <section>
        <ChartCard
          title="Top 5 Products by Inventory Value"
          description="Products with highest total value (price × stock quantity)"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              layout="vertical"
              data={data.topProducts}
              margin={{ left: 100, right: 20, top: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                type="number"
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px'
                }}
                formatter={(value, name, props) => [
                  `$${(Number(value)).toLocaleString()}`,
                  `Inventory Value (${props.payload.stock} units × $${props.payload.price})`
                ]}
              />
              <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                {data.topProducts.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>
    </div>
  );
}

/* ----------- Subcomponents ----------- */
type MetricCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo' | 'pink';
};

function MetricCard({ title, value, description, icon, color }: MetricCardProps) {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    red: "bg-red-50 border-red-200 text-red-700",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
    purple: "bg-purple-50 border-purple-200 text-purple-700",
    indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
    pink: "bg-pink-50 border-pink-200 text-pink-700",
  } as const;

  return (
    <Card className={`border-2 ${colorClasses[color]} transition-all duration-200 hover:shadow-md`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
        <span className="h-5 w-5">{icon}</span>
      </CardHeader>
      <CardContent className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

type ChartCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
