import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Users, Landmark, ChartBar, Building2, ArrowRight } from 'lucide-react';
import { CommunityPulse } from './CommunityPulse';
import { SmartVest } from './SmartVest';
import { RevenueSense } from './RevenueSense';

const BuildFundHub = () => {
  const [activeTab, setActiveTab] = useState('community');

  const features = [
    {
      id: 'community',
      title: "CommunityPulse",
      description: "Shape Your Community's Future",
      subFeatures: [
        "Vote on infrastructure projects with NIN verification",
        "Track development progress in real-time",
        "Earn community points for active participation",
        "Blockchain-verified voting system"
      ],
      icon: Users,
      action: "Join Community",
      highlight: "5,000+ Active Members"
    },
    {
      id: 'invest',
      title: "SmartVest",
      description: "Smart Real Estate Investment",
      subFeatures: [
        "Start investing from ₦1,000",
        "AI-powered investment recommendations",
        "Real-time portfolio tracking",
        "Automated returns distribution"
      ],
      icon: Coins,
      action: "Start Investing",
      highlight: "₦500M+ Total Investments"
    },
    {
      id: 'revenuesense',
      title: "RevenueSense",
      description: "Smart Government Asset Optimization",
      subFeatures: [
        "AI-powered revenue leakage detection",
        "Digital twin property mapping",
        "Automated billing and collection",
        "Smart zoning opportunities"
      ],
      icon: ChartBar,
      action: "Maximize Revenue",
      highlight: "30% Revenue Increase"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-[#1c5bde]/10 via-white to-[#1c5bde]/10 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              FastFind BuildFund Hub
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Where Community Development Meets Smart Investment
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <button className="px-8 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all">
                Get Started
              </button>
              <button className="px-8 py-3 border border-[#1c5bde] text-[#1c5bde] rounded-lg hover:bg-[#1c5bde]/5 transition-all">
                Watch Demo
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Main Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#1c5bde]/10 rounded-lg">
                    <feature.icon className="h-6 w-6 text-[#1c5bde]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {feature.subFeatures.map((subFeature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#1c5bde]" />
                      <span className="text-gray-600">{subFeature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#1c5bde]">
                    {feature.highlight}
                  </span>
                  <button 
                    onClick={() => setActiveTab(feature.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all"
                  >
                    {feature.action}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Feature Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {activeTab === 'community' ? (
            <CommunityPulse />
          ) : activeTab === 'invest' ? (
            <SmartVest />
          ) : (
            <RevenueSense />
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1c5bde]/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1c5bde] mb-2">₦5B+</div>
              <div className="text-gray-600">Total Investment Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1c5bde] mb-2">50+</div>
              <div className="text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1c5bde] mb-2">15K+</div>
              <div className="text-gray-600">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1c5bde] mb-2">25%</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildFundHub;