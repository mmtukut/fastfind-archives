import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, TrendingUp, Activity, Zap, 
  Shield, Target, ArrowRight, ChevronRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Infrastructure = () => {
  const features = [
    {
      title: "Infrastructure Analysis",
      description: "Comprehensive scoring and insights for infrastructure quality across different regions",
      icon: BarChart2,
      path: "/infrastructure/analysis",
      stats: [
        { label: "Regions Analyzed", value: "50+" },
        { label: "Data Points", value: "10,000+" },
        { label: "Updated", value: "Daily" }
      ]
    },
    {
      title: "Market Trends",
      description: "Real-time market analysis and property value trends based on infrastructure development",
      icon: TrendingUp,
      path: "/infrastructure/market",
      stats: [
        { label: "Price Trends", value: "Live" },
        { label: "Market Insights", value: "24/7" },
        { label: "Historical Data", value: "5 Years" }
      ]
    }
  ];

  const insights = [
    {
      icon: Activity,
      title: "Infrastructure Impact",
      description: "See how infrastructure development directly affects property values"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Get instant notifications about infrastructure changes in your area"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Evaluate infrastructure-related risks before investing"
    },
    {
      icon: Target,
      title: "Growth Opportunities",
      description: "Identify areas with high infrastructure development potential"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-[#f8fafc] border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent"
            >
              Infrastructure Intelligence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-neutral-600 mb-8"
            >
              Make informed investment decisions with our comprehensive infrastructure analysis tools
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#1c5bde]/10"
            >
              <div className="flex items-center gap-4 p-8">
                <div className="p-3 bg-[#1c5bde]/10 rounded-xl">
                  <feature.icon className="h-8 w-8 text-[#1c5bde]" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-800">{feature.title}</h2>
              </div>

              <div className="px-8 pb-8">
                <p className="text-neutral-600 mb-8">
                  {feature.description}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {feature.stats.map((stat, i) => (
                    <div key={i} className="text-center p-3 rounded-lg bg-[#f8fafc]">
                      <div className="font-bold text-lg text-[#1c5bde]">
                        {stat.value}
                      </div>
                      <div className="text-sm text-neutral-600">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  to={feature.path}
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 bg-[#1c5bde] text-white rounded-xl hover:bg-[#1c5bde]/90 transition-all duration-300 shadow-sm hover:shadow-[#1c5bde]/25 hover:shadow-lg"
                >
                  Explore {feature.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Insights */}
      <section className="bg-white border-y border-[#1c5bde]/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
              Key Insights
            </h2>
            <p className="text-neutral-600">
              Leverage our infrastructure data to make better investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="bg-[#1c5bde]/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1c5bde]/10 transition-colors">
                  <insight.icon className="h-8 w-8 text-[#1c5bde]" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-neutral-800">{insight.title}</h3>
                <p className="text-neutral-600">{insight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-[#1c5bde] to-[#1c5bde]/90 rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Make Data-Driven Decisions?
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Start exploring our infrastructure analysis tools today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/infrastructure/analysis"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#1c5bde] rounded-xl hover:bg-[#f8fafc] transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              Start Analysis
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/infrastructure/market"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ff8533] text-white rounded-xl hover:bg-[#ff8533]/90 transition-all duration-300 shadow-sm hover:shadow-lg"
            >
              View Market Trends
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Infrastructure; 