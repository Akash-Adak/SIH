// src/pages/HeatmapPage.jsx
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';
import { mockLocationData } from '../data/mock-locations';

// Leaflet's CSS is required for it to work correctly
import 'leaflet/dist/leaflet.css';

export default function HeatmapPage() {
  const position = [22.59, 88.31]; // Center of the map (Howrah)

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">Issue Hotspots</h1>
      <p className="text-center text-gray-600 mb-6">
        This map visualizes the density of reported issues across the city.
      </p>
      <div className="h-[600px] w-full rounded-lg shadow-md">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <HeatmapLayer
            points={mockLocationData}
            longitudeExtractor={m => m[1]}
            latitudeExtractor={m => m[0]}
            intensityExtractor={m => parseFloat(m[2])}
            radius={20}
            blur={15}
            maxOpacity={0.6}
          />
        </MapContainer>
      </div>
    </div>
  );
}