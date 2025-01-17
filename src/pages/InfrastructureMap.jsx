import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';
import config from '../utils/config';

// Add console.log to check if token is loaded
console.log('Mapbox Token:', config.MAPBOX_TOKEN);

// Set the access token
mapboxgl.accessToken = config.MAPBOX_TOKEN;

const InfrastructureMap = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams.get('property');
  const property = propertyId ? featuredProperties.find(p => p.id === parseInt(propertyId)) : null;
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: property ? property.coordinates : [3.422, 6.448], // Lagos coordinates as default
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl());

    // Load map
    map.current.on('load', () => {
      // Add infrastructure data points
      addInfrastructurePoints();
      
      // If property is selected, add its marker
      if (property) {
        addPropertyMarker(property);
      }
    });
  }, []);

  // Update markers when category changes
  useEffect(() => {
    if (!map.current) return;
    
    updateVisibleMarkers();
  }, [selectedCategory]);

  const addInfrastructurePoints = () => {
    infrastructureData.categories.forEach(category => {
      category.items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'infrastructure-marker';
        el.style.backgroundColor = getCategoryColor(category.name);
        el.style.width = '15px';
        el.style.height = '15px';
        el.style.borderRadius = '50%';
        el.style.border = '2px solid white';
        el.style.cursor = 'pointer';

        // Create popup
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <h3 class="font-semibold">${item.name}</h3>
              <p class="text-sm text-gray-600">${category.name}</p>
              <p class="text-sm">${item.distance} from center</p>
            </div>
          `);

        // Add marker to map
        new mapboxgl.Marker(el)
          .setLngLat(item.coordinates)
          .setPopup(popup)
          .addTo(map.current);

        // Store category for filtering
        el.dataset.category = category.name;
      });
    });
  };

  const addPropertyMarker = (property) => {
    const el = document.createElement('div');
    el.className = 'property-marker';
    el.style.backgroundColor = '#ff0000';
    el.style.width = '20px';
    el.style.height = '20px';
    el.style.borderRadius = '50%';
    el.style.border = '3px solid white';

    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${property.title}</h3>
          <p class="text-sm">${property.price}</p>
        </div>
      `);

    new mapboxgl.Marker(el)
      .setLngLat(property.coordinates)
      .setPopup(popup)
      .addTo(map.current);
  };

  const updateVisibleMarkers = () => {
    const markers = document.getElementsByClassName('infrastructure-marker');
    Array.from(markers).forEach(marker => {
      if (selectedCategory === 'all' || marker.dataset.category === selectedCategory) {
        marker.style.display = 'block';
      } else {
        marker.style.display = 'none';
      }
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Education': '#4CAF50',
      'Healthcare': '#2196F3',
      'Transportation': '#FFC107',
      'Shopping': '#9C27B0',
      'Entertainment': '#FF5722'
      // Add more categories and colors as needed
    };
    return colors[category] || '#666666';
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to={propertyId ? `/properties/${propertyId}` : '/properties'} 
            className="flex items-center gap-2 text-gray-600 hover:text-[#0e109f]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Link>
          <h1 className="text-lg font-semibold">Infrastructure Map</h1>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b p-4">
        <div className="container mx-auto flex gap-2 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedCategory === 'all' 
                ? 'bg-[#0e109f] text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {infrastructureData.categories.map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.name 
                  ? 'bg-[#0e109f] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container */}
      <div 
        ref={mapContainer} 
        className="h-[calc(100vh-128px)]"
      />
    </div>
  );
};

export default InfrastructureMap; 