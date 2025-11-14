import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useFavorites(userId?: string) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load user's favorites
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      const { data, error } = await supabase
        .from('favorites')
        .select('campaign_id')
        .eq('user_id', userId);

      if (error) {
        console.error('Error loading favorites:', error);
        toast({
          title: "Error loading favorites",
          description: error.message,
          variant: "destructive",
        });
      } else if (data) {
        setFavorites(new Set(data.map(f => f.campaign_id)));
      }
      setLoading(false);
    };

    loadFavorites();
  }, [userId, toast]);

  const toggleFavorite = async (campaignId: string) => {
    if (!userId) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save favorites",
        variant: "destructive",
      });
      return;
    }

    const isFavorited = favorites.has(campaignId);

    if (isFavorited) {
      // Remove from favorites
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('campaign_id', campaignId);

      if (error) {
        toast({
          title: "Error removing favorite",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet.delete(campaignId);
          return newSet;
        });
        toast({
          title: "Removed from favorites",
          description: "Drive removed from your favorites",
        });
      }
    } else {
      // Add to favorites
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          campaign_id: campaignId,
        });

      if (error) {
        toast({
          title: "Error adding favorite",
          description: error.message,
          variant: "destructive",
        });
      } else {
        setFavorites(prev => new Set(prev).add(campaignId));
        toast({
          title: "Added to favorites",
          description: "Drive saved to your favorites",
        });
      }
    }
  };

  const isFavorite = (campaignId: string) => favorites.has(campaignId);

  return {
    favorites: Array.from(favorites),
    loading,
    toggleFavorite,
    isFavorite,
  };
}
