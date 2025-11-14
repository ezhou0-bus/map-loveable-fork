import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Campaign } from '@/types/campaign';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox API Key
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmd0c2UiLCJhIjoiY21oejEyaXJoMGo1ZDJqb3F4bmRlNmFteiJ9.aBsalQWtnJAGgcvO6aqVFA';

interface MapViewProps {
  drives: Campaign[];
  onDriveClick: (drive: Campaign) => void;
  selectedDrive?: Campaign | null;
}

export function MapView({ drives, onDriveClick, selectedDrive }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add markers for each drive
    drives.forEach((drive) => {
      const getUrgencyColor = (urgency: string) => {
        switch (urgency) {
          case 'high': return '#FDB913';
          case 'medium': return '#3B82F6';
          case 'low': return '#10B981';
          default: return '#3B82F6';
        }
      };

      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${getUrgencyColor(drive.urgency)};
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      `;
      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9C20.1,15.8,20.2,15.8,20.2,15.7z"/></svg>`;
      
      // Scale on hover
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = selectedDrive?.id === drive.id ? 'scale(1.2)' : 'scale(1)';
      });

      // Scale if selected
      if (selectedDrive?.id === drive.id) {
        el.style.transform = 'scale(1.2)';
      }

      // Create marker
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([drive.lng, drive.lat])
        .addTo(map.current!);

      // Add click event
      el.addEventListener('click', () => {
        onDriveClick(drive);
        map.current?.flyTo({ 
          center: [drive.lng, drive.lat],
          zoom: 14,
          duration: 1000
        });
      });

      markersRef.current.push(marker);
    });
  }, [drives, onDriveClick, selectedDrive]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}
