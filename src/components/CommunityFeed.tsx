import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, MapPin, Users, Sparkles, Award } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

const feedItems = [
  {
    id: 1,
    type: 'milestone',
    title: 'Winter Clothing Drive reached 100% goal!',
    organization: 'Community Shelter',
    description: '150 winter coats collected for families in need',
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'donation',
    user: 'Sarah M.',
    title: 'donated to Food Bank Collection',
    organization: "St. Mary's Food Bank",
    description: '25 canned goods',
    icon: Heart,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'new_drive',
    title: 'New Drive Started',
    organization: 'Local Pet Shelter',
    description: 'Pet supplies needed: food, toys, blankets',
    location: '0.8 miles away',
    icon: Sparkles,
    color: 'text-chart-4',
    bgColor: 'bg-chart-4/10',
    time: '6 hours ago',
  },
  {
    id: 4,
    type: 'achievement',
    user: 'Mike P.',
    title: 'earned the "Super Giver" badge!',
    description: '30 donations completed',
    icon: Award,
    color: 'text-chart-5',
    bgColor: 'bg-chart-5/10',
    time: '1 day ago',
  },
  {
    id: 5,
    type: 'donation',
    user: 'Community Members',
    title: '12 people donated today',
    organization: 'School Supplies Drive',
    description: 'Together we collected 85 items',
    icon: Users,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    time: '1 day ago',
  },
  {
    id: 6,
    type: 'milestone',
    title: 'Thanksgiving Food Drive Complete!',
    organization: 'Downtown Food Pantry',
    description: '500 meals provided to local families',
    icon: TrendingUp,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    time: '2 days ago',
  },
];

export function CommunityFeed() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3>Community Highlights</h3>
      </div>

      <div className="space-y-3">
        {feedItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-card border-2 border-border rounded-2xl p-4 hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex gap-3">
              {/* Icon */}
              <div className={`${item.bgColor} rounded-full p-2 h-fit`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div>
                  {item.user && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {item.user
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">
                        <span>{item.user}</span>
                        <span className="text-muted-foreground"> {item.title}</span>
                      </span>
                    </div>
                  )}
                  {!item.user && <h4 className="text-sm">{item.title}</h4>}
                  {item.organization && (
                    <p className="text-xs text-muted-foreground">{item.organization}</p>
                  )}
                </div>

                <p className="text-sm text-muted-foreground">{item.description}</p>

                {item.location && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                  {item.type === 'milestone' && (
                    <Badge variant="outline" className="rounded-full text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Milestone
                    </Badge>
                  )}
                  {item.type === 'new_drive' && (
                    <Badge className="bg-primary text-primary-foreground rounded-full text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <motion.button
        className="w-full py-3 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Load more activities...
      </motion.button>
    </div>
  );
}
