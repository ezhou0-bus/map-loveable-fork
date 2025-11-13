import React from 'react';
import { motion } from 'framer-motion';
import { X, SlidersHorizontal } from 'lucide-react';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    maxDistance: number;
    urgency: string[];
    showOnlyActive: boolean;
  };
  onFilterChange: (filters: any) => void;
}

const categories = [
  'Clothes',
  'Food',
  'Shoes',
  'Pet Supplies',
  'Furniture',
  'Electronics',
  'Household Items',
  'Books',
  'Toys',
];

const urgencyLevels = ['Low', 'Medium', 'High'];

export function FilterPanel({ isOpen, onClose, filters, onFilterChange }: FilterPanelProps) {
  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const toggleUrgency = (urgency: string) => {
    const newUrgency = filters.urgency.includes(urgency)
      ? filters.urgency.filter(u => u !== urgency)
      : [...filters.urgency, urgency];
    onFilterChange({ ...filters, urgency: newUrgency });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/20 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              <h2>Filters</h2>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.div key={category} whileTap={{ scale: 0.95 }}>
                  <Badge
                    variant={filters.categories.includes(category) ? 'default' : 'outline'}
                    className={`cursor-pointer rounded-full px-4 py-2 ${
                      filters.categories.includes(category)
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Max Distance</Label>
              <span className="text-sm text-muted-foreground">{filters.maxDistance} miles</span>
            </div>
            <Slider
              value={[filters.maxDistance]}
              onValueChange={(value) => onFilterChange({ ...filters, maxDistance: value[0] })}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Urgency */}
          <div className="space-y-3">
            <Label>Urgency Level</Label>
            <div className="flex gap-2">
              {urgencyLevels.map((urgency) => (
                <motion.div key={urgency} whileTap={{ scale: 0.95 }} className="flex-1">
                  <Badge
                    variant={filters.urgency.includes(urgency.toLowerCase()) ? 'default' : 'outline'}
                    className={`w-full cursor-pointer rounded-full px-4 py-2 justify-center ${
                      filters.urgency.includes(urgency.toLowerCase())
                        ? urgency === 'High'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-primary text-primary-foreground'
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => toggleUrgency(urgency.toLowerCase())}
                  >
                    {urgency}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Active Drives Only */}
          <div className="flex items-center justify-between py-3 border-t border-border">
            <Label htmlFor="active-only">Show only active drives</Label>
            <Switch
              id="active-only"
              checked={filters.showOnlyActive}
              onCheckedChange={(checked) =>
                onFilterChange({ ...filters, showOnlyActive: checked })
              }
            />
          </div>

          {/* Clear All */}
          <motion.button
            className="w-full py-3 rounded-full border-2 border-border hover:bg-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              onFilterChange({
                categories: [],
                maxDistance: 25,
                urgency: [],
                showOnlyActive: false,
              })
            }
          >
            Clear All Filters
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
