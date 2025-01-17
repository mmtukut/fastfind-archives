import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Wallet, Download, RefreshCw, CreditCard, Building } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AffordabilityCalculator = () => {
  // State for input values
  const [annualIncome, setAnnualIncome] = useState(5000000);
  const [monthlyDebts, setMonthlyDebts] = useState(100000);
  const [downPayment, setDownPayment] = useState(20);
  const [interestRate, setInterestRate] = useState(15);
  const [loanTerm, setLoanTerm] = useState(25);
  const [propertyTax, setPropertyTax] = useState(1.2);
  const [insuranceCost, setInsuranceCost] = useState(0.5);

  // State for calculated values
  const [maxHomePrice, setMaxHomePrice] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState({});

  // Calculate affordability
  useEffect(() => {
    const calculateAffordability = () => {
      // Monthly income
      const monthlyIncome = annualIncome / 12;
      
      // Maximum monthly payment (using 28% rule for housing expenses)
      const maxMonthlyPayment = monthlyIncome * 0.28;
      
      // Calculate DTI ratio
      const dtiRatio = (monthlyDebts / monthlyIncome) * 100;
      
      // Calculate maximum loan amount based on monthly payment
      const monthlyRate = (interestRate / 100) / 12;
      const totalMonths = loanTerm * 12;
      
      // Maximum loan calculation using mortgage payment formula
      const maxLoan = maxMonthlyPayment * 
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / 
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)));
      
      // Maximum home price considering down payment
      const maxPrice = maxLoan / (1 - (downPayment / 100));
      
      // Monthly tax and insurance
      const monthlyTax = (maxPrice * (propertyTax / 100)) / 12;
      const monthlyInsurance = (maxPrice * (insuranceCost / 100)) / 12;
      
      // Monthly principal and interest
      const monthlyPI = maxLoan * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
        (Math.pow(1 + monthlyRate, totalMonths) - 1);

      // Set calculated values
      setMaxHomePrice(maxPrice);
      setMonthlyPayment(monthlyPI + monthlyTax + monthlyInsurance);
      setDebtToIncomeRatio(dtiRatio);
      setMonthlyExpenses({
        principalAndInterest: monthlyPI,
        propertyTax: monthlyTax,
        insurance: monthlyInsurance,
        otherDebts: monthlyDebts
      });
    };

    calculateAffordability();
  }, [annualIncome, monthlyDebts, downPayment, interestRate, loanTerm, propertyTax, insuranceCost]);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Prepare data for charts
  const expensesData = [
    { name: 'Principal & Interest', value: monthlyExpenses.principalAndInterest },
    { name: 'Property Tax', value: monthlyExpenses.propertyTax },
    { name: 'Insurance', value: monthlyExpenses.insurance },
    { name: 'Other Debts', value: monthlyExpenses.otherDebts }
  ];

  const COLORS = ['#1c5bde', '#4f46e5', '#818cf8', '#c7d2fe'];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-6 w-6" />
            Affordability Calculator
          </CardTitle>
          <CardDescription>
            Calculate how much house you can afford based on your income and expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Annual Income */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Wallet className="h-4 w-4" />
                  Annual Income: {formatCurrency(annualIncome)}
                </label>
                <Slider
                  value={[annualIncome]}
                  onValueChange={([value]) => setAnnualIncome(value)}
                  min={1000000}
                  max={50000000}
                  step={100000}
                  className="w-full"
                />
              </div>

              {/* Monthly Debts */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <CreditCard className="h-4 w-4" />
                  Monthly Debts: {formatCurrency(monthlyDebts)}
                </label>
                <Slider
                  value={[monthlyDebts]}
                  onValueChange={([value]) => setMonthlyDebts(value)}
                  min={0}
                  max={1000000}
                  step={10000}
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
                  min={5}
                  max={50}
                  step={1}
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
                  <Building className="h-4 w-4" />
                  Loan Term: {loanTerm} years
                </label>
                <Slider
                  value={[loanTerm]}
                  onValueChange={([value]) => setLoanTerm(value)}
                  min={5}
                  max={30}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Maximum Home Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-[#1c5bde]">
                      {formatCurrency(maxHomePrice)}
                    </p>
                  </CardContent>
                </Card>

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
              </div>

              {/* Expense Breakdown Chart */}
              <Card>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">Monthly Expenses Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expensesData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {expensesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
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
                    setAnnualIncome(5000000);
                    setMonthlyDebts(100000);
                    setDownPayment(20);
                    setInterestRate(15);
                    setLoanTerm(25);
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AffordabilityCalculator; 