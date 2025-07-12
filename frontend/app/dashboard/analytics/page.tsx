"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const salesData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  datasets: [
    {
      label: 'Sales ($)',
      data: [1200, 1900, 1700, 2200, 2100, 2500, 2300],
      borderColor: 'rgba(99, 102, 241, 1)',
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      tension: 0.4,
    },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <section>
        <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
        <Line data={salesData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
      </section>
      {/* Add more analytics widgets or charts here as needed */}
    </div>
  );
}
