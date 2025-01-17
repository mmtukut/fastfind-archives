import React from 'react';
import { motion } from 'framer-motion';
import { Users, Coins, ArrowRight, ChartBar } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const BuildFundHub = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "CommunityPulse",
      description: "Shape your community's future through blockchain-verified voting on infrastructure projects",
      icon: Users,
      path: "/buildfund-hub/community-pulse",
      stats: [
        { label: "Active Projects", value: "15+" },
        { label: "Community Members", value: "5,000+" },
        { label: "Total Votes", value: "15,678" }
      ]
    },
    {
      title: "SmartVest",
      description: "Smart real estate investment platform with AI-powered insights and automated returns",
      icon: Coins,
      path: "/buildfund-hub/smart-vest",
      stats: [
        { label: "Min Investment", value: "₦1,000" },
        { label: "Total Invested", value: "₦500M+" },
        { label: "Avg. ROI", value: "25%" }
      ]
    },
    {
      title: "RevenueSense",
      description: "AI-powered government asset optimization and revenue generation platform",
      icon: ChartBar,
      path: "/buildfund-hub/revenue-sense",
      stats: [
        { label: "Revenue Increase", value: "30%" },
        { label: "Assets Managed", value: "500+" },
        { label: "Collection Rate", value: "95%" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">BuildFund Hub</h1>
          <p className="text-xl text-gray-600">
            Revolutionizing real estate investment and community development in Nigeria
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#1c5bde]/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-[#1c5bde]" />
                </div>
                <h2 className="text-2xl font-bold">{feature.title}</h2>
              </div>

              <p className="text-gray-600 mb-8">
                {feature.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {feature.stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="font-bold text-lg text-[#1c5bde]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to={feature.path}
                className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildFundHub; 