import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode, CheckCircle2, Sparkles, TrendingUp, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface DonationFlowProps {
  campaign: {
    id: string;
    title: string;
    organization: string;
  };
  onClose: () => void;
}

export function DonationFlow({ campaign, onClose }: DonationFlowProps) {
  const [step, setStep] = useState<'details' | 'confirm' | 'success'>('details');
  const [donationDetails, setDonationDetails] = useState({
    items: '',
    quantity: '',
    notes: '',
  });

  const handleSubmit = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('success');
    // Simulate impact ripple on map
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={step === 'success' ? onClose : undefined}
      />

      <motion.div
        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-background rounded-3xl z-[60] overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2>Log Your Donation</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Help track the impact for {campaign.organization}
                  </p>
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

              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="items">What are you donating?</Label>
                  <Input
                    id="items"
                    placeholder="e.g., Winter coats, canned food"
                    value={donationDetails.items}
                    onChange={(e) =>
                      setDonationDetails({ ...donationDetails, items: e.target.value })
                    }
                    className="rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="How many items?"
                    value={donationDetails.quantity}
                    onChange={(e) =>
                      setDonationDetails({ ...donationDetails, quantity: e.target.value })
                    }
                    className="rounded-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional details..."
                    value={donationDetails.notes}
                    onChange={(e) =>
                      setDonationDetails({ ...donationDetails, notes: e.target.value })
                    }
                    className="rounded-2xl min-h-24"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleSubmit}
                  disabled={!donationDetails.items || !donationDetails.quantity}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <h2>Scan QR Code</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confirm your donation at the drop-off location
                  </p>
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

              {/* QR Code Placeholder */}
              <div className="flex flex-col items-center gap-4 py-8">
                <motion.div
                  className="bg-secondary rounded-3xl p-8"
                  animate={{
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <QrCode className="w-32 h-32 text-primary" />
                </motion.div>
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Show this code to the organization representative
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Code: #{campaign.id.slice(0, 6).toUpperCase()}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-secondary/50 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items:</span>
                  <span>{donationDetails.items}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span>{donationDetails.quantity}</span>
                </div>
                {donationDetails.notes && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground">{donationDetails.notes}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => setStep('details')}
                >
                  Back
                </Button>
                <Button
                  className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleConfirm}
                >
                  Mark as Delivered
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 space-y-6 text-center"
            >
              {/* Success Animation */}
              <div className="py-8">
                <motion.div
                  className="relative inline-block"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 10 }}
                >
                  <div className="bg-primary rounded-full p-6">
                    <CheckCircle2 className="w-16 h-16 text-primary-foreground" />
                  </div>
                  {/* Confetti */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i * Math.PI) / 4) * 100,
                        y: Math.sin((i * Math.PI) / 4) * 100,
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    >
                      <Sparkles className="w-4 h-4 text-primary" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <h2>You just helped your neighborhood!</h2>
                <p className="text-muted-foreground">
                  Your donation has been logged and the organization has been notified
                </p>
              </div>

              {/* Stats Update */}
              <div className="bg-primary/10 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm">Campaign Progress Updated</span>
                  </div>
                  <span className="text-sm text-primary">+{donationDetails.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <span className="text-sm">Your Total Donations</span>
                  </div>
                  <span className="text-sm text-primary">+1 Drive</span>
                </div>
              </div>

              {/* Auto-close notice */}
              <p className="text-xs text-muted-foreground">
                This window will close automatically...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
