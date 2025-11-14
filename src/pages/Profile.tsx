import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Calendar, TrendingUp, Award, Pencil, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import profilePhoto from '@/assets/profile-photo.png';
import { EditProfileDialog } from '@/components/EditProfileDialog';
import { useProfile } from '@/hooks/useProfile';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const savedEvents = [
  {
    id: 1,
    title: 'Winter Clothing Drive',
    organization: 'Community Shelter',
    date: 'Tomorrow at 2:00 PM',
    location: 'Downtown District',
    category: 'clothing'
  },
  {
    id: 2,
    title: 'Food Bank Collection',
    organization: "St. Mary's Food Bank",
    date: 'Friday at 10:00 AM',
    location: 'Riverside',
    category: 'food'
  },
  {
    id: 3,
    title: 'Pet Supplies Drive',
    organization: 'Animal Rescue',
    date: 'Next Monday at 3:00 PM',
    location: 'Westside',
    category: 'pets'
  }
];

const impactStats = {
  itemsGiven: 47,
  causesSupported: 8,
  nextMilestone: 50
};

const neighborhoodRankings = [
  { name: 'Logan Square', donations: 156, trend: 'up' },
  { name: 'Wicker Park', donations: 142, trend: 'up' },
  { name: 'Lincoln Park', donations: 128, trend: 'down' },
];

const Profile = () => {
  const { profile, loading, updateProfile } = useProfile();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const impactPercentage = (impactStats.itemsGiven / impactStats.nextMilestone) * 100;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth');
      }
    });
  }, [navigate]);

  const handleSaveProfile = async (newName: string, newPhoto: string) => {
    await updateProfile(newName, newPhoto);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const name = profile?.name || 'Guest User';
  const photo = profile?.photo || profilePhoto;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Map</span>
          </motion.button>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground"
            whileHover={{ scale: 1.05 }}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </motion.button>
        </div>

        <div className="relative flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative"
          >
            <Avatar className="w-24 h-24 border-4 border-background shadow-2xl">
              <AvatarImage src={photo} alt={name} />
              <AvatarFallback className="bg-card text-primary text-3xl font-semibold">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setEditDialogOpen(true)}
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
            >
              <Pencil className="w-4 h-4" />
            </motion.button>
          </motion.div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-foreground mb-1">{name}</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 mt-6 space-y-6">
        {/* Impact Meter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <h2 className="text-lg font-semibold text-foreground">Your Impact</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <div className="text-3xl font-bold text-primary">{impactStats.itemsGiven}</div>
                    <div className="text-sm text-muted-foreground">items given</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-accent">{impactStats.causesSupported}</div>
                    <div className="text-sm text-muted-foreground">causes supported</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Next milestone</span>
                    <span className="font-medium text-foreground">{impactStats.nextMilestone} items</span>
                  </div>
                  <Progress value={impactPercentage} className="h-3" />
                  <p className="text-sm text-center text-muted-foreground italic">
                    Every little bit adds up 💛
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Neighborhood */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border border-border shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-3">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Giving in</div>
                  <div className="font-semibold text-foreground">Downtown & Riverside</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Neighborhood Rankings */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="border border-border shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-accent/5 to-primary/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">Neighborhood Rankings</h3>
              </div>
              
              <div className="space-y-3">
                {neighborhoodRankings.map((neighborhood, index) => (
                  <div 
                    key={neighborhood.name}
                    className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                        ${index === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{neighborhood.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {neighborhood.donations} donations this week
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant={neighborhood.trend === 'up' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {neighborhood.trend === 'up' ? '↑' : '↓'}
                    </Badge>
                  </div>
                ))}
              </div>
              
              {neighborhoodRankings[0].name === 'Logan Square' && (
                <p className="text-sm text-center text-accent font-medium mt-4 italic">
                  🎉 Logan Square made the most donations this week!
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Saved Events */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 px-1">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
          </div>
          
          <div className="space-y-3">
            {savedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="border border-border hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-lg p-2 mt-1">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{event.organization}</p>
                        <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="capitalize">
                        {event.category}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center py-6"
          >
            <p className="text-sm text-muted-foreground italic">
              You're part of a larger movement of helpers 🌟
            </p>
          </motion.div>
        </motion.div>

        {/* Achievements Preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border border-border shadow-sm bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">Recent Achievements</h2>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {['First Timer', 'Helping Hand', 'Super Giver'].map((badge, index) => (
                  <motion.div
                    key={badge}
                    className="flex-shrink-0 bg-card border-2 border-primary/30 rounded-xl p-3 min-w-[100px] text-center"
                    whileHover={{ y: -4 }}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-xs font-medium text-foreground">{badge}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Encouraging Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block"
          >
            <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          </motion.div>
          <p className="text-lg font-medium text-foreground mb-1">
            You just helped your neighborhood!
          </p>
          <p className="text-sm text-muted-foreground">
            Keep shining and spreading warmth ✨
          </p>
        </motion.div>
      </div>

      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        currentName={name}
        currentPhoto={photo}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default Profile;
