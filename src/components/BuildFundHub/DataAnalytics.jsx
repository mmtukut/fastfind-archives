import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart2, TrendingUp, PieChart, MapPin,
  Calendar, Download, Filter, Share2
} from 'lucide-react';

export const DataAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  
  const analyticsData = {
    revenue: {
      total: "₦125.5M",
      growth: "+15.2%",
      breakdown: [
        { category: "Property Tax", amount: "₦65.3M", percentage: 52 },
        { category: "Development Levy", amount: "₦32.1M", percentage: 26 },
        { category: "Business Permits", amount: "₦28.1M", percentage: 22 }
      ]
    },
    predictions: [
      {
        period: "Q2 2024",
        predicted: "₦142.3M",
        confidence: 92
      },
      {
        period: "Q3 2024",
        predicted: "₦156.8M",
        confidence: 87
      }
    ],
    hotspots: [
      {
        area: "Central Business District",
        revenue: "₦45.2M",
        growth: "+22%",
        opportunities: 15
      },
      {
        area: "Industrial Zone",
        revenue: "₦38.7M",
        growth: "+18%",
        opportunities: 12
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Data Analytics Dashboard</h2>
        <div className="flex items-center gap-3">
          <select 
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200"
          >
            <option value="revenue">Revenue Analysis</option>
            <option value="compliance">Compliance Metrics</option>
            <option value="growth">Growth Patterns</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1c5bde] text-white rounded-lg">
            <Share2 className="h-4 w-4" />
            Share Insights
          </button>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg col-span-2">
          <h3 className="text-lg font-bold mb-4">Revenue Breakdown</h3>
          <div className="space-y-4">
            {analyticsData.revenue.breakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{item.category}</div>
                  <div className="text-sm text-gray-600">{item.amount}</div>
                </div>
                <div className="w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1c5bde]" 
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">Predictions</h3>
          <div className="space-y-4">
            {analyticsData.predictions.map((prediction) => (
              <div key={prediction.period} className="p-4 bg-gray-50 rounded-lg">
                <div className="font-semibold">{prediction.period}</div>
                <div className="text-2xl font-bold text-[#1c5bde] my-2">
                  {prediction.predicted}
                </div>
                <div className="text-sm text-gray-600">
                  Confidence: {prediction.confidence}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Revenue Hotspots */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-6">Revenue Hotspots</h3>
        <div className="grid grid-cols-2 gap-6">
          {analyticsData.hotspots.map((hotspot) => (
            <div key={hotspot.area} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-[#1c5bde]" />
                <span className="font-semibold">{hotspot.area}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Revenue</div>
                  <div className="font-bold">{hotspot.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Growth</div>
                  <div className="font-bold text-green-600">{hotspot.growth}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Opportunities</div>
                  <div className="font-bold">{hotspot.opportunities}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 