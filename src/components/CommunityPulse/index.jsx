import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Vote, Building2, ChevronRight, AlertCircle, 
  CheckCircle2, Timer, TrendingUp, Droplet, School,
  Hospital, LayoutGrid, Trash2, Leaf, Sun
} from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { VotingModal } from './VotingModal';
import { NINVerification } from './NINVerification';

const CommunityPulse = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [activeProjects, setActiveProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [votingPower, setVotingPower] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample projects data (Gombe-specific)
  const projects = [
    {
      id: 1,
      title: "Gombe Central Market Modernization",
      description: "Renovation and modernization of the central market to improve trading conditions and revenue generation",
      location: "Gombe Central, Gombe",
      budget: "₦2.5B",
      timeline: "18 months",
      votesFor: 3245,
      votesAgainst: 245,
      status: "active",
      category: "commerce",
      impact: {
        population: "100,000+",
        economicGrowth: "+25%",
        jobCreation: "5,000+",
        timeline: "2024-2025"
      }
    },
    {
      id: 2,
      title: "Gombe Solar Street Light Project",
      description: "Installation of solar-powered street lights across major roads in Gombe metropolis",
      location: "Gombe Metropolitan Area",
      budget: "₦850M",
      timeline: "8 months",
      votesFor: 4567,
      votesAgainst: 321,
      status: "active",
      category: "infrastructure",
      impact: {
        population: "350,000+",
        safety: "+40%",
        energySaving: "60%",
        timeline: "2024"
      }
    },
    {
      id: 3,
      title: "Gombe Water Supply Enhancement",
      description: "Upgrading water supply infrastructure to improve access to clean water",
      location: "Various Locations, Gombe",
      budget: "₦1.8B",
      timeline: "15 months",
      votesFor: 5678,
      votesAgainst: 432,
      status: "active",
      category: "utilities",
      impact: {
        population: "500,000+",
        waterAccess: "+70%",
        healthImprovement: "+45%",
        timeline: "2024-2025"
      }
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: Building2 },
    { id: 'infrastructure', label: 'Infrastructure', icon: LayoutGrid },
    { id: 'utilities', label: 'Utilities', icon: Droplet },
    { id: 'education', label: 'Education', icon: School },
    { id: 'healthcare', label: 'Healthcare', icon: Hospital },
    { id: 'environment', label: 'Environment', icon: Leaf }
  ];

  const stats = [
    {
      title: "Active Projects",
      value: activeProjects.length,
      icon: Building2,
      color: "text-blue-600"
    },
    {
      title: "Community Members",
      value: "25,234",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Total Votes Cast",
      value: "45,678",
      icon: Vote,
      color: "text-purple-600"
    },
    {
      title: "Projects Completed",
      value: "28",
      icon: CheckCircle2,
      color: "text-emerald-600"
    }
  ];

  const impactMetrics = [
    {
      title: "Lives Impacted",
      value: "500,000+",
      change: "+15%",
      icon: Users
    },
    {
      title: "Infrastructure Score",
      value: "75/100",
      change: "+8",
      icon: Building2
    },
    {
      title: "Community Satisfaction",
      value: "85%",
      change: "+12%",
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    setActiveProjects(projects);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Shape Your Community's Future
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 mb-8"
            >
              Vote on infrastructure projects that matter to your community.
              Your voice matters in building a better city for all.
            </motion.p>

            {/* Impact Metrics */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {impactMetrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <metric.icon className="h-6 w-6 text-blue-600 mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.title}</div>
                  <div className="text-sm text-green-600 mt-1">
                    {metric.change} growth
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="font-bold text-xl">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects List - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Projects in Gombe</h2>
              <button className="text-sm text-blue-600 hover:underline">
                View All
              </button>
            </div>

            {activeProjects.map((project) => (
              <ProjectCard 
                key={project.id}
                project={project}
                onVote={() => {
                  if (!isVerified) {
                    // Show NIN verification modal
                    return;
                  }
                  setSelectedProject(project);
                  setShowVotingModal(true);
                }}
              />
            ))}
          </div>

          {/* Verification & Stats - Right Column */}
          <div className="space-y-6">
            {!isVerified ? (
              <NINVerification 
                onVerificationComplete={() => setIsVerified(true)}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-center gap-2 text-green-600 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Verified Voter</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Your voting power: {votingPower}
                </p>
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  View Voting History
                </button>
              </div>
            )}

            {/* Community Updates */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="font-semibold mb-4">Community Updates</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Hospital Completed</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Timer className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Road Project 75% Complete</p>
                    <p className="text-xs text-gray-600">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Modal */}
      {showVotingModal && selectedProject && (
        <VotingModal
          project={selectedProject}
          onClose={() => setShowVotingModal(false)}
          onVote={(support) => {
            // Handle vote submission
            setShowVotingModal(false);
          }}
        />
      )}
    </div>
  );
};

export default CommunityPulse; 