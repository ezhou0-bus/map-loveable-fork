import React, { useEffect, useRef } from 'react';
import { Campaign } from '@/types/campaign';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shirt, UtensilsCrossed, PawPrint, Droplet, Baby, Book, Package } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Mapbox API Key
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbmd0c2UiLCJhIjoiY21oejEyaXJoMGo1ZDJqb3F4bmRlNmFteiJ9.aBsalQWtnJAGgcvO6aqVFA';

interface MapViewProps {
  drives: Campaign[];
  onDriveClick: (drive: Campaign) => void;
  selectedDrive?: Campaign | null;
}

// Map categories to icons
const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('cloth') || categoryLower.includes('apparel')) {
    return Shirt;
  } else if (categoryLower.includes('food')) {
    return UtensilsCrossed;
  } else if (categoryLower.includes('pet')) {
    return PawPrint;
  } else if (categoryLower.includes('water')) {
    return Droplet;
  } else if (categoryLower.includes('baby')) {
    return Baby;
  } else if (categoryLower.includes('book')) {
    return Book;
  } else {
    return Package;
  }
};

export function MapView({ drives, onDriveClick, selectedDrive }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{ marker: mapboxgl.Marker; popup: mapboxgl.Popup }[]>([]);

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

    // Clear existing markers and popups
    markersRef.current.forEach(({ marker, popup }) => {
      popup.remove();
      marker.remove();
    });
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

      const IconComponent = getCategoryIcon(drive.category);
      const progress = (drive.itemsCollected / drive.itemsNeeded) * 100;

      // Create custom marker element with category icon
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: ${getUrgencyColor(drive.urgency)};
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: box-shadow 0.2s ease;
      `;
      
      // Render the category icon
      el.innerHTML = renderToString(<IconComponent size={22} color="white" />);

      // Create hover preview card
      const previewContent = `
        <div style="
          min-width: 280px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          font-family: system-ui, -apple-system, sans-serif;
        ">
          ${drive.image ? `
            <div style="
              height: 120px;
              background-image: url(${drive.image});
              background-size: cover;
              background-position: center;
              position: relative;
            ">
              <div style="
                position: absolute;
                top: 8px;
                left: 8px;
                background: ${drive.urgency === 'high' ? '#FDB913' : drive.urgency === 'medium' ? '#3B82F6' : '#10B981'};
                color: white;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 600;
              ">
                ${drive.urgency === 'high' ? 'Urgent' : drive.urgency === 'medium' ? 'Active' : 'Ongoing'}
              </div>
            </div>
          ` : ''}
          <div style="padding: 12px;">
            <div style="color: #71717a; font-size: 11px; margin-bottom: 4px;">
              ${drive.organization}
            </div>
            <h3 style="
              margin: 0 0 8px 0;
              font-size: 15px;
              font-weight: 600;
              color: #18181b;
              line-height: 1.3;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            ">
              ${drive.title}
            </h3>
            <p style="
              margin: 0 0 12px 0;
              font-size: 13px;
              color: #71717a;
              line-height: 1.4;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            ">
              ${drive.description}
            </p>
            <div style="margin-bottom: 8px;">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 6px;
                font-size: 12px;
                color: #71717a;
              ">
                <span>${drive.itemsCollected} of ${drive.itemsNeeded} items</span>
                <span style="color: #3B82F6; font-weight: 600;">${Math.round(progress)}%</span>
              </div>
              <div style="
                width: 100%;
                height: 6px;
                background: #f4f4f5;
                border-radius: 3px;
                overflow: hidden;
              ">
                <div style="
                  width: ${progress}%;
                  height: 100%;
                  background: #3B82F6;
                  transition: width 0.3s ease;
                "></div>
              </div>
            </div>
            <div style="
              display: flex;
              gap: 12px;
              padding-top: 10px;
              border-top: 1px solid #f4f4f5;
              font-size: 11px;
              color: #71717a;
            ">
              <span>📍 ${drive.distance} mi away</span>
              <span>⏰ ${drive.deadline}</span>
            </div>
          </div>
        </div>
      `;

      // Create popup for hover preview
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
        maxWidth: 'none',
        className: 'map-preview-popup'
      });
      popup.setHTML(previewContent);

      // Hover events - only change visual appearance, don't transform
      el.addEventListener('mouseenter', () => {
        el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
        el.style.zIndex = '1000';
        popup.setLngLat([drive.lng, drive.lat]).addTo(map.current!);
      });

      el.addEventListener('mouseleave', () => {
        el.style.boxShadow = selectedDrive?.id === drive.id 
          ? '0 8px 20px rgba(0,0,0,0.4)' 
          : '0 4px 12px rgba(0,0,0,0.3)';
        el.style.zIndex = selectedDrive?.id === drive.id ? '999' : '1';
        popup.remove();
      });

      // Highlight if selected
      if (selectedDrive?.id === drive.id) {
        el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)';
        el.style.zIndex = '999';
      }

      // Create marker with proper anchor to keep it locked to coordinates
      const marker = new mapboxgl.Marker({ 
        element: el, 
        anchor: 'bottom'
      })
        .setLngLat([drive.lng, drive.lat])
        .addTo(map.current!);

      // Click event - open full detail popup (no flyTo to avoid position shifts)
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        popup.remove(); // Remove hover popup
        onDriveClick(drive);
      });

      markersRef.current.push({ marker, popup });
    });
  }, [drives, onDriveClick, selectedDrive]);

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <style>{`
        .mapboxgl-popup-content {
          padding: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .mapboxgl-popup-tip {
          display: none;
        }
        .map-preview-popup .mapboxgl-popup-content {
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
}
