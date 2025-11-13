export interface Campaign {
  id: string;
  title: string;
  organization: string;
  organizationLogo?: string;
  category: string;
  urgency: 'low' | 'medium' | 'high';
  distance: number;
  deadline: string;
  itemsNeeded: number;
  itemsCollected: number;
  lat: number;
  lng: number;
  image?: string;
  description: string;
  fullDescription: string;
  itemsList: string[];
  impact: string;
  address: string;
  hours: string;
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  recentDonations: Array<{
    donor: string;
    items: string;
    time: string;
  }>;
}
