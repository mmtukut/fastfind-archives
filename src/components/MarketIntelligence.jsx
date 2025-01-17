import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Target, Building2 } from 'lucide-react';

const MarketIntelligence = ({ type = 'trends' }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent">
            Market Intelligence
          </h1>
          
          {/* Content will vary based on type prop */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-600">
              Market Intelligence content for: {type}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketIntelligence; 