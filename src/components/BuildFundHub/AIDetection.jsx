import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Satellite, Building, AlertTriangle, CheckCircle, MapPin,
  Camera, Brain, Search, Calendar, BarChart2, Filter,
  Download, Share2, Printer, Clock, Maximize2, ZoomIn,
  Settings, History, Bell
} from 'lucide-react';
import { SatelliteView } from './SatelliteView';

export const AIDetection = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const timeframes = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const filters = [
    { value: 'all', label: 'All Detections' },
    { value: 'unregistered', label: 'Unregistered Properties' },
    { value: 'modifications', label: 'Unauthorized Modifications' },
    { value: 'commercial', label: 'Commercial Activities' },
    { value: 'high-risk', label: 'High Risk Areas' }
  ];

  const mockDetectionResults = {
    unregisteredProperties: [
      {
        id: 1,
        location: "7.4905, 4.5521",
        type: "Commercial Building",
        confidence: 98.5,
        estimatedRevenue: "₦2.5M",
        status: "Unregistered",
        riskLevel: "High",
        lastUpdated: "2 hours ago",
        changes: [
          { date: "2024-03-15", type: "Structure Extension" },
          { date: "2024-03-10", type: "Usage Change" }
        ]
      },
      {
        id: 2,
        location: "7.4925, 4.5535",
        type: "Residential Extension",
        confidence: 96.8,
        estimatedRevenue: "₦850K",
        status: "Unauthorized Modification"
      }
    ],
    statistics: {
      scannedArea: "2.5 km²",
      detectionsCount: 15,
      potentialRevenue: "₦25M",
      accuracy: "98.2%",
      changeRate: "+15%",
      complianceRate: "75%"
    },
    trends: {
      weekly: [
        { day: 'Mon', detections: 12 },
        { day: 'Tue', detections: 15 },
        { day: 'Wed', detections: 10 },
        { day: 'Thu', detections: 18 },
        { day: 'Fri', detections: 14 }
      ]
    },
    alerts: [
      {
        id: 1,
        type: 'high-risk',
        message: 'Rapid construction detected in restricted zone',
        timestamp: '10 minutes ago'
      },
      {
        id: 2,
        type: 'warning',
        message: 'Multiple unauthorized modifications detected',
        timestamp: '1 hour ago'
      }
    ]
  };

  const handleAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setResults(mockDetectionResults);
      setAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Advanced Control Panel */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Satellite className="h-6 w-6 text-[#1c5bde]" />
            <h3 className="text-xl font-bold">Advanced AI Detection System</h3>
          </div>
          
          {/* Control Actions */}
          <div className="flex items-center gap-4">
            {/* Timeframe Selector */}
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200"
            >
              {timeframes.map(tf => (
                <option key={tf.value} value={tf.value}>{tf.label}</option>
              ))}
            </select>

            {/* Filter Selector */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200"
            >
              {filters.map(f => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>

            <button
              onClick={handleAnalysis}
              disabled={analyzing}
              className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                analyzing 
                  ? 'bg-gray-200 cursor-not-allowed' 
                  : 'bg-[#1c5bde] hover:bg-[#0c0d8a]'
              } text-white transition-all`}
            >
              {analyzing ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
                  Analyzing
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Start Analysis
                </>
              )}
            </button>
          </div>
        </div>

        {/* Replace the existing live detection feed with SatelliteView */}
        <SatelliteView />

        {/* Quick Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm flex items-center gap-1 text-gray-600 hover:text-[#1c5bde]">
              <History className="h-4 w-4" />
              History
            </button>
            <button className="px-3 py-1 text-sm flex items-center gap-1 text-gray-600 hover:text-[#1c5bde]">
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm flex items-center gap-1 text-gray-600 hover:text-[#1c5bde]">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="px-3 py-1 text-sm flex items-center gap-1 text-gray-600 hover:text-[#1c5bde]">
              <Share2 className="h-4 w-4" />
              Share
            </button>
            <button className="px-3 py-1 text-sm flex items-center gap-1 text-gray-600 hover:text-[#1c5bde]">
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Results Panel */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Alerts Section */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recent Alerts</h3>
              <Bell className="h-5 w-5 text-[#1c5bde]" />
            </div>
            <div className="space-y-3">
              {results.alerts.map(alert => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-lg flex items-center justify-between ${
                    alert.type === 'high-risk' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.type === 'high-risk' ? 'text-red-500' : 'text-yellow-500'
                    }`} />
                    <span>{alert.message}</span>
                  </div>
                  <span className="text-sm text-gray-500">{alert.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics and Trends */}
          <div className="grid grid-cols-2 gap-6">
            {/* Statistics */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Detection Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(results.statistics).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-lg font-bold text-[#1c5bde]">{value}</div>
                    <div className="text-sm text-gray-600">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">Detection Trends</h3>
              <div className="h-48 flex items-end justify-between">
                {results.trends.weekly.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-[#1c5bde]/20 hover:bg-[#1c5bde] transition-all rounded-t"
                      style={{ height: `${day.detections * 8}px` }}
                    />
                    <span className="text-sm text-gray-600 mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Detections */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Detailed Detections</h3>
            <div className="space-y-4">
              {results.unregisteredProperties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      property.status === 'Unregistered' 
                        ? 'bg-red-100' 
                        : 'bg-yellow-100'
                    }`}>
                      {property.status === 'Unregistered' 
                        ? <AlertTriangle className="h-5 w-5 text-red-500" />
                        : <Building className="h-5 w-5 text-yellow-500" />
                      }
                    </div>
                    <div>
                      <div className="font-semibold">{property.type}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {property.location}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Last updated: {property.lastUpdated}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="font-semibold text-[#1c5bde]">
                        {property.estimatedRevenue}
                      </div>
                      <div className="text-sm text-gray-600">
                        Potential Revenue
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {property.confidence}%
                      </div>
                      <div className="text-sm text-gray-600">
                        Confidence
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      property.riskLevel === 'High' 
                        ? 'bg-red-100 text-red-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {property.riskLevel} Risk
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}; 