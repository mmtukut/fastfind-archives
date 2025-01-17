import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar, PieChart, TrendingUp, Download, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MortgageCalculator = () => {
  // State for input values
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(15);
  const [loanTerm, setLoanTerm] = useState(20);
  const [downPayment, setDownPayment] = useState(20);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [insuranceCost, setInsuranceCost] = useState(0.5);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  // State for calculated values
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  // Calculate mortgage details
  useEffect(() => {
    const calculateMortgage = () => {
      // Calculate loan amount after down payment
      const principal = loanAmount * (1 - downPayment / 100);
      
      // Convert annual interest rate to monthly
      const monthlyRate = (interestRate / 100) / 12;
      
      // Convert years to months
      const totalMonths = loanTerm * 12;
      
      // Calculate monthly payment using mortgage formula
      const monthlyPayment = principal * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
      
      // Add property tax and insurance
      const monthlyTax = (loanAmount * (propertyTax / 100)) / 12;
      const monthlyInsurance = (loanAmount * (insuranceCost / 100)) / 12;
      const totalMonthlyPayment = monthlyPayment + monthlyTax + monthlyInsurance;
      
      // Calculate total payment and interest
      const totalPayment = totalMonthlyPayment * totalMonths;
      const totalInterest = totalPayment - principal;

      // Generate amortization schedule
      let balance = principal;
      const schedule = [];
      
      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
        
        if (month % 12 === 0 || month === 1 || month === totalMonths) {
          schedule.push({
            month,
            payment: monthlyPayment,
            principalPayment,
            interestPayment,
            balance: Math.max(0, balance),
            totalInterest: interestPayment * month
          });
        }
      }

      setMonthlyPayment(totalMonthlyPayment);
      setTotalPayment(totalPayment);
      setTotalInterest(totalInterest);
      setAmortizationSchedule(schedule);
    };

    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment, propertyTax, insuranceCost, paymentFrequency]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for pie chart
  const pieData = [
    { name: 'Principal', value: loanAmount * (1 - downPayment / 100) },
    { name: 'Interest', value: totalInterest },
    { name: 'Tax & Insurance', value: totalPayment - totalInterest - (loanAmount * (1 - downPayment / 100)) }
  ];

  const COLORS = ['#1c5bde', '#ff6b6b', '#51cf66'];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Mortgage Calculator
          </CardTitle>
          <CardDescription>
            Calculate your monthly mortgage payments and view detailed amortization schedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Loan Amount */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Loan Amount: {formatCurrency(loanAmount)}
                </label>
                <Slider
                  value={[loanAmount]}
                  onValueChange={([value]) => setLoanAmount(value)}
                  min={1000000}
                  max={100000000}
                  step={100000}
                  className="w-full"
                />
              </div>

              {/* Interest Rate */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="h-4 w-4" />
                  Interest Rate: {interestRate}%
                </label>
                <Slider
                  value={[interestRate]}
                  onValueChange={([value]) => setInterestRate(value)}
                  min={1}
                  max={30}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Loan Term */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Loan Term: {loanTerm} years
                </label>
                <Slider
                  value={[loanTerm]}
                  onValueChange={([value]) => setLoanTerm(value)}
                  min={1}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Down Payment */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <DollarSign className="h-4 w-4" />
                  Down Payment: {downPayment}%
                </label>
                <Slider
                  value={[downPayment]}
                  onValueChange={([value]) => setDownPayment(value)}
                  min={0}
                  max={90}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Property Tax */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="h-4 w-4" />
                  Property Tax: {propertyTax}%
                </label>
                <Slider
                  value={[propertyTax]}
                  onValueChange={([value]) => setPropertyTax(value)}
                  min={0}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Insurance */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Percent className="h-4 w-4" />
                  Insurance: {insuranceCost}%
                </label>
                <Slider
                  value={[insuranceCost]}
                  onValueChange={([value]) => setInsuranceCost(value)}
                  min={0}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Payment Frequency */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Frequency</label>
                <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Monthly Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#1c5bde]">
                      {formatCurrency(monthlyPayment)}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Total Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#1c5bde]">
                      {formatCurrency(totalPayment)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Payment Breakdown Pie Chart */}
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RePieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </RePieChart>
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
                    setLoanAmount(5000000);
                    setInterestRate(15);
                    setLoanTerm(20);
                    setDownPayment(20);
                    setPropertyTax(1.2);
                    setInsuranceCost(0.5);
                  }}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Calculator
                </Button>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Amortization Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-2 text-left border">Year</th>
                    <th className="p-2 text-left border">Payment</th>
                    <th className="p-2 text-left border">Principal</th>
                    <th className="p-2 text-left border">Interest</th>
                    <th className="p-2 text-left border">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationSchedule.map((row) => (
                    <tr key={row.month} className="hover:bg-gray-50">
                      <td className="p-2 border">{Math.ceil(row.month / 12)}</td>
                      <td className="p-2 border">{formatCurrency(row.payment)}</td>
                      <td className="p-2 border">{formatCurrency(row.principalPayment)}</td>
                      <td className="p-2 border">{formatCurrency(row.interestPayment)}</td>
                      <td className="p-2 border">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MortgageCalculator; 