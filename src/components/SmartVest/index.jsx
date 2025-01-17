import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, Building2, TrendingUp, PieChart, 
  ArrowRight, Wallet, BarChart2, Shield 
} from 'lucide-react';

const SmartVest = () => {
  const [activeTab, setActiveTab] = useState('opportunities');

  const investmentOpportunities = [
    {
      id: 1,
      title: "Premium Office Complex",
      location: "Victoria Island, Lagos",
      type: "Commercial",
      minInvestment: "₦5,000",
      expectedROI: "22%",
      duration: "24 months",
      totalValue: "₦500M",
      funded: 75,
      risk: "Medium",
      highlights: [
        "Prime location",
        "Pre-leased to Fortune 500 company",
        "Quarterly returns"
      ]
    },
    {
      id: 2,
      title: "Smart Homes Development",
      location: "Lekki Phase 1, Lagos",
      type: "Residential",
      minInvestment: "₦1,000",
      expectedROI: "18%",
      duration: "36 months",
      totalValue: "₦300M",
      funded: 45,
      risk: "Low",
      highlights: [
        "Solar-powered homes",
        "Smart home technology",
        "High rental demand area"
      ]
    }
  ];

  const stats = [
    {
      title: "Total Investments",
      value: "₦500M+",
      icon: Coins,
      color: "text-blue-600"
    },
    {
      title: "Active Projects",
      value: "15",
      icon: Building2,
      color: "text-green-600"
    },
    {
      title: "Avg. ROI",
      value: "25%",
      icon: TrendingUp,
      color: "text-purple-600"
    },
    {
      title: "Investors",
      value: "5,000+",
      icon: Wallet,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Smart Real Estate Investment
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Start investing in premium real estate from ₦1,000 with AI-powered insights
            </motion.p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white p-4 rounded-xl border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-bold text-xl">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Investment Opportunities - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Investment Opportunities</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-[#1c5bde] hover:underline">
                  View All
                </button>
              </div>
            </div>

            {/* Investment Cards */}
            {investmentOpportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl border hover:shadow-lg transition-shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{opportunity.title}</h3>
                    <p className="text-gray-600 text-sm">{opportunity.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${opportunity.risk === 'Low' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {opportunity.risk} Risk
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">
                      {opportunity.minInvestment}
                    </div>
                    <div className="text-xs text-gray-600">Min. Investment</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-green-600">
                      {opportunity.expectedROI}
                    </div>
                    <div className="text-xs text-gray-600">Expected ROI</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-900">
                      {opportunity.duration}
                    </div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                </div>

                {/* Funding Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Funding Progress</span>
                    <span>{opportunity.funded}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${opportunity.funded}%` }}
                    />
                  </div>
                </div>

                {/* Highlights */}
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Highlights</h4>
                  <div className="flex flex-wrap gap-2">
                    {opportunity.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors flex items-center justify-center gap-2">
                  Invest Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right Column - Analytics & Tools */}
          <div className="space-y-6">
            {/* Portfolio Overview */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">Your Portfolio</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Invested</span>
                  <span className="font-medium">₦0.00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Investments</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Returns</span>
                  <span className="font-medium text-green-600">₦0.00</span>
                </div>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <PieChart className="h-4 w-4" />
                  View Details
                </button>
              </div>
            </div>

            {/* AI Market Insights */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="font-semibold mb-4">AI Market Insights</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div className="text-sm">
                    <span className="font-medium text-green-700">+15% Growth</span>
                    <p className="text-green-600">Victoria Island market trend</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <BarChart2 className="h-5 w-5 text-blue-600" />
                  <div className="text-sm">
                    <span className="font-medium text-blue-700">High Demand</span>
                    <p className="text-blue-600">Commercial properties in Lekki</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors">
                  View Full Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartVest; 