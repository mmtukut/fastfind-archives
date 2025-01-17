import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, CreditCard, Receipt, ArrowUpRight, 
  Clock, CheckCircle, AlertTriangle, Banknote,
  Filter, Download, Calendar, PieChart
} from 'lucide-react';

export const SmartCollection = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  const collectionStats = {
    today: {
      totalCollected: "₦15.5M",
      transactions: 234,
      successRate: "98.5%",
      pendingAmount: "₦2.1M"
    },
    recentTransactions: [
      {
        id: 1,
        amount: "₦350,000",
        type: "Property Tax",
        status: "success",
        time: "10 minutes ago",
        payer: "Lagos Properties Ltd"
      },
      {
        id: 2,
        amount: "₦1,200,000",
        type: "Development Levy",
        status: "pending",
        time: "25 minutes ago",
        payer: "Crown Estate Management"
      }
    ],
    paymentMethods: [
      { method: "Bank Transfer", percentage: 45 },
      { method: "Card Payment", percentage: 30 },
      { method: "USSD", percentage: 15 },
      { method: "Cash", percentage: 10 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Smart Collection System</h2>
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1c5bde] text-white rounded-lg">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Wallet className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-gray-600">Total Collected</span>
          </div>
          <div className="text-2xl font-bold">{collectionStats.today.totalCollected}</div>
          <div className="flex items-center gap-1 text-green-600 text-sm mt-2">
            <ArrowUpRight className="h-4 w-4" />
            <span>12.5% vs yesterday</span>
          </div>
        </div>
        
        {/* Similar stat boxes for other metrics */}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold">Recent Transactions</h3>
          <button className="text-[#1c5bde] text-sm">View All</button>
        </div>
        <div className="space-y-4">
          {collectionStats.recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  transaction.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  {transaction.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  )}
                </div>
                <div>
                  <div className="font-semibold">{transaction.amount}</div>
                  <div className="text-sm text-gray-600">{transaction.type}</div>
                  <div className="text-sm text-gray-500">{transaction.payer}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{transaction.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold mb-6">Payment Methods</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {collectionStats.paymentMethods.map((method) => (
              <div key={method.method} className="flex items-center justify-between">
                <span>{method.method}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#1c5bde]" 
                      style={{ width: `${method.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600">{method.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="relative h-48">
            {/* Add a pie chart visualization here */}
          </div>
        </div>
      </div>
    </div>
  );
};