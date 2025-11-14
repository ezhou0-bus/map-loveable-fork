import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  fallbackRoute?: string;
  label?: string;
  className?: string;
  variant?: 'light' | 'dark';
}

export function BackButton({ 
  fallbackRoute = '/', 
  label = 'Back',
  className = '',
  variant = 'light'
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      // Fallback to specified route if no history
      navigate(fallbackRoute);
    }
  };

  const variantClasses = variant === 'light' 
    ? 'text-primary-foreground/90 hover:text-primary-foreground'
    : 'text-foreground/90 hover:text-foreground';

  return (
    <motion.button
      onClick={handleBack}
      className={`flex items-center gap-2 ${variantClasses} cursor-pointer ${className}`}
      whileHover={{ x: -4 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm">{label}</span>
    </motion.button>
  );
}
