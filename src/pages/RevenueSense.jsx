import React from 'react';
import { motion } from 'framer-motion';
import { ChartBar, Building2, AlertCircle, FileText, TrendingUp } from 'lucide-react';

const RevenueSensePage = () => {
  const metrics = [
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      value: "₦5B+",
      description: "Additional Revenue Generated"
    },
    {
      icon: Building2,
      title: "Assets Optimized",
      value: "500+",
      description: "Properties Under Management"
    },
    {
      icon: AlertCircle,
      title: "Leakage Reduction",
      value: "40%",
      description: "In Revenue Leakage"
    },
    {
      icon: FileText,
      title: "Collection Rate",
      value: "95%",
      description: "Success Rate"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Content from your RevenueSense component */}
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Transform Government Revenue</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Leverage AI and blockchain technology to optimize government assets, 
                eliminate revenue leakage, and increase collection efficiency.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <metric.icon className="h-8 w-8 text-[#1c5bde] mb-4" />
                  <div className="text-2xl font-bold text-[#1c5bde]">{metric.value}</div>
                  <div className="text-sm font-medium">{metric.title}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RevenueSensePage;