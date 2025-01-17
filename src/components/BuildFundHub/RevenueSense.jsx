import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Building2, AlertCircle, FileText, 
  Search, Database, Shield, Banknote, BarChart3, MapPin,
  Brain, Eye, Clock, Smartphone, Receipt, PieChart,
  Download, Share2, ArrowRight
} from 'lucide-react';
import { AIDetection } from './AIDetection';
import { SmartCollection } from './SmartCollection';
import { DataAnalytics } from './DataAnalytics';

export const RevenueSense = () => {
  const [activeTab, setActiveTab] = useState('detection');

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

  const features = [
    {
      title: "AI-Powered Asset Discovery",
      description: "Satellite imagery analysis for unregistered properties",
      icon: Brain,
      highlight: "40% increase in registered properties"
    },
    {
      title: "Smart Collection System",
      description: "Digital payment integration with real-time tracking",
      icon: Receipt,
      highlight: "95% collection success rate"
    },
    {
      title: "Analytics Dashboard",
      description: "Real-time insights and revenue forecasting",
      icon: BarChart3,
      highlight: "Data-driven decision making"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1c5bde]/5 to-white py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-6">
              Transform Government Revenue Collection
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Leverage AI and blockchain technology to optimize government assets, 
              eliminate revenue leakage, and increase collection efficiency.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all">
                Schedule Demo
              </button>
              <button className="px-6 py-3 border border-[#1c5bde] text-[#1c5bde] rounded-lg hover:bg-[#1c5bde]/5">
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <metric.icon className="h-8 w-8 text-[#1c5bde] mb-4" />
              <div className="text-2xl font-bold text-[#1c5bde]">{metric.value}</div>
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-gray-50"
              >
                <feature.icon className="h-8 w-8 text-[#1c5bde] mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-sm font-medium text-[#1c5bde]">
                  {feature.highlight}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex gap-4 border-b border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('detection')}
            className={`px-4 py-2 ${
              activeTab === 'detection' 
                ? 'border-b-2 border-[#1c5bde] text-[#1c5bde]' 
                : 'text-gray-600'
            }`}
          >
            AI Detection
          </button>
          <button
            onClick={() => setActiveTab('collection')}
            className={`px-4 py-2 ${
              activeTab === 'collection' 
                ? 'border-b-2 border-[#1c5bde] text-[#1c5bde]' 
                : 'text-gray-600'
            }`}
          >
            Smart Collection
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 ${
              activeTab === 'analytics' 
                ? 'border-b-2 border-[#1c5bde] text-[#1c5bde]' 
                : 'text-gray-600'
            }`}
          >
            Data Analytics
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'detection' && <AIDetection />}
        {activeTab === 'collection' && <SmartCollection />}
        {activeTab === 'analytics' && <DataAnalytics />}
      </div>

      {/* CTA Section */}
      <div className="bg-[#1c5bde]/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Revenue?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Join forward-thinking governments that have increased their revenue by up to 40%
          </p>
          <button className="px-8 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all">
            Request Implementation Plan
          </button>
        </div>
      </div>
    </div>
  );
}; 