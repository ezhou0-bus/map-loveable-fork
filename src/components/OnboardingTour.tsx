import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OnboardingStep {
  title: string;
  description: string;
  target: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const steps: OnboardingStep[] = [
  {
    title: 'Welcome to GiveGo! 🎉',
    description: 'Let\'s take a quick tour to show you how easy it is to find donation drives near you.',
    target: '',
    position: 'center',
  },
  {
    title: 'Toggle Your View',
    description: 'Switch between Map and List view to see donation drives in the way that works best for you.',
    target: '[data-onboarding="view-toggle"]',
    position: 'bottom',
  },
  {
    title: 'Filter Your Results',
    description: 'Click here to filter drives by category, distance, urgency, and more to find exactly what you\'re looking for.',
    target: '[data-onboarding="filter-button"]',
    position: 'bottom',
  },
  {
    title: 'Explore Donation Drives',
    description: 'Click on any drive card or map pin to see full details, including items needed, location, and how to donate.',
    target: '[data-onboarding="campaign-card"]',
    position: 'top',
  },
  {
    title: 'You\'re All Set! ✨',
    description: 'Start exploring drives near you and make a difference in your community today!',
    target: '',
    position: 'center',
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
}

export function OnboardingTour({ onComplete }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [spotlightPosition, setSpotlightPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const updateSpotlight = () => {
      const targetSelector = steps[currentStep].target;
      if (!targetSelector) {
        setSpotlightPosition({ x: 0, y: 0, width: 0, height: 0 });
        return;
      }

      const element = document.querySelector(targetSelector);
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlightPosition({
          x: rect.left - 8,
          y: rect.top - 8,
          width: rect.width + 16,
          height: rect.height + 16,
        });
      }
    };

    updateSpotlight();
    window.addEventListener('resize', updateSpotlight);
    return () => window.removeEventListener('resize', updateSpotlight);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const step = steps[currentStep];
  const isCenter = step.position === 'center' || !step.target;

  const getTooltipPosition = () => {
    if (isCenter) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    const baseStyle: any = {};
    const tooltipWidth = 384; // max-w-sm = 384px
    const screenWidth = window.innerWidth;
    const padding = 16;
    
    // Calculate ideal position
    let idealLeft = spotlightPosition.x + spotlightPosition.width / 2;
    
    // Check if tooltip would go off right edge
    if (idealLeft + tooltipWidth / 2 > screenWidth - padding) {
      idealLeft = screenWidth - tooltipWidth / 2 - padding;
    }
    
    // Check if tooltip would go off left edge
    if (idealLeft - tooltipWidth / 2 < padding) {
      idealLeft = tooltipWidth / 2 + padding;
    }
    
    switch (step.position) {
      case 'top':
        baseStyle.top = `${spotlightPosition.y - 20}px`;
        baseStyle.left = `${idealLeft}px`;
        baseStyle.transform = 'translate(-50%, -100%)';
        break;
      case 'bottom':
        baseStyle.top = `${spotlightPosition.y + spotlightPosition.height + 20}px`;
        baseStyle.left = `${idealLeft}px`;
        baseStyle.transform = 'translate(-50%, 0)';
        break;
      case 'left':
        baseStyle.top = `${spotlightPosition.y + spotlightPosition.height / 2}px`;
        baseStyle.left = `${spotlightPosition.x - 20}px`;
        baseStyle.transform = 'translate(-100%, -50%)';
        break;
      case 'right':
        baseStyle.top = `${spotlightPosition.y + spotlightPosition.height / 2}px`;
        baseStyle.left = `${spotlightPosition.x + spotlightPosition.width + 20}px`;
        baseStyle.transform = 'translate(0, -50%)';
        break;
    }

    return baseStyle;
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100]">
        {/* Overlay with spotlight cutout */}
        <motion.div
          className="absolute inset-0 bg-black/60 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            clipPath: step.target
              ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${spotlightPosition.x}px ${spotlightPosition.y}px, ${spotlightPosition.x}px ${spotlightPosition.y + spotlightPosition.height}px, ${spotlightPosition.x + spotlightPosition.width}px ${spotlightPosition.y + spotlightPosition.height}px, ${spotlightPosition.x + spotlightPosition.width}px ${spotlightPosition.y}px, ${spotlightPosition.x}px ${spotlightPosition.y}px)`
              : 'none',
          }}
        />

        {/* Spotlight ring */}
        {step.target && (
          <motion.div
            className="absolute border-4 border-primary rounded-2xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: '0 0 0 4px rgba(var(--primary), 0.2), 0 0 20px rgba(var(--primary), 0.3)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              left: `${spotlightPosition.x}px`,
              top: `${spotlightPosition.y}px`,
              width: `${spotlightPosition.width}px`,
              height: `${spotlightPosition.height}px`,
            }}
          />
        )}

        {/* Tooltip */}
        <motion.div
          className="absolute z-[101] pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          style={getTooltipPosition()}
        >
          <div className="bg-card border-2 border-primary rounded-3xl shadow-2xl p-6 max-w-sm">
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 pr-6">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'w-6 bg-primary'
                      : 'w-2 bg-primary/30'
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                size="sm"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full px-6"
              >
                {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
                {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>

            {/* Skip button */}
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleSkip}
                className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip tour
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
