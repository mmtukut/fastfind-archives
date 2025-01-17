import React from 'react';
import { MapPin, Clock, Wallet, Users, TrendingUp, ChevronRight } from 'lucide-react';

export const ProjectCard = ({ project, onVote }) => {
  const votesTotal = project.votesFor + project.votesAgainst;
  const votesPercentage = ((project.votesFor / votesTotal) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-lg border hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{project.title}</h3>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>
        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
          {project.status}
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{project.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{project.timeline}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Wallet className="h-4 w-4" />
          <span>{project.budget}</span>
        </div>
      </div>

      {/* Voting Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Votes: {votesTotal}</span>
          <span>{votesPercentage}% Support</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-green-500 rounded-full"
            style={{ width: `${votesPercentage}%` }}
          />
        </div>
      </div>

      {/* Impact Stats */}
      <div className="border-t pt-4 mt-4">
        <h4 className="text-sm font-medium mb-2">Projected Impact</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {project.impact.population}
            </div>
            <div className="text-xs text-gray-600">Population</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {project.impact.propertyValue}
            </div>
            <div className="text-xs text-gray-600">Property Value</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900">
              {project.impact.timeline}
            </div>
            <div className="text-xs text-gray-600">Timeline</div>
          </div>
        </div>
      </div>

      <button
        onClick={onVote}
        className="w-full mt-4 px-4 py-2 bg-[#1c5bde] text-white rounded-lg hover:bg-[#0c0d8a] transition-colors flex items-center justify-center gap-2"
      >
        Cast Your Vote
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}; 