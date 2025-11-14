import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  Clock,
  Share2,
  Heart,
  TrendingUp,
  CheckCircle2,
  Users,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DonationFlow } from './DonationFlow';
import { Campaign } from '@/types/campaign';

interface CampaignDetailProps {
  campaign: Campaign;
  onClose: () => void;
}

export function CampaignDetail({ campaign, onClose }: CampaignDetailProps) {
  const [showDonationFlow, setShowDonationFlow] = useState(false);
  const progress = (campaign.itemsCollected / campaign.itemsNeeded) * 100;

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
        {/* Header Image */}
        <div className="relative h-64 bg-secondary">
          {campaign.image && (
            <ImageWithFallback
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Close Button */}
          <motion.button
            className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Actions */}
          <div className="absolute top-4 left-4 flex gap-2">
            <motion.button
              className="bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 text-accent" />
            </motion.button>
            <motion.button
              className="bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Share2 className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm opacity-90">{campaign.organization}</p>
            <h1 className="text-white mt-1">{campaign.title}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Quick Info */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary text-primary-foreground rounded-full px-4 py-2">
                {campaign.category}
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {campaign.distance} mi away
              </Badge>
              <Badge variant="outline" className="rounded-full px-4 py-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Ends {campaign.deadline}
              </Badge>
            </div>

            {/* Progress */}
            <div className="bg-secondary/50 rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Campaign Progress</span>
                </div>
                <span className="text-primary">{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {campaign.itemsCollected} items collected
                </span>
                <span>Goal: {campaign.itemsNeeded} items</span>
              </div>
            </div>

            {/* Impact */}
            <motion.div
              className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-6"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary rounded-full p-2">
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-primary">Your Impact</h3>
                  <p className="text-sm text-muted-foreground mt-1">{campaign.impact}</p>
                </div>
              </div>
            </motion.div>

            {/* Tabs */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full rounded-full bg-secondary">
                <TabsTrigger value="about" className="flex-1 rounded-full">
                  About
                </TabsTrigger>
                <TabsTrigger value="items" className="flex-1 rounded-full">
                  Items Needed
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1 rounded-full">
                  Location
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-4 mt-4">
                <div>
                  <h3>About this drive</h3>
                  <p className="text-muted-foreground mt-2">{campaign.fullDescription}</p>
                </div>

                {/* Recent Donations */}
                <div>
                  <h3>Recent Contributions</h3>
                  <div className="mt-3 space-y-3">
                    {campaign.recentDonations.map((donation, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-secondary/50 rounded-2xl"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="bg-primary rounded-full p-2">
                          <Users className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{donation.donor}</p>
                          <p className="text-xs text-muted-foreground">{donation.items}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{donation.time}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="items" className="space-y-3 mt-4">
                <h3>Items Needed</h3>
                <div className="space-y-4">
                  {campaign.itemsList.map((item, index) => {
                    const itemProgress = (item.collected / item.needed) * 100;
                    return (
                      <motion.div
                        key={index}
                        className="p-4 bg-secondary/50 rounded-2xl space-y-3"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {item.collected} / {item.needed}
                          </span>
                        </div>
                        <Progress value={itemProgress} />
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4 mt-4">
                <div>
                  <h3>Drop-off Location</h3>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-muted-foreground text-sm">Address</p>
                        <p>{campaign.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-muted-foreground text-sm">Hours</p>
                        <p>{campaign.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Contact Information</h3>
                  <div className="mt-4 space-y-3">
                    <a
                      href={`tel:${campaign.contact.phone}`}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors"
                    >
                      <Phone className="w-5 h-5 text-primary" />
                      <span>{campaign.contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${campaign.contact.email}`}
                      className="flex items-center gap-3 p-3 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors"
                    >
                      <Mail className="w-5 h-5 text-primary" />
                      <span>{campaign.contact.email}</span>
                    </a>
                    {campaign.contact.website && (
                      <a
                        href={campaign.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-secondary/50 rounded-2xl hover:bg-secondary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5 text-primary" />
                        <span>Visit Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 border-t border-border bg-background">
          <Button
            onClick={() => setShowDonationFlow(true)}
            className="w-full h-14 rounded-full text-lg"
            size="lg"
          >
            I Want to Donate
          </Button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDonationFlow && (
          <DonationFlow
            campaign={campaign}
            onClose={() => setShowDonationFlow(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
