import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import { Camera, Maximize2, ZoomIn, ZoomOut, Crosshair, Layers } from 'lucide-react';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// Replace with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoibW10dWt1ciIsImEiOiJjbTEyZGk2dmwwbjZyMmtzMXFzb3V0cHRuIn0.pDgNHWd_o6u2NKVFib0EPQ';

export const SatelliteView = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const draw = useRef(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedProperties, setDetectedProperties] = useState([]);

  // Initial coordinates (Nigeria)
  const [lng] = useState(7.4916);
  const [lat] = useState(9.0765);
  const [zoom] = useState(13);

  useEffect(() => {
    if (map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Initialize drawing tools
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    });
    map.current.addControl(draw.current);

    // Add event listeners
    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

    return () => {
      map.current.remove();
    };
  }, [lng, lat, zoom]);

  // Mock property detection
  const detectProperties = async (bbox) => {
    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockDetections = [
        {
          id: 1,
          type: 'Unregistered Building',
          coordinates: [lng + 0.001, lat + 0.001],
          confidence: 95,
          estimatedValue: '₦25M'
        },
        {
          id: 2,
          type: 'Unauthorized Extension',
          coordinates: [lng - 0.001, lat - 0.001],
          confidence: 88,
          estimatedValue: '₦12M'
        }
      ];

      setDetectedProperties(mockDetections);
      addDetectionsToMap(mockDetections);
      setAnalyzing(false);
    }, 3000);
  };

  const addDetectionsToMap = (detections) => {
    detections.forEach(detection => {
      // Add markers for detected properties
      const el = document.createElement('div');
      el.className = 'detection-marker';
      el.style.backgroundColor = '#ff0000';
      el.style.width = '15px';
      el.style.height = '15px';
      el.style.borderRadius = '50%';
      el.style.border = '2px solid white';

      new mapboxgl.Marker(el)
        .setLngLat(detection.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `<h3>${detection.type}</h3>
               <p>Confidence: ${detection.confidence}%</p>
               <p>Est. Value: ${detection.estimatedValue}</p>`
            )
        )
        .addTo(map.current);
    });
  };

  const updateArea = () => {
    const data = draw.current.getAll();
    if (data.features.length > 0) {
      const bbox = turf.bbox(data);
      detectProperties(bbox);
    }
  };

  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden">
      {/* Satellite View Controls */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/50 text-white px-3 py-1 rounded-full">
        <Camera className="h-4 w-4" />
        <span className="text-sm">Live Satellite Feed</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100">
          <ZoomOut className="h-5 w-5" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100">
          <Layers className="h-5 w-5" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100">
          <Maximize2 className="h-5 w-5" />
        </button>
      </div>

      {/* Analysis Overlay */}
      {analyzing && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <div className="animate-spin h-8 w-8 border-4 border-[#1c5bde] border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-gray-600">Analyzing Area...</p>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapContainer} className="h-full w-full" />

      {/* Detection Results */}
      {detectedProperties.length > 0 && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h3 className="font-bold mb-2">Detected Properties</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {detectedProperties.map(property => (
              <div key={property.id} className="bg-white p-3 rounded border">
                <div className="font-semibold">{property.type}</div>
                <div className="text-sm text-gray-600">
                  Confidence: {property.confidence}%
                </div>
                <div className="text-sm text-[#1c5bde]">
                  Est. Value: {property.estimatedValue}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 