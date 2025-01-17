import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, TrendingUp, Download, RefreshCw, Clock } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const InvestmentROICalculator = () => {
  // State for input values
  const [purchasePrice, setPurchasePrice] = useState(50000000);
  const [downPayment, setDownPayment] = useState(20);
  const [annualAppreciation, setAnnualAppreciation] = useState(5);
  const [rentalIncome, setRentalIncome] = useState(200000);
  const [operatingExpenses, setOperatingExpenses] = useState(15);
  const [holdingPeriod, setHoldingPeriod] = useState(5);
  const [renovationCosts, setRenovationCosts] = useState(1000000);

  // State for calculated values
  const [monthlyROI, setMonthlyROI] = useState(0);
  const [annualROI, setAnnualROI] = useState(0);
  const [totalROI, setTotalROI] = useState(0);
  const [projectedValue, setProjectedValue] = useState(0);
  const [cashFlow, setCashFlow] = useState([]);

  // Calculate ROI
  useEffect(() => {
    const calculateROI = () => {
      // Initial investment
      const initialInvestment = (purchasePrice * (downPayment / 100)) + renovationCosts;
      
      // Monthly calculations
      const monthlyRent = rentalIncome;
      const monthlyExpenses = (rentalIncome * (operatingExpenses / 100));
      const monthlyNetIncome = monthlyRent - monthlyExpenses;
      
      // Annual calculations
      const annualNetIncome = monthlyNetIncome * 12;
      const annualROIValue = (annualNetIncome / initialInvestment) * 100;
      
      // Future value calculation
      const futureValue = purchasePrice * Math.pow(1 + (annualAppreciation / 100), holdingPeriod);
      const totalProfit = (futureValue - purchasePrice) + (annualNetIncome * holdingPeriod);
      const totalROIValue = (totalProfit / initialInvestment) * 100;

      // Generate cash flow data
      const cashFlowData = [];
      for (let year = 0; year <= holdingPeriod; year++) {
        const propertyValue = purchasePrice * Math.pow(1 + (annualAppreciation / 100), year);
        const cumulativeRentalIncome = annualNetIncome * year;
        cashFlowData.push({
          year,
          propertyValue,
          cumulativeReturn: cumulativeRentalIncome + (propertyValue - purchasePrice),
          rentalIncome: cumulativeRentalIncome
        });
      }

      setMonthlyROI(monthlyNetIncome);
      setAnnualROI(annualROIValue);
      setTotalROI(totalROIValue);
      setProjectedValue(futureValue);
      setCashFlow(cashFlowData);
    };

    calculateROI();
  }, [purchasePrice, downPayment, annualAppreciation, rentalIncome, operatingExpenses, holdingPeriod, renovationCosts]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Investment ROI Calculator
          </CardTitle>
          <CardDescription>
            Calculate your potential return on investment for real estate properties
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Purchase Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Purchase Price: {formatCurrency(purchasePrice)}
                </label>
                <Slider
                  value={[purchasePrice]}
                  onValueChange={([value]) => setPurchasePrice(value)}
                  min={10000000}
                  max={500000000}
                  step={1000000}
                  className="w-full"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="h-4 w-4" />
                  Down Payment: {downPayment}%
                </label>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  min={10}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Annual Appreciation */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="h-4 w-4" />
                  Annual Appreciation: {annualAppreciation}%
                </label>
                <Slider
                  value={[annualAppreciation]}
                  onValueChange={([value]) => setAnnualAppreciation(value)}
                  min={0}
                  max={20}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Monthly Rental Income */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Monthly Rental Income: {formatCurrency(rentalIncome)}
                </label>
                <Slider
                  value={[rentalIncome]}
                  onValueChange={([value]) => setRentalIncome(value)}
                  min={50000}
                  max={2000000}
                  step={10000}
                  className="w-full"
                />
              </div>

              {/* Operating Expenses */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="h-4 w-4" />
                  Operating Expenses: {operatingExpenses}%
                </label>
                <Slider
                  value={[operatingExpenses]}
                  onValueChange={([value]) => setOperatingExpenses(value)}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Holding Period */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="h-4 w-4" />
                  Holding Period: {holdingPeriod} years
                </label>
                <Slider
                  value={[holdingPeriod]}
                  onValueChange={([value]) => setHoldingPeriod(value)}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Renovation Costs */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Renovation Costs: {formatCurrency(renovationCosts)}
                </label>
                <Slider
                  value={[renovationCosts]}
                  onValueChange={([value]) => setRenovationCosts(value)}
                  min={0}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Monthly Cash Flow</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#0e109f]">
                      {formatCurrency(monthlyROI)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Annual ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#0e109f]">
                      {annualROI.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Total ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#0e109f]">
                      {totalROI.toFixed(1)}%
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Future Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#0e109f]">
                      {formatCurrency(projectedValue)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* ROI Chart */}
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Projected Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={cashFlow}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Years', position: 'bottom' }} />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="propertyValue" 
                          name="Property Value"
                          stroke="#0e109f" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="cumulativeReturn" 
                          name="Total Return"
                          stroke="#10B981" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rentalIncome" 
                          name="Rental Income"
                          stroke="#6366F1" 
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button className="flex-1" variant="outline" onClick={() => window.print()}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  className="flex-1" 
                  onClick={() => {
                    setPurchasePrice(50000000);
                    setDownPayment(20);
                    setAnnualAppreciation(5);
                    setRentalIncome(200000);
                    setOperatingExpenses(15);
                    setHoldingPeriod(5);
                    setRenovationCosts(1000000);
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Calculator
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentROICalculator; 