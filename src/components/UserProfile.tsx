import React from 'react';
import { motion } from 'framer-motion';
import { X, Award, TrendingUp, MapPin, Calendar, Flame, Star, Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface UserProfileProps {
  onClose: () => void;
}

const badges = [
  { id: 1, name: 'First Timer', icon: Star, color: 'text-primary', earned: true },
  { id: 2, name: 'Helping Hand', icon: Heart, color: 'text-accent', earned: true },
  { id: 3, name: 'Super Giver', icon: Award, color: 'text-chart-4', earned: true },
  { id: 4, name: 'Local Hero', icon: MapPin, color: 'text-chart-5', earned: false },
  { id: 5, name: '10 Day Streak', icon: Flame, color: 'text-accent', earned: false },
  { id: 6, name: 'Community Champion', icon: TrendingUp, color: 'text-primary', earned: false },
];

const geoBadges = [
  { location: 'Downtown', visits: 5, earned: true },
  { location: 'Riverside', visits: 3, earned: true },
  { location: 'Uptown', visits: 1, earned: false },
  { location: 'Westside', visits: 0, earned: false },
];

const recentActivity = [
  {
    id: 1,
    campaign: 'Winter Clothing Drive',
    organization: 'Community Shelter',
    items: '5 winter coats',
    date: '2 days ago',
  },
  {
    id: 2,
    campaign: 'Food Bank Collection',
    organization: "St. Mary's Food Bank",
    items: '12 canned goods',
    date: '1 week ago',
  },
  {
    id: 3,
    campaign: 'School Supplies Drive',
    organization: 'Local Elementary School',
    items: '8 notebooks',
    date: '2 weeks ago',
  },
];

export function UserProfile({ onClose }: UserProfileProps) {
  const totalDonations = 25;
  const currentStreak = 3;
  const totalImpact = 150;

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-3xl z-50 overflow-hidden flex flex-col shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground">
          <motion.button
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-white text-primary text-2xl">JD</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="text-white">Jamie Doe</h2>
              <p className="text-white/80 text-sm">Member since Nov 2024</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              className="bg-primary/10 rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center mb-2">
                <div className="bg-primary rounded-full p-2">
                  <TrendingUp className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div className="text-2xl text-primary">{totalDonations}</div>
              <div className="text-xs text-muted-foreground">Donations</div>
            </motion.div>

            <motion.div
              className="bg-accent/10 rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center mb-2">
                <div className="bg-accent rounded-full p-2">
                  <Flame className="w-5 h-5 text-accent-foreground" />
                </div>
              </div>
              <div className="text-2xl text-accent">{currentStreak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </motion.div>

            <motion.div
              className="bg-chart-4/10 rounded-2xl p-4 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-center mb-2">
                <div className="bg-chart-4 rounded-full p-2">
                  <Heart className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="text-2xl text-chart-4">{totalImpact}</div>
              <div className="text-xs text-muted-foreground">Items Given</div>
            </motion.div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <h3>Your Badges</h3>
            <div className="grid grid-cols-3 gap-3">
              {badges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className={`bg-secondary/50 rounded-2xl p-4 text-center ${
                    !badge.earned && 'opacity-40'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: badge.earned ? 1 : 0.4 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: badge.earned ? 1.05 : 1 }}
                >
                  <div className="flex justify-center mb-2">
                    <div
                      className={`${
                        badge.earned ? 'bg-primary' : 'bg-muted'
                      } rounded-full p-3`}
                    >
                      <badge.icon
                        className={`w-6 h-6 ${
                          badge.earned ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-xs">{badge.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Geo Badges */}
          <div className="space-y-3">
            <h3>Location Badges</h3>
            <div className="space-y-2">
              {geoBadges.map((geo, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-2xl"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`${
                        geo.earned ? 'bg-primary' : 'bg-muted'
                      } rounded-full p-2`}
                    >
                      <MapPin
                        className={`w-4 h-4 ${
                          geo.earned ? 'text-primary-foreground' : 'text-muted-foreground'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-sm">{geo.location}</p>
                      <p className="text-xs text-muted-foreground">
                        {geo.visits} {geo.visits === 1 ? 'visit' : 'visits'}
                      </p>
                    </div>
                  </div>
                  {geo.earned && (
                    <Badge className="bg-primary text-primary-foreground rounded-full">
                      Earned
                    </Badge>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Next Milestone */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <h3>Next Milestone</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">30 Donations</span>
                <span className="text-primary">{totalDonations}/30</span>
              </div>
              <Progress value={(totalDonations / 30) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {30 - totalDonations} more to unlock "Super Helper" badge!
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-3">
            <h3>Recent Activity</h3>
            <div className="space-y-2">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="p-4 bg-secondary/50 rounded-2xl space-y-2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4>{activity.campaign}</h4>
                      <p className="text-xs text-muted-foreground">{activity.organization}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full text-xs">
                      {activity.date}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Donated {activity.items}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
