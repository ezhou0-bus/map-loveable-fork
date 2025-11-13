import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Sparkles, MapPin, Calendar, TrendingUp, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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

const Profile = () => {
  const impactPercentage = (impactStats.itemsGiven / impactStats.nextMilestone) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-accent p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        
        <Link to="/">
          <motion.button
            className="mb-4 flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Map</span>
          </motion.button>
        </Link>

        <div className="relative flex flex-col items-center gap-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            <Avatar className="w-24 h-24 border-4 border-background shadow-2xl">
              <AvatarFallback className="bg-card text-primary text-3xl font-semibold">JD</AvatarFallback>
            </Avatar>
          </motion.div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-foreground mb-1">Jamie Doe</h1>
            <p className="text-primary-foreground/80 text-sm flex items-center gap-2 justify-center">
              <Heart className="w-4 h-4" />
              <span>Loves giving clothing & food</span>
            </p>
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
    </div>
  );
};

export default Profile;
