import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Shield, ChartBar, Coins, Landmark } from 'lucide-react';

// Core Platform Architecture
const FastFindBuildFund = {
  platformModules: {
    crowdfunding: {
      initializeFunding: async (projectData) => {
        // Implement crowdfunding logic
        console.log("Initializing funding for:", projectData);
        return { status: "success", fundingId: "F" + Math.random().toString(36).substr(2, 9) };
      }
    },
    governmentBridge: {
      processLandAllocation: async (landData) => {
        // Implement government bridge logic
        console.log("Processing land allocation:", landData);
        return { status: "pending", applicationId: "L" + Math.random().toString(36).substr(2, 9) };
      }
    },
    communityEngagement: {
      startVoting: async (projectDetails) => {
        // Implement community voting
        console.log("Starting community voting for:", projectDetails);
        return { status: "active", votingId: "V" + Math.random().toString(36).substr(2, 9) };
      }
    },
    riskManagement: {
      assessProject: async (projectData) => {
        // Implement risk assessment
        console.log("Assessing project risk:", projectData);
        return {
          score: Math.floor(Math.random() * 100),
          risk: "low",
          recommendations: ["Verify land documents", "Check market demand"]
        };
      }
    }
  }
};

const BuildFund = () => {
  const [projectData, setProjectData] = useState(null);
  const [fundingStatus, setFundingStatus] = useState(null);
  const [landStatus, setLandStatus] = useState(null);

  const handleProjectSubmission = async (data) => {
    // Initialize funding
    const fundingResult = await FastFindBuildFund.platformModules.crowdfunding
      .initializeFunding(data);
    setFundingStatus(fundingResult);

    // Process land allocation
    const landResult = await FastFindBuildFund.platformModules.governmentBridge
      .processLandAllocation(data);
    setLandStatus(landResult);

    // Start community voting
    await FastFindBuildFund.platformModules.communityEngagement
      .startVoting(data);

    // Assess project risk
    const riskResult = await FastFindBuildFund.platformModules.riskManagement
      .assessProject(data);
    
    setProjectData({
      ...data,
      riskAssessment: riskResult
    });
  };

  // Example project submission
  const submitProject = () => {
    const exampleProject = {
      title: "New Housing Development",
      location: "Lagos",
      fundingRequired: "₦50M",
      landDetails: {
        size: "2000 sqm",
        zone: "residential"
      }
    };
    handleProjectSubmission(exampleProject);
  };

  const features = [
    {
      title: "Micro-Investment",
      description: "Invest in real estate projects from ₦1,000",
      icon: Coins,
      action: "Start Investing",
      onClick: () => console.log("Initialize micro-investment")
    },
    {
      title: "Project Funding",
      description: "Get funding for your real estate projects",
      icon: Building,
      action: "Submit Project",
      onClick: submitProject
    },
    {
      title: "Government Bridge",
      description: "Streamlined land allocation and approvals",
      icon: Landmark,
      action: "Learn More",
      onClick: () => console.log("Show government bridge details")
    }
  ];

  // Rest of your UI code remains the same, but now with actual functionality
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-[#1c5bde]/10 via-white to-[#1c5bde]/10 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1c5bde] to-[#1c5bde]/80 bg-clip-text text-transparent"
            >
              FastFind BuildFund
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-600 mb-8"
            >
              Revolutionizing real estate funding and development in Nigeria
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-4"
            >
              <button className="px-8 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#1c5bde]/90 transition-all">
                Get Started
              </button>
              <button className="px-8 py-3 border border-[#1c5bde] text-[#1c5bde] rounded-lg hover:bg-[#1c5bde]/5 transition-all">
                Learn More
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Grid with Active Functionality */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="bg-[#1c5bde]/10 p-3 rounded-full w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-[#1c5bde]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <button 
                  onClick={feature.onClick}
                  className="text-[#1c5bde] font-medium hover:underline"
                >
                  {feature.action} →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Status Display Section (New) */}
      {(fundingStatus || landStatus || projectData) && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Project Status</h3>
              <div className="space-y-4">
                {fundingStatus && (
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold">Funding Status</h4>
                    <p>ID: {fundingStatus.fundingId}</p>
                    <p>Status: {fundingStatus.status}</p>
                  </div>
                )}
                {landStatus && (
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold">Land Allocation Status</h4>
                    <p>Application ID: {landStatus.applicationId}</p>
                    <p>Status: {landStatus.status}</p>
                  </div>
                )}
                {projectData?.riskAssessment && (
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold">Risk Assessment</h4>
                    <p>Score: {projectData.riskAssessment.score}/100</p>
                    <p>Risk Level: {projectData.riskAssessment.risk}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* For Investors */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">For Investors</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <Coins className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">1. Start with ₦1,000</h4>
                      <p className="text-gray-600">Invest in verified real estate projects with as little as ₦1,000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <ChartBar className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">2. Track Your Investment</h4>
                      <p className="text-gray-600">Monitor project progress and returns in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">3. Secure Returns</h4>
                      <p className="text-gray-600">Receive automated returns through smart contracts</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Developers */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">For Developers</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <Building className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">1. Submit Your Project</h4>
                      <p className="text-gray-600">List your project with required documentation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <Landmark className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">2. Fast-Track Approvals</h4>
                      <p className="text-gray-600">Get streamlined government approvals and land allocation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-[#1c5bde]/10 p-2 rounded-full">
                      <Users className="h-5 w-5 text-[#1c5bde]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">3. Access Funding</h4>
                      <p className="text-gray-600">Receive milestone-based funding from verified investors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-all">
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildFund; 