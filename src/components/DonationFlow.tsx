import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface DonationFlowProps {
  campaign: {
    id: string;
    title: string;
    organization: string;
  };
  onClose: () => void;
  onComplete: () => void;
}

export function DonationFlow({ campaign, onClose, onComplete }: DonationFlowProps) {
  const [step, setStep] = useState<'select' | 'confirm' | 'complete'>('select');

  const handleComplete = () => {
    setStep('complete');
    setTimeout(() => {
      onComplete();
      onClose();
    }, 2000);
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="fixed inset-4 md:inset-20 lg:inset-32 bg-background rounded-3xl z-[60] overflow-hidden flex flex-col shadow-2xl max-w-2xl mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Confirm Donation</h2>
            <p className="text-sm text-muted-foreground">{campaign.organization}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {step === 'select' && (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Select what you'll be donating to <span className="font-medium text-foreground">{campaign.title}</span>
              </p>
              <div className="space-y-2">
                {['Clothes', 'Food', 'Household Items', 'Other'].map((item) => (
                  <Button
                    key={item}
                    variant="outline"
                    className="w-full justify-start rounded-2xl h-14"
                    onClick={() => setStep('confirm')}
                  >
                    <Package className="w-5 h-5 mr-3" />
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {step === 'confirm' && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-secondary rounded-full mx-auto flex items-center justify-center">
                <Package className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ready to donate?</h3>
                <p className="text-muted-foreground">
                  Confirm your donation to help the community
                </p>
              </div>
              <Button
                onClick={handleComplete}
                className="w-full h-12 rounded-full"
              >
                Confirm Donation
              </Button>
            </div>
          )}

          {step === 'complete' && (
            <motion.div
              className="space-y-6 text-center py-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Thank you! 🎉</h3>
                <p className="text-muted-foreground">
                  You just helped your neighborhood!
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}
