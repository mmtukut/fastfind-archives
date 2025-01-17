import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Check, AlertCircle, Loader2 } from 'lucide-react';

export const NINVerification = ({ onVerificationComplete }) => {
  const [nin, setNin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const handleVerification = async (e) => {
    e.preventDefault();
    if (nin.length !== 11) {
      setError('NIN must be 11 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onVerificationComplete();
    } catch (error) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[#1c5bde]/10 rounded-lg">
          <Shield className="h-6 w-6 text-[#1c5bde]" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Verify Your Identity</h3>
          <p className="text-sm text-gray-600">
            Enter your NIN to start voting on community projects
          </p>
        </div>
      </div>

      <form onSubmit={handleVerification} className="space-y-4">
        <div>
          <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
            National Identification Number (NIN)
          </label>
          <input
            type="text"
            id="nin"
            value={nin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              if (value.length <= 11) setNin(value);
            }}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1c5bde] focus:border-[#1c5bde] transition-colors"
            placeholder="Enter your 11-digit NIN"
            maxLength={11}
          />
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mt-2 text-red-600 text-sm"
            >
              <AlertCircle className="h-4 w-4" />
              {error}
            </motion.div>
          )}
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Why verify with NIN?</h4>
          <ul className="space-y-2">
            {[
              'Ensure one vote per citizen',
              'Prevent fraudulent voting',
              'Maintain community trust',
              'Secure blockchain verification'
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-sm text-blue-700"
              >
                <Check className="h-4 w-4 text-blue-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={nin.length !== 11 || isVerifying}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2
            ${nin.length !== 11
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-[#1c5bde] text-white hover:bg-[#0c0d8a]'
            } transition-colors`}
        >
          {isVerifying ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying...
            </>
          ) : (
            'Verify NIN'
          )}
        </button>
      </form>
    </div>
  );
}; 