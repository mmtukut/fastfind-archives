import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, CreditCard, TrendingUp, 
  DollarSign, ChevronRight, Building,
  PieChart, Calendar, Shield, ArrowRight
} from 'lucide-react';

const SmartFinanceHub = () => {
  const [activeCalculator, setActiveCalculator] = useState('rent-to-own');

  const calculators = [
    {
      id: 'rent-to-own',
      title: 'Rent-to-Own Calculator',
      icon: Building,
      description: 'Calculate your path to ownership through rental payments',
      metrics: ['Monthly Rent', 'Property Value', 'Term Length', 'Down Payment']
    },
    {
      id: 'mortgage',
      title: 'Mortgage Calculator',
      icon: Calculator,
      description: 'Plan your mortgage payments and see pre-approval chances',
      metrics: ['Loan Amount', 'Interest Rate', 'Term', 'Monthly Payment']
    },
    {
      id: 'roi',
      title: 'Investment ROI',
      icon: TrendingUp,
      description: 'Calculate potential returns on your property investment',
      metrics: ['Purchase Price', 'Rental Income', 'Appreciation', 'Expenses']
    },
    {
      id: 'credit',
      title: 'Credit Builder',
      icon: CreditCard,
      description: 'Track and improve your credit score for better rates',
      metrics: ['Credit Score', 'Payment History', 'Credit Age', 'Utilization']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Smart Finance Hub
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Intelligent tools to make property financing simple and accessible
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all">
                Get Started
              </button>
              <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-all">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Calculator Navigation */}
          <div className="space-y-4">
            {calculators.map((calc) => (
              <motion.button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  activeCalculator === calc.id
                    ? 'bg-white shadow-lg border-l-4 border-[#1c5bde]'
                    : 'bg-gray-50 hover:bg-white hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    activeCalculator === calc.id
                      ? 'bg-[#1c5bde]/10 text-[#1c5bde]'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    <calc.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{calc.title}</h3>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Calculator Display */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <CalculatorDisplay calculator={calculators.find(c => c.id === activeCalculator)} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Pre-Approved Financing',
                description: 'Get instant pre-approval for property financing based on your profile'
              },
              {
                icon: Calendar,
                title: 'Flexible Payment Plans',
                description: 'Customize your payment schedule to match your financial situation'
              },
              {
                icon: PieChart,
                title: 'Financial Analytics',
                description: 'Track your investment performance and financial health'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl hover:shadow-md transition-all"
              >
                <div className="p-3 bg-[#1c5bde]/10 w-fit rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-[#1c5bde]" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Calculator Display Component
const CalculatorDisplay = ({ calculator }) => {
  if (!calculator) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{calculator.title}</h2>
      <div className="space-y-6">
        {calculator.metrics.map((metric, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {metric}
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1c5bde] focus:border-[#1c5bde]"
              placeholder={`Enter ${metric.toLowerCase()}`}
            />
          </div>
        ))}
        <button className="w-full bg-[#1c5bde] text-white py-3 rounded-lg hover:bg-[#0c0d8a] transition-colors">
          Calculate
        </button>
      </div>
    </div>
  );
};

export default SmartFinanceHub; 