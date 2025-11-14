import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, TrendingUp, Heart } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Campaign } from '@/types/campaign';
import { supabase } from '@/integrations/supabase/client';
import { useFavorites } from '@/hooks/useFavorites';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: () => void;
}

export function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const progress = (campaign.itemsCollected / campaign.itemsNeeded) * 100;
  const [userId, setUserId] = useState<string | undefined>();
  const { toggleFavorite, isFavorite } = useFavorites(userId);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id);
    });
  }, []);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(campaign.id);
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-accent text-accent-foreground rounded-full">Urgent</Badge>;
      case 'medium':
        return <Badge className="bg-primary text-primary-foreground rounded-full">Active</Badge>;
      case 'low':
        return <Badge variant="outline" className="rounded-full">Ongoing</Badge>;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="overflow-hidden cursor-pointer border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all rounded-3xl"
        onClick={onClick}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-secondary">
          {campaign.image && (
            <ImageWithFallback
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {getUrgencyBadge(campaign.urgency)}
            <motion.button
              className={`backdrop-blur-sm rounded-full p-2 shadow-md ${
                isFavorite(campaign.id) 
                  ? 'bg-accent/90' 
                  : 'bg-card/90'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={`w-4 h-4 ${
                  isFavorite(campaign.id) 
                    ? 'text-primary-foreground fill-current' 
                    : 'text-accent'
                }`} 
              />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">{campaign.organization}</p>
            <h3 className="line-clamp-2">{campaign.title}</h3>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>
                  {campaign.itemsCollected} of {campaign.itemsNeeded} items
                </span>
              </div>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-3 pt-2 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{campaign.distance} mi away</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{campaign.deadline}</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
