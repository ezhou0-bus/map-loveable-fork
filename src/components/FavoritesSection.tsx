import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '@/types/campaign';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoritesSectionProps {
  userId: string;
  allCampaigns: Campaign[];
  onCampaignClick: (campaign: Campaign) => void;
}

export function FavoritesSection({ userId, allCampaigns, onCampaignClick }: FavoritesSectionProps) {
  const { favorites, loading } = useFavorites(userId);
  
  // Filter campaigns that are in favorites
  const favoriteCampaigns = allCampaigns.filter(campaign => 
    favorites.includes(campaign.id)
  );

  if (loading) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Favorite Drives</h2>
            </div>
            <p className="text-sm text-muted-foreground text-center py-4">Loading favorites...</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (favoriteCampaigns.length === 0) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="border border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">Favorite Drives</h2>
            </div>
            <div className="text-center py-8">
              <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                You haven't saved any favorite drives yet.
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Tap the heart icon on any drive to save it here!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2 px-1">
        <Heart className="w-5 h-5 text-accent fill-current" />
        <h2 className="text-lg font-semibold text-foreground">Favorite Drives</h2>
        <span className="text-sm text-muted-foreground">({favoriteCampaigns.length})</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {favoriteCampaigns.map((campaign, index) => (
          <motion.div
            key={campaign.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <CampaignCard 
              campaign={campaign} 
              onClick={() => onCampaignClick(campaign)} 
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
