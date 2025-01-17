import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const InfrastructureMarker = ({ data, onClick, isHovered }) => {
  console.log('Rendering marker:', data.name);
  
  const getStatusColor = (status) => {
    const colors = {
      operational: '#22c55e',
      construction: '#f59e0b',
      planned: '#6366f1',
      maintenance: '#ef4444'
    };
    return colors[status] || '#94a3b8';
  };

  return (
    <div 
      className="infrastructure-marker" 
      onClick={onClick}
      style={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        {/* Main Marker */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="marker-container"
          style={{
            borderColor: data.category.color
          }}
        >
          {/* Icon and Status Indicator */}
          <div className="marker-content">
            <div className="marker-icon">
              {data.category.icon}
              <span 
                className="status-dot"
                style={{ backgroundColor: getStatusColor(data.status) }}
              />
            </div>
            
            {/* Info Preview */}
            <div className="marker-info">
              <h3 className="marker-title">{data.name}</h3>
              <div className="marker-details">
                {data.rating && (
                  <span className="rating">⭐ {data.rating}</span>
                )}
                <span className="capacity">{data.capacity}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hover Preview */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="hover-preview"
            >
              <img 
                src={data.image} 
                alt={data.name}
                className="preview-image"
              />
              <div className="preview-content">
                <div className="preview-header">
                  <h4>{data.name}</h4>
                  <span className="status-badge">
                    {data.status === 'operational' ? '✅ Active' : '🏗️ In Progress'}
                  </span>
                </div>
                <div className="preview-amenities">
                  {data.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                  {data.amenities.length > 3 && (
                    <span className="amenity-more">
                      +{data.amenities.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 