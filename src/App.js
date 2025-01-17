import React from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AIChatWidget from './components/AIChatWidget';

import HomePage from './components/HomePage';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import UserProfile from './components/UserProfile';
import InfrastructureAnalysis from "./components/InfrastructureAnalysis";
import PropertyDetailView from "./pages/PropertyDetailView";
import Properties from './pages/Properties';
import InfrastructureMap from './pages/InfrastructureMap';
import Footer from './components/Footer';
import MarketAnalysis from "./pages/MarketAnalysis";
import MortgageCalculator from './components/MortgageCalculator';
import InvestmentROICalculator from './components/InvestmentROICalculator';
import AffordabilityCalculator from './components/AffordabilityCalculator';
import About from './components/About';
import BuildFund from './components/BuildFund';
import BuildFundHub from './pages/BuildFundHub';
import CommunityPulse from './components/CommunityPulse';
import SmartVest from './components/SmartVest';
import MarketTrends from './components/MarketTrends';
import Infrastructure from './pages/Infrastructure';
import SignIn from './components/auth/SignIn';
import SignUp from "./components/auth/SignUp";
import RevenueSensePage from './pages/RevenueSense';
import { RevenueSense } from './components/BuildFundHub/RevenueSense';
import MapView from './components/MapView';


const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/market-analysis" element={<MarketAnalysis />} />
                        <Route path="/mortgage-calculator" element={<MortgageCalculator />} />
                        <Route path="/roi-calculator" element={<InvestmentROICalculator />} />
                        <Route path="/affordability-calculator" element={<AffordabilityCalculator />} />

                        <Route path="/properties/:id" element={<PropertyDetailView />} />
                        <Route path="/infrastructure-analysis" element={<InfrastructureAnalysis />} />
                        <Route path="/infrastructure-map" element={<InfrastructureMap />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/buildfund" element={<BuildFund />} />
                        <Route path="/buildfund-hub" element={<BuildFundHub />} />
                        <Route path="/buildfund-hub/community-pulse" element={<CommunityPulse />} />
                        <Route path="/buildfund-hub/smart-vest" element={<SmartVest />} />
                        <Route path="/buildfund-hub/revenue-sense" element={<RevenueSense />} />
                        <Route path="/infrastructure" element={<Infrastructure />} />
                        <Route path="/infrastructure/analysis" element={<InfrastructureAnalysis />} />
                        <Route path="/infrastructure/market" element={<MarketTrends />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/map" element={<MapView />} />
                        {/* Add routes or navigation as needed */}
                    </Routes>
                    <AIChatWidget />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
