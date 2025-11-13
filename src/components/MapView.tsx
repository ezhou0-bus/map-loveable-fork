import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Campaign } from '@/types/campaign';

interface MapViewProps {
  drives: Campaign[];
  onDriveClick: (drive: Campaign) => void;
  selectedDrive?: Campaign | null;
}

export function MapView({ drives, onDriveClick, selectedDrive }: MapViewProps) {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.006 });

  // Calculate pin position based on lat/lng (simplified)
  const getPinPosition = (drive: Campaign) => {
    const offsetLat = (drive.lat - mapCenter.lat) * 500 + 50;
    const offsetLng = (drive.lng - mapCenter.lng) * 500 + 50;
    return {
      top: `${Math.max(10, Math.min(90, offsetLat))}%`,
      left: `${Math.max(10, Math.min(90, offsetLng))}%`,
    };
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-accent';
      case 'medium':
        return 'bg-primary';
      case 'low':
        return 'bg-chart-4';
      default:
        return 'bg-primary';
    }
  };

  return (
    <div className="relative w-full h-full bg-secondary/20 rounded-3xl overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-muted/30">
        {/* Simulated map grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(253, 185, 19, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(253, 185, 19, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Drive Pins */}
      {drives.map((drive, index) => {
        const position = getPinPosition(drive);
        const isSelected = selectedDrive?.id === drive.id;
        const progress = (drive.itemsCollected / drive.itemsNeeded) * 100;

        return (
          <motion.div
            key={drive.id}
            className="absolute"
            style={position}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isSelected ? 1.2 : 1, 
              opacity: 1,
              y: [0, -5, 0],
            }}
            transition={{
              delay: index * 0.05,
              y: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            }}
            whileHover={{ scale: 1.15 }}
            onClick={() => onDriveClick(drive)}
          >
            <div className="relative cursor-pointer">
              {/* Pulse effect for high urgency */}
              {drive.urgency === 'high' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/30"
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
              
              {/* Pin */}
              <div className={`relative ${getUrgencyColor(drive.urgency)} rounded-full p-3 shadow-lg border-4 border-card`}>
                <MapPin className="w-5 h-5 text-primary-foreground" fill="currentColor" />
                
                {/* Progress indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.2 }}
                >
                  <div className="relative w-5 h-5">
                    <svg className="w-5 h-5 -rotate-90">
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#F5F5F0"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#FDB913"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 8}`}
                        strokeDashoffset={`${2 * Math.PI * 8 * (1 - progress / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Hover Card */}
              {isSelected && (
                <motion.div
                  className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-card rounded-2xl shadow-xl p-4 z-10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    <div>
                      <p className="text-muted-foreground text-xs">{drive.organization}</p>
                      <h4 className="text-foreground">{drive.title}</h4>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="text-xs rounded-full">
                        {drive.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs rounded-full flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {drive.deadline}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      {drive.itemsCollected} of {drive.itemsNeeded} items
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                    <div className="w-3 h-3 bg-card rotate-45" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        <motion.button
          className="bg-card rounded-full p-3 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">+</span>
        </motion.button>
        <motion.button
          className="bg-card rounded-full p-3 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">−</span>
        </motion.button>
      </div>
    </div>
  );
}
