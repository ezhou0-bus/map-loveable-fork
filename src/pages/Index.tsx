import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MapIcon,
  List,
  SlidersHorizontal,
  User,
  Search,
  Heart,
  Footprints,
  Laptop,
  Apple,
} from 'lucide-react';
import { MapView } from '@/components/MapView';
import { OnboardingTour } from '@/components/OnboardingTour';
import { FilterPanel } from '@/components/FilterPanel';
import { CampaignCard } from '@/components/CampaignCard';
import { CampaignDetail } from '@/components/CampaignDetail';
import { UserProfile } from '@/components/UserProfile';
import { CommunityFeed } from '@/components/CommunityFeed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Campaign } from '@/types/campaign';

// Mock Data
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Winter Clothing Drive for Homeless Families',
    organization: 'Community Shelter',
    category: 'Clothes',
    urgency: 'high' as const,
    distance: 0.5,
    deadline: 'Nov 20',
    itemsNeeded: 150,
    itemsCollected: 112,
    image: 'https://images.unsplash.com/photo-1600186755589-84242bd8368f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG90aGluZyUyMGRvbmF0aW9uJTIwYm94ZXN8ZW58MXx8fHwxNzYzMDUzODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Help keep families warm this winter with donations of coats, gloves, and blankets.',
    fullDescription: 'As winter approaches, many families in our community are facing the cold without adequate clothing. The Community Shelter is collecting winter essentials to help keep our neighbors warm and safe. Every coat, pair of gloves, or blanket makes a real difference in someone\'s life.',
    itemsList: [
      { name: 'Winter coats (all sizes)', needed: 50, collected: 38 },
      { name: 'Warm gloves and mittens', needed: 30, collected: 25 },
      { name: 'Wool blankets', needed: 25, collected: 20 },
      { name: 'Thermal underwear', needed: 20, collected: 15 },
      { name: 'Winter hats and scarves', needed: 15, collected: 10 },
      { name: 'Waterproof boots', needed: 10, collected: 4 },
    ],
    impact: '12 coats = 1 family stays warm all winter. Your donation directly helps neighbors in need.',
    address: '456 Oak Street, Downtown',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    contact: {
      phone: '(555) 123-4567',
      email: 'donations@communityshelter.org',
      website: 'https://communityshelter.org',
    },
    recentDonations: [
      { donor: 'Sarah M.', items: '5 winter coats', time: '2h ago' },
      { donor: 'John D.', items: '10 pairs of gloves', time: '5h ago' },
      { donor: 'Anonymous', items: '3 blankets', time: '1d ago' },
    ],
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: '2',
    title: 'Thanksgiving Food Bank Collection',
    organization: "St. Mary's Food Bank",
    category: 'Food',
    urgency: 'high' as const,
    distance: 1.2,
    deadline: 'Nov 15',
    itemsNeeded: 500,
    itemsCollected: 387,
    image: 'https://images.unsplash.com/photo-1609139027234-57570f43f692?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwYmFuayUyMGRvbmF0aW9ufGVufDF8fHx8MTc2MzA1Mzg5MXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Donate non-perishable foods to help families celebrate Thanksgiving together.',
    fullDescription: 'This Thanksgiving, help ensure every family in our community has a meal to share. We\'re collecting non-perishable food items to create holiday meal packages for families facing food insecurity.',
    itemsList: [
      { name: 'Canned vegetables', needed: 100, collected: 78 },
      { name: 'Canned fruits', needed: 80, collected: 65 },
      { name: 'Pasta and rice', needed: 75, collected: 60 },
      { name: 'Peanut butter', needed: 50, collected: 40 },
      { name: 'Canned soup', needed: 60, collected: 45 },
      { name: 'Cereal', needed: 70, collected: 52 },
      { name: 'Cooking oil', needed: 35, collected: 25 },
      { name: 'Boxed stuffing', needed: 30, collected: 22 },
    ],
    impact: '20 canned items = 1 complete Thanksgiving meal for a family of four.',
    address: '789 Maple Ave, Riverside',
    hours: 'Mon-Sat: 8AM-7PM, Sun: 10AM-3PM',
    contact: {
      phone: '(555) 234-5678',
      email: 'info@stmarysfoodbank.org',
      website: 'https://stmarysfoodbank.org',
    },
    recentDonations: [
      { donor: 'Mike P.', items: '25 canned goods', time: '1h ago' },
      { donor: 'Lisa K.', items: '15 boxes of pasta', time: '6h ago' },
      { donor: 'Community Church', items: '50 meal kits', time: '1d ago' },
    ],
    lat: 40.715,
    lng: -74.008,
  },
  {
    id: '3',
    title: 'School Supplies for Underprivileged Students',
    organization: 'Lincoln Elementary School',
    category: 'School Supplies',
    urgency: 'medium' as const,
    distance: 2.3,
    deadline: 'Nov 30',
    itemsNeeded: 200,
    itemsCollected: 95,
    image: 'https://images.unsplash.com/photo-1710092784814-4a6f158913b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjB2b2x1bnRlZXJzJTIwZG9uYXRpb258ZW58MXx8fHwxNzYzMDUzODkxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Help students succeed by donating notebooks, pencils, and other school essentials.',
    fullDescription: 'Education shouldn\'t be limited by access to basic supplies. Help give every student the tools they need to succeed by donating school supplies for children whose families are struggling financially.',
    itemsList: [
      { name: 'Notebooks and composition books', needed: 40, collected: 20 },
      { name: 'Pencils and pens', needed: 30, collected: 15 },
      { name: 'Colored pencils and crayons', needed: 25, collected: 12 },
      { name: 'Folders and binders', needed: 30, collected: 14 },
      { name: 'Backpacks', needed: 20, collected: 10 },
      { name: 'Calculators', needed: 15, collected: 8 },
      { name: 'Art supplies', needed: 25, collected: 10 },
      { name: 'Erasers and rulers', needed: 15, collected: 6 },
    ],
    impact: '1 complete supply kit = 1 student ready to learn all year.',
    address: '321 Pine Street, Uptown',
    hours: 'Mon-Fri: 3PM-6PM (after school)',
    contact: {
      phone: '(555) 345-6789',
      email: 'donations@lincolnelem.edu',
    },
    recentDonations: [
      { donor: 'Emma T.', items: '8 notebooks', time: '4h ago' },
      { donor: 'Teachers Guild', items: '30 supply kits', time: '1d ago' },
    ],
    lat: 40.71,
    lng: -74.004,
  },
  {
    id: '4',
    title: 'Pet Shelter Supply Drive',
    organization: 'Happy Paws Animal Rescue',
    category: 'Pet Supplies',
    urgency: 'low' as const,
    distance: 3.1,
    deadline: 'Dec 15',
    itemsNeeded: 100,
    itemsCollected: 34,
    image: 'https://images.unsplash.com/photo-1617080090911-91409e3496ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyOTc3NDUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Support rescued animals with donations of food, toys, and bedding.',
    fullDescription: 'Our shelter cares for over 50 animals waiting for their forever homes. Help us provide them with the food, comfort, and care they deserve while they wait to be adopted.',
    itemsList: [
      { name: 'Dry dog food', needed: 20, collected: 8 },
      { name: 'Dry cat food', needed: 15, collected: 6 },
      { name: 'Pet toys', needed: 12, collected: 4 },
      { name: 'Blankets and bedding', needed: 10, collected: 3 },
      { name: 'Leashes and collars', needed: 8, collected: 2 },
      { name: 'Food bowls', needed: 10, collected: 4 },
      { name: 'Cat litter', needed: 15, collected: 5 },
      { name: 'Treats', needed: 10, collected: 2 },
    ],
    impact: '10 lbs of food = 1 week of meals for a shelter dog.',
    address: '567 Willow Lane, Westside',
    hours: 'Tue-Sun: 11AM-5PM',
    contact: {
      phone: '(555) 456-7890',
      email: 'help@happypaws.org',
      website: 'https://happypaws.org',
    },
    recentDonations: [
      { donor: 'Pet Lovers Group', items: '12 bags of food', time: '2d ago' },
    ],
    lat: 40.708,
    lng: -74.01,
  },
  {
    id: '5',
    title: 'Electronics Recycling & Donation',
    organization: 'Tech for All Foundation',
    category: 'Electronics',
    urgency: 'low' as const,
    distance: 4.5,
    deadline: 'Dec 31',
    itemsNeeded: 75,
    itemsCollected: 28,
    image: 'https://images.unsplash.com/photo-1653508310086-bd5f097286ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyaXR5JTIwdm9sdW50ZWVycyUyMHNtaWxpbmd8ZW58MXx8fHwxNzYzMDUzODkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Donate working electronics to help bridge the digital divide.',
    fullDescription: 'Many students lack access to technology for remote learning. Help bridge the digital divide by donating working laptops, tablets, and other electronics that will be refurbished and given to students in need.',
    itemsList: [
      { name: 'Laptops (working condition)', needed: 15, collected: 6 },
      { name: 'Tablets', needed: 12, collected: 5 },
      { name: 'Monitors', needed: 10, collected: 4 },
      { name: 'Keyboards and mice', needed: 15, collected: 6 },
      { name: 'Chargers and cables', needed: 10, collected: 3 },
      { name: 'Webcams', needed: 8, collected: 2 },
      { name: 'Headphones', needed: 5, collected: 2 },
    ],
    impact: '1 laptop = 1 student can access online education.',
    address: '890 Tech Drive, Innovation District',
    hours: 'Mon-Fri: 10AM-6PM',
    contact: {
      phone: '(555) 567-8901',
      email: 'donate@techforall.org',
      website: 'https://techforall.org',
    },
    recentDonations: [
      { donor: 'Tech Company', items: '5 laptops', time: '3d ago' },
    ],
    lat: 40.717,
    lng: -74.012,
  },
];

export default function Index() {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [showFilters, setShowFilters] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedMapDrive, setSelectedMapDrive] = useState<Campaign | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    maxDistance: 25,
    urgency: [] as string[],
    showOnlyActive: false,
  });

  // Check if user has seen onboarding
  React.useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('givego_onboarding_tour_complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('givego_onboarding_tour_complete', 'true');
    setShowOnboarding(false);
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (filters.categories.length > 0 && !filters.categories.includes(campaign.category)) {
      return false;
    }
    if (filters.urgency.length > 0 && !filters.urgency.includes(campaign.urgency)) {
      return false;
    }
    if (campaign.distance > filters.maxDistance) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/about">
              <motion.div
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="bg-primary rounded-full p-2">
                  <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
                </div>
                <h1 className="text-2xl font-bold text-primary">GiveGo</h1>
              </motion.div>
            </Link>

            {/* Search */}
            <motion.div
              className="hidden md:flex flex-1 max-w-md mx-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search drives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 rounded-full"
                />
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowFilters(true)}
                data-onboarding="filter-button"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowProfile(true)}
              >
                <User className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Mobile Search */}
          <motion.div
            className="md:hidden mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search drives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Tagline */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 border-b border-primary/10 overflow-hidden">
        {/* Decorative floating donation items */}
        <motion.div
          className="absolute top-4 left-[10%] text-primary/20"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Footprints className="w-6 h-6" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-4 right-[15%] text-primary/20"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Laptop className="w-5 h-5" />
        </motion.div>

        <motion.div
          className="absolute top-6 right-[25%] text-primary/15"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Apple className="w-4 h-4" />
        </motion.div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p
              className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent inline-block"
              animate={{ 
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Give easily. Give locally.
            </motion.p>
            <motion.div
              className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="inline-block">✨</span>
              <span>Find exactly where your donation is needed. Your kindness counts.</span>
              <span className="inline-block">✨</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map/List */}
          <div className="lg:col-span-2 space-y-4">
            {/* View Toggle */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Discover Drives</h2>
              <Tabs value={view} onValueChange={(v) => setView(v as 'map' | 'list')}>
                <TabsList className="rounded-full bg-secondary" data-onboarding="view-toggle">
                  <TabsTrigger value="map" className="rounded-full flex items-center gap-2">
                    <MapIcon className="w-4 h-4" />
                    <span className="hidden sm:inline">Map</span>
                  </TabsTrigger>
                  <TabsTrigger value="list" className="rounded-full flex items-center gap-2">
                    <List className="w-4 h-4" />
                    <span className="hidden sm:inline">List</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Map View */}
            {view === 'map' && (
              <motion.div
                className="h-[500px] lg:h-[700px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <MapView
                  drives={filteredCampaigns}
                  onDriveClick={setSelectedMapDrive}
                  selectedDrive={selectedMapDrive}
                />
              </motion.div>
            )}

            {/* List View */}
            {view === 'list' && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {filteredCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    data-onboarding={index === 0 ? "campaign-card" : undefined}
                  >
                    <CampaignCard
                      campaign={campaign}
                      onClick={() => setSelectedCampaign(campaign)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Selected Map Drive Card */}
            {view === 'map' && selectedMapDrive && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CampaignCard
                  campaign={selectedMapDrive}
                  onClick={() => setSelectedCampaign(selectedMapDrive)}
                />
              </motion.div>
            )}
          </div>

          {/* Right Column - Community Feed */}
          <div className="hidden lg:block">
            <CommunityFeed />
          </div>
        </div>

        {/* Mobile Community Feed */}
        <div className="lg:hidden mt-8">
          <CommunityFeed />
        </div>
      </main>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            filters={filters}
            onFilterChange={setFilters}
          />
        )}
      </AnimatePresence>

      {/* User Profile */}
      <AnimatePresence>
        {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
      </AnimatePresence>

      {/* Campaign Detail */}
      <AnimatePresence>
        {selectedCampaign && (
          <CampaignDetail
            campaign={selectedCampaign}
            onClose={() => setSelectedCampaign(null)}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile) */}
      <motion.div
        className="fixed bottom-6 right-6 lg:hidden z-20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          onClick={() => setView(view === 'map' ? 'list' : 'map')}
        >
          {view === 'map' ? <List className="w-6 h-6" /> : <MapIcon className="w-6 h-6" />}
        </Button>
      </motion.div>

      {/* Onboarding Tour */}
      {showOnboarding && <OnboardingTour onComplete={handleOnboardingComplete} />}
    </div>
  );
}
