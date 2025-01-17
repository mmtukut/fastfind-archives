import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Map, BarChart2, Clock, Layers, Info, X, Wallet, TrendingUp, ArrowUp, Building2, School, Hospital, Car, ChevronDown, Plus, Minus, Cpu, Bot, Send, Lightbulb, Loader2 } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import config from '../utils/config';
import { infrastructureData } from '../data/infrastructureData';
import { motion } from 'framer-motion';
import { InfrastructureMarker } from './InfrastructureMarker';
import '../styles/infrastructure.css';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

// Enhanced locations data
const locations = [
  {
    state: 'Federal Capital Territory',
    region: 'North Central',
    cities: [
      { 
        name: 'Abuja', 
        coordinates: [7.491, 9.082], 
        zone: 'Central',
        highlights: ['Federal Capital', 'Administrative Hub'],
        infrastructureScore: 95
      },
      { 
        name: 'Gwagwalada', 
        coordinates: [7.079, 8.947], 
        zone: 'Satellite',
        highlights: ['Education Hub', 'Growing Township'],
        infrastructureScore: 82
      },
      { 
        name: 'Kuje', 
        coordinates: [7.227, 8.879], 
        zone: 'Satellite',
        highlights: ['Agricultural Zone'],
        infrastructureScore: 78
      },
      { 
        name: 'Bwari', 
        coordinates: [7.381, 9.287], 
        zone: 'Satellite',
        highlights: ['Educational District'],
        infrastructureScore: 80
      }
    ]
  },
  {
    state: 'Gombe',
    region: 'North East',
    cities: [
      { 
        name: 'Gombe', 
        coordinates: [11.167, 10.283], 
        zone: 'Central',
        highlights: ['State Capital', 'Commercial Hub'],
        infrastructureScore: 85
      },
      { 
        name: 'Billiri', 
        coordinates: [11.217, 9.867], 
        zone: 'South',
        highlights: ['Educational Center'],
        infrastructureScore: 75
      },
      { 
        name: 'Kaltungo', 
        coordinates: [11.309, 9.820], 
        zone: 'South',
        highlights: ['Cultural Heritage'],
        infrastructureScore: 72
      },
      { 
        name: 'Akko', 
        coordinates: [11.167, 10.283], 
        zone: 'Central',
        highlights: ['Agricultural Hub'],
        infrastructureScore: 70
      },
      { 
        name: 'Dukku', 
        coordinates: [10.823, 10.772], 
        zone: 'North',
        highlights: ['Tourism'],
        infrastructureScore: 68
      },
      { 
        name: 'Yamaltu/Deba', 
        coordinates: [11.167, 10.283], 
        zone: 'East',
        highlights: ['Industrial Zone'],
        infrastructureScore: 73
      },
      { 
        name: 'Nafada', 
        coordinates: [11.095, 11.096], 
        zone: 'North',
        highlights: ['Historical Site'],
        infrastructureScore: 65
      },
      { 
        name: 'Funakaye', 
        coordinates: [11.237, 10.950], 
        zone: 'North East',
        highlights: ['Agricultural Center'],
        infrastructureScore: 67
      }
    ]
  },
  {
    state: 'Lagos',
    region: 'South West',
    cities: [
      { 
        name: 'Ikeja', 
        coordinates: [3.342, 6.601], 
        zone: 'Mainland',
        highlights: ['State Capital', 'Business District'],
        infrastructureScore: 92
      },
      { 
        name: 'Victoria Island', 
        coordinates: [3.426, 6.428], 
        zone: 'Island',
        highlights: ['Financial Hub', 'Luxury District'],
        infrastructureScore: 95
      },
      { 
        name: 'Lekki', 
        coordinates: [3.517, 6.458], 
        zone: 'Island',
        highlights: ['Tech Hub', 'New Development'],
        infrastructureScore: 90
      },
      { 
        name: 'Surulere', 
        coordinates: [3.350, 6.500], 
        zone: 'Mainland',
        highlights: ['Entertainment District'],
        infrastructureScore: 85
      }
    ]
  },
  {
    state: 'Rivers',
    region: 'South South',
    cities: [
      { 
        name: 'Port Harcourt', 
        coordinates: [7.033, 4.817], 
        zone: 'Central',
        highlights: ['State Capital', 'Oil & Gas Hub'],
        infrastructureScore: 88
      },
      { 
        name: 'Obio-Akpor', 
        coordinates: [7.050, 4.833], 
        zone: 'Metropolitan',
        highlights: ['Industrial Zone'],
        infrastructureScore: 85
      },
      { 
        name: 'Eleme', 
        coordinates: [7.117, 4.783], 
        zone: 'Industrial',
        highlights: ['Petrochemical Hub'],
        infrastructureScore: 82
      }
    ]
  }
];

// Enhanced filter section component
const EnhancedFilters = ({ 
  selectedState, 
  selectedCity, 
  activeCategory,
  handleStateChange,
  handleCityChange,
  setActiveCategory,
  availableCities 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Compact Filter Grid */}
      <div className="p-3">
        <div className="flex flex-wrap gap-3">
          {/* Location Selectors in a row */}
          <div className="flex-1 min-w-[200px] flex gap-2">
            <select
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 
                       focus:outline-none focus:ring-1 focus:ring-blue-500 
                       rounded-md bg-white"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <option value="">All States</option>
              {locations.map((loc) => (
                <option key={loc.state} value={loc.state}>
                  {loc.state} ({loc.region})
                </option>
              ))}
            </select>

            <select
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 
                       focus:outline-none focus:ring-1 focus:ring-blue-500 
                       rounded-md bg-white disabled:bg-gray-50"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">All Cities</option>
              {availableCities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Infrastructure Type Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['all', 'healthcare', 'education', 'transport', 'utilities'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors
                          ${activeCategory === category 
                            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                          }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedState || selectedCity || activeCategory !== 'all') && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {selectedState && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs
                             bg-blue-50 text-blue-700">
                {selectedState}
                <button
                  onClick={() => handleStateChange('')}
                  className="ml-1 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {selectedCity && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs
                             bg-green-50 text-green-700">
                {selectedCity}
                <button
                  onClick={() => handleCityChange('')}
                  className="ml-1 hover:text-green-800"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Add this demo data
const infrastructureOverview = {
  healthcare: {
    title: 'Healthcare',
    icon: Hospital,
    color: '#1c5bde',
    stats: {
      total: 245,
      operational: 220,
      inProgress: 25,
      coverage: 85,
      rating: 4.2,
      yearOverYear: '+12%'
    },
    facilities: [
      { type: 'Hospitals', count: 42 },
      { type: 'Clinics', count: 156 },
      { type: 'Emergency Centers', count: 28 },
      { type: 'Specialized Centers', count: 19 }
    ]
  },
  education: {
    title: 'Education',
    icon: School,
    color: '#2ecc71',
    stats: {
      total: 312,
      operational: 298,
      inProgress: 14,
      coverage: 88,
      rating: 4.0,
      yearOverYear: '+8%'
    },
    facilities: [
      { type: 'Universities', count: 15 },
      { type: 'Secondary Schools', count: 127 },
      { type: 'Primary Schools', count: 145 },
      { type: 'Technical Institutes', count: 25 }
    ]
  },
  transport: {
    title: 'Transport',
    icon: Car,
    color: '#f39c12',
    stats: {
      total: 178,
      operational: 165,
      inProgress: 13,
      coverage: 82,
      rating: 3.8,
      yearOverYear: '+15%'
    },
    facilities: [
      { type: 'Major Roads', count: 45 },
      { type: 'Bridges', count: 23 },
      { type: 'Bus Terminals', count: 68 },
      { type: 'Rail Stations', count: 42 }
    ]
  },
  utilities: {
    title: 'Utilities',
    icon: Building2,
    color: '#9b59b6',
    stats: {
      total: 198,
      operational: 182,
      inProgress: 16,
      coverage: 90,
      rating: 4.1,
      yearOverYear: '+10%'
    },
    facilities: [
      { type: 'Power Stations', count: 28 },
      { type: 'Water Treatment', count: 35 },
      { type: 'Waste Management', count: 42 },
      { type: 'Distribution Centers', count: 93 }
    ]
  }
};

// Add this component for the overview section
const InfrastructureOverview = ({ data, activeCategory }) => {
  const categories = activeCategory === 'all' 
    ? Object.values(data)
    : [data[activeCategory]].filter(Boolean);

  return (
    <div className="grid grid-cols-1 gap-4">
      {categories.map((category) => (
        <Card key={category.title} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="p-2 rounded-lg" 
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon 
                    className="h-5 w-5" 
                    style={{ color: category.color }} 
                  />
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </div>
              <span 
                className="text-sm font-medium px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: `${category.color}15`,
                  color: category.color 
                }}
              >
                {category.stats.yearOverYear}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stats Overview */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Total Facilities</p>
                    <p className="text-2xl font-semibold">{category.stats.total}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Coverage</p>
                    <p className="text-2xl font-semibold">{category.stats.coverage}%</p>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Operational</span>
                    <span className="text-orange-600">In Progress</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full"
                      style={{ 
                        width: `${(category.stats.operational / category.stats.total) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Facilities Breakdown */}
              <div className="space-y-2">
                {category.facilities.map((facility) => (
                  <div 
                    key={facility.type}
                    className="flex justify-between items-center p-2 rounded-lg bg-gray-50"
                  >
                    <span className="text-sm text-gray-600">{facility.type}</span>
                    <span className="text-sm font-medium">{facility.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Add property value impact data
const propertyValueImpact = {
  overview: {
    averageIncrease: '15.2%',
    timeFrame: '12 months',
    totalProperties: 1250
  },
  byInfrastructure: [
    {
      type: 'Healthcare',
      impact: '+18%',
      radius: '2km',
      details: 'Properties near hospitals and clinics',
      trend: 'increasing'
    },
    {
      type: 'Education',
      impact: '+12%',
      radius: '1.5km',
      details: 'Properties near schools and universities',
      trend: 'stable'
    },
    {
      type: 'Transport',
      impact: '+22%',
      radius: '1km',
      details: 'Properties near major transport hubs',
      trend: 'increasing'
    },
    {
      type: 'Utilities',
      impact: '+8%',
      radius: '3km',
      details: 'Properties near utility facilities',
      trend: 'stable'
    }
  ],
  hotspots: [
    {
      area: 'Central Business District',
      growth: '+25%',
      factors: ['Transport Hub', 'Business Centers']
    },
    {
      area: 'Educational Zone',
      growth: '+15%',
      factors: ['Universities', 'Research Centers']
    },
    {
      area: 'Healthcare District',
      growth: '+20%',
      factors: ['Major Hospitals', 'Medical Facilities']
    }
  ]
};

// Add Property Value Impact component
const PropertyValueImpact = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600" />
          Property Value Impact
        </CardTitle>
        <p className="text-sm text-gray-500">
          Impact of infrastructure on property values
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600">Average Increase</p>
            <p className="text-2xl font-bold text-blue-700">{data.overview.averageIncrease}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Time Frame</p>
            <p className="text-2xl font-bold text-blue-700">{data.overview.timeFrame}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Properties</p>
            <p className="text-2xl font-bold text-blue-700">{data.overview.totalProperties}</p>
          </div>
        </div>

        {/* Impact by Infrastructure Type */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Impact by Infrastructure</h3>
          {data.byInfrastructure.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.type}</p>
                <p className="text-xs text-gray-500">Within {item.radius} radius</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  parseFloat(item.impact) > 15 ? 'text-green-600' : 
                  parseFloat(item.impact) > 10 ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {item.impact}
                </p>
                <p className="text-xs text-gray-500">{item.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Value Hotspots */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">Value Hotspots</h3>
          <div className="grid grid-cols-1 gap-2">
            {data.hotspots.map((hotspot, index) => (
              <div 
                key={index}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium">{hotspot.area}</p>
                  <span className="text-green-600 font-bold">{hotspot.growth}</span>
                </div>
                <div className="flex gap-2">
                  {hotspot.factors.map((factor, i) => (
                    <span 
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InvestmentHotspots = () => {
  const hotspots = [
    {
      area: "Tech District",
      roi: "+25%",
      projects: 8,
      status: "High Growth",
      type: "Commercial"
    },
    {
      area: "Medical City",
      roi: "+20%",
      projects: 5,
      status: "Emerging",
      type: "Healthcare"
    },
    {
      area: "Education Hub",
      roi: "+18%",
      projects: 6,
      status: "Stable",
      type: "Institutional"
    }
  ];

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Map className="h-4 w-4 text-blue-600" />
          Investment Hotspots
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-2">
          {hotspots.map((spot, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <div>
                <p className="font-medium text-sm">{spot.area}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                    {spot.type}
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    {spot.projects} projects
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-green-600 font-bold text-sm">{spot.roi}</p>
                <p className="text-xs text-gray-500">{spot.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const DevelopmentTimeline = () => {
  const timeline = [
    {
      phase: "Q4 2023",
      status: "Completed",
      projects: ["Healthcare Hub", "Transport Terminal"]
    },
    {
      phase: "Q1 2024",
      status: "In Progress",
      projects: ["Education Center", "Smart Grid"]
    },
    {
      phase: "Q2 2024",
      status: "Planned",
      projects: ["Tech Park", "Green Space"]
    }
  ];

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Clock className="h-4 w-4 text-blue-600" />
          Development Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="space-y-3">
          {timeline.map((period, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-blue-200">
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500" />
              <div className="mb-1">
                <span className="text-sm font-medium">{period.phase}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  period.status === 'Completed' ? 'bg-green-100 text-green-700' :
                  period.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {period.status}
                </span>
              </div>
              <div className="flex gap-2">
                {period.projects.map((project, i) => (
                  <span 
                    key={i}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {project}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Add AI Market Insights component
const AIMarketInsights = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [prompt, setPrompt] = useState('');

  const marketPredictions = [
    {
      type: "Growth Forecast",
      prediction: "+18% YoY",
      confidence: 85,
      factors: ["Infrastructure Development", "Economic Indicators"],
      trend: "Upward",
      timeframe: "Next 12 months"
    },
    {
      type: "Investment Opportunity",
      areas: ["Tech Corridor", "Medical District"],
      potentialROI: "22-25%",
      riskLevel: "Moderate"
    }
  ];

  const aiRecommendations = [
    {
      strategy: "Premium Residential",
      timing: "Immediate Entry",
      confidence: 92,
      reasoning: "Strong infrastructure growth + high demand"
    },
    {
      strategy: "Commercial Development",
      timing: "Q2 2024",
      confidence: 88,
      reasoning: "Upcoming tech hub expansion"
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-white">
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2">
          <Cpu className="h-5 w-5 text-blue-600" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Assistant Chat */}
        <div className="bg-white p-3 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-medium">AI Assistant</h3>
          </div>
          <div className="space-y-2">
            <textarea
              className="w-full p-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ask about market trends, investment opportunities, or infrastructure impact..."
              rows="2"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              className="w-full py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 
                       flex items-center justify-center gap-2"
              onClick={() => {
                setIsLoading(true);
                // Simulate AI response
                setTimeout(() => {
                  setAiResponse("Based on current trends and infrastructure development plans, this area shows strong potential for investment, particularly in residential and commercial sectors...");
                  setIsLoading(false);
                }, 1500);
              }}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Get AI Insights
            </button>
          </div>
          {aiResponse && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
              <p className="text-gray-700">{aiResponse}</p>
            </div>
          )}
        </div>

        {/* Market Predictions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            Market Predictions
          </h3>
          {marketPredictions.map((prediction, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">{prediction.type}</span>
                {prediction.prediction && (
                  <span className="text-green-600 font-bold text-sm">
                    {prediction.prediction}
                  </span>
                )}
              </div>
              {prediction.confidence && (
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-1">
                {prediction.factors?.map((factor, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                    {factor}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Investment Recommendations */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-yellow-600" />
            Smart Recommendations
          </h3>
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="bg-white p-3 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium">{rec.strategy}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  rec.confidence >= 90 ? 'bg-green-100 text-green-700' :
                  rec.confidence >= 80 ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {rec.confidence}% Confidence
                </span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{rec.reasoning}</p>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">{rec.timing}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const InfrastructureAnalysis = () => {
  const [activeLayer, setActiveLayer] = useState('all');
  const [selectedArea, setSelectedArea] = useState('downtown');
  const [timeRange, setTimeRange] = useState('1y');
  const [propertyValues, setPropertyValues] = useState([]);
  const [infrastructureScore, setInfrastructureScore] = useState(85);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [mapData, setMapData] = useState({
    infrastructureScore: 85,
    dataLayers: []
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentInfraData, setCurrentInfraData] = useState(
    infrastructureData['Federal Capital Territory']
  );
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);

  // Sample timeline data
  const timelineData = [
    { project: 'New Metro Station', status: 'In Progress', completion: '2025' },
    { project: 'Hospital Expansion', status: 'Planning', completion: '2026' },
    { project: 'School District Update', status: 'Completed', completion: '2024' },
  ];

  // Updated property value data for 2024
  const propertyValueData = [
    { month: 'Jan 2024', value: 250000, impact: 2.5 },
    { month: 'Feb 2024', value: 255000, impact: 2.0 },
    { month: 'Mar 2024', value: 258000, impact: 1.2 },
    { month: 'Apr 2024', value: 262000, impact: 1.5 },
    { month: 'May 2024', value: 270000, impact: 3.1 },
    { month: 'Jun 2024', value: 275000, impact: 1.9 },
    { month: 'Jul 2024', value: 280000, impact: 1.8 },
    { month: 'Aug 2024', value: 285000, impact: 1.8 },
    { month: 'Sep 2024', value: 290000, impact: 1.7 },
    { month: 'Oct 2024', value: 295000, impact: 1.7 },
    { month: 'Nov 2024', value: 300000, impact: 1.7 },
    { month: 'Dec 2024', value: 305000, impact: 1.7 }
  ];

  // Calculate year-over-year growth
  const yearlyGrowth = ((propertyValueData[propertyValueData.length - 1].value - 
                        propertyValueData[0].value) / propertyValueData[0].value * 100).toFixed(1);

  // Prepare data for the statistics chart
  const infrastructureStats = [
    {
      name: 'Schools',
      count: infrastructureData.categories.find(c => c.id === 'schools').items.length,
      color: '#4CAF50'  // Green
    },
    {
      name: 'Hospitals',
      count: infrastructureData.categories.find(c => c.id === 'hospitals').items.length,
      color: '#F44336'  // Red
    },
    {
      name: 'Transport',
      count: infrastructureData.categories.find(c => c.id === 'transport').items.length,
      color: '#2196F3'  // Blue
    },
    {
      name: 'Roads',
      count: infrastructureData.categories.find(c => c.id === 'roads').items.length,
      color: '#FF9800'  // Orange
    },
    {
      name: 'Utilities',
      count: infrastructureData.categories.find(c => c.id === 'utilities').items.length,
      color: '#9C27B0'  // Purple
    },
    {
      name: 'Development',
      count: infrastructureData.categories.find(c => c.id === 'development').items.length,
      color: '#795548'  // Brown
    }
  ];

  // Update the overviewCards data structure
  const overviewCards = [
    {
      title: 'Healthcare',
      icon: Hospital,
      score: 92,
      change: '+4%',
      count: '24 facilities',
      color: '#1c5bde',
      details: {
        active: '20 operational',
        upcoming: '4 planned',
        rating: '4.5/5',
        coverage: '92% area'
      }
    },
    {
      title: 'Education',
      icon: School,
      score: 88,
      change: '+6%',
      count: '35 institutions',
      color: '#2ecc71',
      details: {
        schools: '22 schools',
        universities: '3 universities',
        rating: '4.2/5',
        coverage: '88% area'
      }
    },
    {
      title: 'Transport',
      icon: Car,
      score: 85,
      change: '+3%',
      count: '18 routes',
      color: '#f39c12',
      details: {
        mainRoutes: '12 major',
        subRoutes: '6 minor',
        rating: '4.0/5',
        coverage: '85% area'
      }
    },
    {
      title: 'Utilities',
      icon: Building2,
      score: 90,
      change: '+5%',
      count: '42 points',
      color: '#9b59b6',
      details: {
        water: '15 points',
        power: '18 points',
        waste: '9 points',
        coverage: '90% area'
      }
    }
  ];

  // Add city-specific metrics
  const cityMetrics = {
    area: 'Abuja',  // or any other city
    totalPopulation: '3.2M',
    infrastructureGrowth: '12%',
    developmentZones: [
      {
        name: 'Central Business District',
        score: 95,
        priority: 'high'
      },
      {
        name: 'Residential Zone North',
        score: 88,
        priority: 'medium'
      }
      // ... more zones
    ]
  };

  // Update locations to include Gombe and enhance the data structure
  const locations = [
    {
      state: 'Federal Capital Territory',
      cities: [
        { name: 'Abuja', coordinates: [7.491, 9.082], zone: 'Central' },
        { name: 'Gwagwalada', coordinates: [7.079, 8.947], zone: 'South' },
        { name: 'Kuje', coordinates: [7.227, 8.879], zone: 'South' },
        { name: 'Bwari', coordinates: [7.381, 9.287], zone: 'North' }
      ]
    },
    {
      state: 'Gombe',
      cities: [
        { name: 'Gombe', coordinates: [11.167, 10.283], zone: 'Central' },
        { name: 'Billiri', coordinates: [11.217, 9.867], zone: 'South' },
        { name: 'Kaltungo', coordinates: [11.309, 9.820], zone: 'South' },
        { name: 'Akko', coordinates: [11.167, 10.283], zone: 'Central' },
        { name: 'Dukku', coordinates: [10.823, 10.772], zone: 'North' },
        { name: 'Funakaye', coordinates: [10.523, 10.702], zone: 'North' }
        
      ]
    },
    // ... other existing states ...
  ];

  // Update cities when state changes
  useEffect(() => {
    if (selectedState) {
      const stateData = locations.find(loc => loc.state === selectedState);
      setAvailableCities(stateData ? stateData.cities : []);
      setSelectedCity('');
    } else {
      setAvailableCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  // Handle state change
  const handleStateChange = (stateName) => {
    setSelectedState(stateName);
    if (stateName && infrastructureData[stateName]) {
      setCurrentInfraData(infrastructureData[stateName]);
    } else {
      setCurrentInfraData(infrastructureData['Federal Capital Territory']);
    }
  };

  // Handle city change
  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    if (cityName) {
      const cityData = availableCities.find(city => city.name === cityName);
      if (cityData && map.current) {
        map.current.flyTo({
          center: cityData.coordinates,
          zoom: 13,
          duration: 2000
        });
      }
    }
  };

  // First, let's create sample infrastructure data
  const infrastructurePoints = [
    {
      id: 1,
      type: 'hospital',
      name: 'Federal Teaching Hospital',
      location: 'Gombe Central',
      coordinates: [11.167, 10.283],
      status: 'operational',
      capacity: '500 beds',
      rating: 4.5,
      lastUpdated: '2024',
      image: '/images/hospital1.jpg',
      details: {
        services: ['Emergency', 'Surgery', 'Outpatient'],
        coverage: '25km radius',
        staff: '1,200+',
        investment: '₦2.5B'
      }
    },
    {
      id: 2,
      type: 'school',
      name: 'Gombe State University',
      location: 'Tudun Wada',
      coordinates: [11.172, 10.287],
      status: 'operational',
      capacity: '15,000 students',
      rating: 4.2,
      lastUpdated: '2024',
      image: '/images/university1.jpg',
      details: {
        facilities: ['Library', 'Labs', 'Sports Complex'],

        programs: '45+',
        staff: '500+',
        investment: '₦1.8B'
      }
    },
    // Add more infrastructure points...
  ];

  // Add this console log at the very top of your component
  console.log('Initial infrastructureData:', infrastructureData);

  useEffect(() => {
    console.log('Current infrastructure data:', infrastructureData);
  }, []);

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [11.167, 10.283],
      zoom: 12,
      pitch: 45
    });

    map.current.on('load', () => {
      setTimeout(() => {
        console.log('Adding markers to map...');
        
        if (!infrastructureData?.categories) {
          console.error('No infrastructure data available:', infrastructureData);
          return;
        }

        try {
          infrastructureData.categories.forEach(category => {
            console.log(`Processing category: ${category.type}`);
            
            if (!category.items?.length) {
              console.warn(`No items found for category: ${category.type}`);
              return;
            }

            category.items.forEach(item => {
              console.log(`Creating marker for: ${item.name}`);
              
              if (!item.coordinates || item.coordinates.length !== 2) {
                console.warn(`Invalid coordinates for item: ${item.name}`);
                return;
              }

              const markerEl = document.createElement('div');
              markerEl.className = 'marker-wrapper';
              
              // Add visible debug element
              markerEl.style.width = '20px';
              markerEl.style.height = '20px';
              markerEl.style.background = category.color || 'red';
              markerEl.style.borderRadius = '50%';

              ReactDOM.render(
                <InfrastructureMarker
                  data={{
                    category: {
                      color: category.color || '#000000',
                      icon: category.icon || '📍'
                    },
                    ...item
                  }}
                  onClick={() => {
                    console.log('Marker clicked:', item.name);
                    setSelectedInfrastructure(item);
                  }}
                  isHovered={selectedInfrastructure?.id === item.id}
                />,
                markerEl
              );

              const marker = new mapboxgl.Marker({
                element: markerEl,
                anchor: 'bottom',
              })
                .setLngLat(item.coordinates)
                .addTo(map.current);

              console.log(`Marker added for ${item.name} at ${item.coordinates}`);
            });
          });
        } catch (error) {
          console.error('Error adding markers:', error);
        }
      }, 1000);
    });

    return () => {
      document.querySelectorAll('.marker-wrapper').forEach(el => {
        ReactDOM.unmountComponentAtNode(el);
        el.remove();
      });
      map.current?.remove();
    };
  }, [selectedState, selectedCity, activeCategory, selectedInfrastructure]);

  // Filter infrastructure points based on selected filters with safety checks
  const getFilteredInfrastructure = () => {
    if (!infrastructureData?.categories) return [];

    let filtered = infrastructureData.categories;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(cat => cat.type === activeCategory);
    }

    if (selectedState) {
      filtered = filtered.map(category => ({
        ...category,
        points: (category.points || []).filter(point => 
          point.location?.includes(selectedState)
        )
      }));
    }

    if (selectedCity) {
      filtered = filtered.map(category => ({
        ...category,
        points: (category.points || []).filter(point => 
          point.location?.includes(selectedCity)
        )
      }));
    }

    return filtered;
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50 px-4 pb-4">
      <div className="max-w-7xl mx-auto space-y-4">
        <EnhancedFilters 
          selectedState={selectedState}
          selectedCity={selectedCity}
          activeCategory={activeCategory}
          handleStateChange={handleStateChange}
          handleCityChange={handleCityChange}
          setActiveCategory={setActiveCategory}
          availableCities={availableCities}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle>Infrastructure Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div 
                  ref={mapContainer} 
                  className="h-[400px] w-full relative"
                />
              </CardContent>
            </Card>
            
            {/* Secondary Section - Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfrastructureOverview 
                data={infrastructureOverview}
                activeCategory={activeCategory}
              />
              <PropertyValueImpact data={propertyValueImpact} />
            </div>

            {/* Tertiary Section */}
            <DevelopmentTimeline />
          </div>

          {/* Right Column (AI & Insights) - 1/3 width */}
          <div className="space-y-4">
            {/* Priority order for right column */}
            <AIMarketInsights />
            <InvestmentHotspots />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureAnalysis;

