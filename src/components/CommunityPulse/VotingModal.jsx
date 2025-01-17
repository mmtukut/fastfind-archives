import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, X, AlertCircle, Check } from 'lucide-react';

export const VotingModal = ({ project, onClose, onVote }) => {
  const [vote, setVote] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    if (vote === null) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onVote(vote);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Project Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Impact Overview</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {project.budget}
                  </div>
                  <div className="text-xs text-gray-600">Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {project.impact.population}
                  </div>
                  <div className="text-xs text-gray-600">Beneficiaries</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">
                    {project.timeline}
                  </div>
                  <div className="text-xs text-gray-600">Timeline</div>
                </div>
              </div>
            </div>

            {/* Voting Options */}
            <div className="space-y-4">
              <h4 className="font-medium">Cast Your Vote</h4>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setVote(true)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    vote === true
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-500'
                  }`}
                >
                  <ThumbsUp className={`h-6 w-6 mx-auto mb-2 ${
                    vote === true ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-medium">Support</div>
                </button>
                
                <button
                  onClick={() => setVote(false)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    vote === false
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-500'
                  }`}
                >
                  <ThumbsDown className={`h-6 w-6 mx-auto mb-2 ${
                    vote === false ? 'text-red-500' : 'text-gray-400'
                  }`} />
                  <div className="text-sm font-medium">Oppose</div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <button
              onClick={handleVote}
              disabled={vote === null || isSubmitting}
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
                ${vote === null 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#1c5bde] text-white hover:bg-[#0c0d8a]'
                } transition-colors`}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Check className="h-5 w-5" />
                  </motion.div>
                  Submitting...
                </>
              ) : (
                'Confirm Vote'
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}; 