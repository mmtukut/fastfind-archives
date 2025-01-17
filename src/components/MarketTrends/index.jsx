import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Building2, MapPin, ArrowUp, ArrowDown, 
  DollarSign, Users, Home, BarChart2, Calendar,
  Thermometer, Target, Clock, Activity, ChevronRight,
  Calculator, Percent
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell 
} from 'recharts';

const MarketTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [selectedArea, setSelectedArea] = useState(null);

  // Market Temperature Data
  const marketTemperature = {
    score: 8.5,
    status: "Hot Market",
    metrics: {
      avgDaysOnMarket: 15,
      listToSaleRatio: "98%",
      competitionLevel: "High",
      seasonalDemand: "Peak"
    },
    indicators: [
      { label: "Buyer Demand", value: 85, color: "#1c5bde" },
      { label: "Price Strength", value: 78, color: "#4f46e5" },
      { label: "Inventory Level", value: 32, color: "#818cf8" }
    ]
  };

  // Price Forecast Data
  const priceForecast = {
    predictions: [
      { period: 'Q1 2024', forecast: '+3.2%', confidence: '85%' },
      { period: 'Q2 2024', forecast: '+2.8%', confidence: '82%' },
      { period: 'Q3 2024', forecast: '+3.5%', confidence: '78%' },
      { period: 'Q4 2024', forecast: '+3.0%', confidence: '75%' }
    ],
    factors: [
      { factor: "Economic Growth", impact: "High", trend: "positive" },
      { factor: "Local Development", impact: "Medium", trend: "positive" },
      { factor: "Supply Constraints", impact: "High", trend: "negative" }
    ]
  };

  // Supply vs Demand Metrics
  const supplyDemandMetrics = {
    ratio: 0.75, // Below 1 indicates high demand
    trend: "increasing",
    monthsOfInventory: 2.3,
    newListings: "+5%",
    pendingSales: "+12%",
    buyerCompetition: {
      multipleOffers: "72%",
      avgOffersPerProperty: 3.8,
      aboveAskingSales: "45%"
    }
  };

  // Add these new data sections
  const calculators = [
    {
      title: "Mortgage Calculator",
      icon: Calculator,
      description: "Calculate monthly payments and total costs",
      metrics: ["Principal", "Interest", "Term", "Down Payment"]
    },
    {
      title: "Investment ROI",
      icon: TrendingUp,
      description: "Analyze potential return on investment",
      metrics: ["Purchase Price", "Rental Income", "Appreciation", "Expenses"]
    },
    {
      title: "Affordability Analysis",
      icon: DollarSign,
      description: "Determine your buying power",
      metrics: ["Income", "Debt", "Down Payment", "Interest Rate"]
    },
    {
      title: "Rental Yield",
      icon: Percent,
      description: "Calculate gross and net rental yields",
      metrics: ["Purchase Price", "Rental Income", "Expenses", "Vacancy Rate"]
    }
  ];

  const marketNews = [
    {
      category: "Policy Update",
      title: "New Housing Regulations Announced",
      summary: "Government introduces new policies to boost affordable housing",
      date: "2 hours ago",
      impact: "High",
      source: "Housing Authority"
    },
    {
      category: "Market Insight",
      title: "Property Prices Show Strong Growth",
      summary: "Q1 2024 shows 15% YoY increase in premium locations",
      date: "1 day ago",
      impact: "Medium",
      source: "Market Analysis"
    },
    {
      category: "Development",
      title: "Major Infrastructure Project Announced",
      summary: "New transportation hub to boost property values",
      date: "2 days ago",
      impact: "High",
      source: "Urban Planning"
    }
  ];

  const expertInsights = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Market Analyst",
      image: "/experts/sarah.jpg",
      prediction: "Market set for steady growth in Q2",
      confidence: 85,
      keyPoints: [
        "Strong economic indicators",
        "Infrastructure development",
        "Growing foreign investment"
      ]
    },
    {
      name: "Michael Chen",
      role: "Investment Strategist",
      image: "/experts/michael.jpg",
      prediction: "Premium locations to outperform market",
      confidence: 78,
      keyPoints: [
        "Limited supply in prime areas",
        "High rental demand",
        "Corporate expansion plans"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Market Temperature Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Temperature Score */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-4">Market Temperature</h2>
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Thermometer className="h-12 w-12 text-[#1c5bde]" />
                    </div>
                    <svg className="transform -rotate-90">
                      <circle
                        className="text-gray-200"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                      />
                      <circle
                        className="text-[#1c5bde]"
                        strokeWidth="8"
                        strokeDasharray={`${marketTemperature.score * 36.5} 365`}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="58"
                        cx="64"
                        cy="64"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#1c5bde]">
                      {marketTemperature.score}
                    </div>
                    <div className="text-lg font-medium text-gray-600">
                      {marketTemperature.status}
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(marketTemperature.metrics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    <div className="text-xl font-bold text-[#1c5bde]">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price Forecast Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Price Forecast</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forecast Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
              {priceForecast.predictions.map((pred) => (
                <div key={pred.period} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-2">{pred.period}</div>
                  <div className="text-2xl font-bold text-green-600">
                    {pred.forecast}
                  </div>
                  <div className="text-sm text-gray-500">
                    Confidence: {pred.confidence}
                  </div>
                </div>
              ))}
            </div>

            {/* Impact Factors */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700">Impact Factors</h3>
              {priceForecast.factors.map((factor) => (
                <div key={factor.factor} 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`p-2 rounded-full ${
                    factor.trend === 'positive' 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {factor.trend === 'positive' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  </div>
                  <div>
                    <div className="font-medium">{factor.factor}</div>
                    <div className="text-sm text-gray-600">
                      Impact: {factor.impact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Supply vs Demand Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Supply & Demand</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metrics */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Market Balance</h3>
                  <p className="text-sm text-gray-600">
                    Supply vs Demand Ratio
                  </p>
                </div>
                <div className="text-2xl font-bold text-[#1c5bde]">
                  {supplyDemandMetrics.ratio.toFixed(2)}
                </div>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div 
                  className="h-full bg-[#1c5bde] rounded-full"
                  style={{ width: `${supplyDemandMetrics.ratio * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    Months of Inventory
                  </div>
                  <div className="text-xl font-bold">
                    {supplyDemandMetrics.monthsOfInventory}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600 mb-1">
                    New Listings
                  </div>
                  <div className="text-xl font-bold text-green-600">
                    {supplyDemandMetrics.newListings}
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Metrics */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Buyer Competition</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Multiple Offers</span>
                  <span className="font-medium">
                    {supplyDemandMetrics.buyerCompetition.multipleOffers}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Offers/Property</span>
                  <span className="font-medium">
                    {supplyDemandMetrics.buyerCompetition.avgOffersPerProperty}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Above Asking</span>
                  <span className="font-medium">
                    {supplyDemandMetrics.buyerCompetition.aboveAskingSales}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Calculators Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map((calc) => (
              <motion.div
                key={calc.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#1c5bde]/10 rounded-lg">
                    <calc.icon className="h-6 w-6 text-[#1c5bde]" />
                  </div>
                  <h3 className="font-semibold">{calc.title}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {calc.description}
                </p>
                <div className="text-sm text-gray-500">
                  {calc.metrics.map((metric, i) => (
                    <span key={metric} className="inline-block">
                      {metric}
                      {i < calc.metrics.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors">
                  Calculate Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market News & Updates */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Market News & Updates</h2>
            <button className="text-[#1c5bde] hover:underline flex items-center gap-1">
              View All <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {marketNews.map((news) => (
              <motion.div
                key={news.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-[#1c5bde]/10 text-[#1c5bde] text-sm rounded-full">
                    {news.category}
                  </span>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
                <h3 className="font-semibold mb-2">{news.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Source: {news.source}</span>
                  <span className={`px-2 py-1 rounded-full ${
                    news.impact === 'High' 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {news.impact} Impact
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Insights */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-8">Expert Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertInsights.map((expert) => (
              <motion.div
                key={expert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-6 bg-gray-50 rounded-xl p-6"
              >
                <div className="flex-shrink-0">
                  <img 
                    src={expert.image} 
                    alt={expert.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{expert.name}</h3>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{expert.role}</span>
                  </div>
                  <p className="text-gray-800 mb-3">{expert.prediction}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-[#1c5bde] rounded-full"
                        style={{ width: `${expert.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">
                      {expert.confidence}% confidence
                    </span>
                  </div>
                  <div className="space-y-1">
                    {expert.keyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1c5bde]" />
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ... existing sections (Quick Stats, Market Analysis Cards, etc.) ... */}
    </div>
  );
};

export default MarketTrends;