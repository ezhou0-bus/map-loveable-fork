import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CampaignCard } from '@/components/CampaignCard';
import { CampaignDetail } from '@/components/CampaignDetail';
import { MapView } from '@/components/MapView';
import { Campaign } from '@/types/campaign';

// Sample data
const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Winter Clothing Drive for Homeless Families',
    organization: 'Community Outreach Center',
    category: 'Clothes',
    urgency: 'high' as const,
    distance: 0.8,
    deadline: 'Dec 25',
    itemsNeeded: 200,
    itemsCollected: 145,
    lat: 40.7148,
    lng: -74.008,
    image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?q=80&w=800',
    description: 'Help us collect warm winter clothes for families in need this holiday season.',
    fullDescription: 'Our community is coming together to ensure no one goes cold this winter. We\'re collecting gently used or new winter clothing including coats, sweaters, scarves, gloves, and warm socks. Every donation helps a family stay warm and comfortable during the harsh winter months.',
    itemsList: ['Winter Coats', 'Sweaters', 'Warm Socks', 'Gloves & Mittens', 'Scarves', 'Winter Hats'],
    impact: 'Your donation helps keep 5 families warm this winter',
    address: '123 Community St, New York, NY 10001',
    hours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM',
    contact: {
      phone: '(555) 123-4567',
      email: 'contact@outreach.org',
      website: 'https://outreach.org'
    },
    recentDonations: [
      { donor: 'Sarah M.', items: '5 winter coats', time: '2 hours ago' },
      { donor: 'Anonymous', items: '20 pairs of gloves', time: '5 hours ago' },
      { donor: 'Mike T.', items: '10 scarves', time: '1 day ago' },
    ]
  },
  {
    id: '2',
    title: 'Food Bank Collection for Local Seniors',
    organization: 'Silver Years Foundation',
    category: 'Food',
    urgency: 'medium' as const,
    distance: 1.2,
    deadline: 'Dec 31',
    itemsNeeded: 500,
    itemsCollected: 320,
    lat: 40.7108,
    lng: -74.004,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
    description: 'Non-perishable food items needed for senior citizens in our community.',
    fullDescription: 'We\'re working to ensure our senior community members have access to nutritious food. Your donations of non-perishable items make a real difference in the lives of elderly neighbors who may be struggling to make ends meet.',
    itemsList: ['Canned Goods', 'Pasta & Rice', 'Cereal', 'Cooking Oil', 'Coffee & Tea', 'Shelf-stable Milk'],
    impact: 'Feed 30 seniors for an entire month',
    address: '456 Elder Ave, New York, NY 10002',
    hours: 'Daily: 8AM-8PM',
    contact: {
      phone: '(555) 234-5678',
      email: 'help@silveryears.org'
    },
    recentDonations: [
      { donor: 'Local Grocery', items: '50 canned goods', time: '1 hour ago' },
      { donor: 'Jennifer L.', items: 'Mixed items', time: '3 hours ago' },
    ]
  },
  {
    id: '3',
    title: 'School Supplies for Underprivileged Kids',
    organization: 'Education First Initiative',
    category: 'School Supplies',
    urgency: 'low' as const,
    distance: 2.5,
    deadline: 'Jan 15',
    itemsNeeded: 150,
    itemsCollected: 45,
    lat: 40.7098,
    lng: -74.012,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800',
    description: 'Help students start the new semester with essential school supplies.',
    fullDescription: 'Every child deserves the tools they need to succeed in school. We\'re collecting notebooks, pens, pencils, backpacks, and other essential supplies for students whose families are facing financial hardship.',
    itemsList: ['Notebooks', 'Pens & Pencils', 'Backpacks', 'Calculators', 'Art Supplies', 'Folders & Binders'],
    impact: 'Support 50 students for the semester',
    address: '789 Learning Blvd, New York, NY 10003',
    hours: 'Weekdays: 3PM-7PM',
    contact: {
      phone: '(555) 345-6789',
      email: 'info@educationfirst.org',
      website: 'https://educationfirst.org'
    },
    recentDonations: [
      { donor: 'Office Depot', items: '25 notebooks', time: '6 hours ago' },
    ]
  },
];

const Index = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedDrive, setSelectedDrive] = useState<Campaign | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">GiveGo</h1>
            <p className="text-sm text-muted-foreground">Discover local donation drives</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          {/* Map Section */}
          <div className="lg:sticky lg:top-24 h-[500px] lg:h-[calc(100vh-200px)]">
            <MapView
              drives={sampleCampaigns}
              onDriveClick={(drive) => {
                setSelectedDrive(drive);
                setSelectedCampaign(drive);
              }}
              selectedDrive={selectedDrive}
            />
          </div>

          {/* Campaigns List */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Active Drives Near You</h2>
              <p className="text-muted-foreground">
                {sampleCampaigns.length} donation opportunities in your area
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              {sampleCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onClick={() => setSelectedCampaign(campaign)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Campaign Detail Modal */}
      <AnimatePresence>
        {selectedCampaign && (
          <CampaignDetail
            campaign={selectedCampaign}
            onClose={() => {
              setSelectedCampaign(null);
              setSelectedDrive(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
