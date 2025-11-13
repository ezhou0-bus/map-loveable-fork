import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Heart, 
  Sparkles, 
  ChevronRight,
  Shirt,
  UtensilsCrossed,
  PawPrint,
  Droplet,
  Baby,
  Book,
  MapPinned,
  Package
} from "lucide-react";

const categories = [
  { id: "clothing", name: "Clothing", icon: Shirt },
  { id: "food", name: "Food", icon: UtensilsCrossed },
  { id: "pets", name: "Pet Supplies", icon: PawPrint },
  { id: "water", name: "Water", icon: Droplet },
  { id: "baby", name: "Baby Items", icon: Baby },
  { id: "books", name: "Books", icon: Book },
  { id: "household", name: "Household", icon: Package },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const totalSteps = 6;

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    localStorage.setItem("givego_onboarding_complete", "true");
    localStorage.setItem("givego_categories", JSON.stringify(selectedCategories));
    localStorage.setItem("givego_location", location);
    navigate("/");
  };

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="mb-8 flex gap-2 justify-center">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? "w-8 bg-primary" : "w-1.5 bg-primary/20"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            custom={step}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="bg-card rounded-3xl shadow-xl p-8 border border-border/50"
          >
            {/* Step 0: Welcome */}
            {step === 0 && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center"
                >
                  <Heart className="w-12 h-12 text-primary" fill="currentColor" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h1 className="text-3xl font-bold text-foreground mb-3">
                    Welcome to GiveGo
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Let's light up your community together
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm text-muted-foreground max-w-sm mx-auto"
                >
                  Discover local donation drives, give what you can, and watch your neighborhood thrive — one small act at a time.
                </motion.p>
              </div>
            )}

            {/* Step 1: Discover */}
            {step === 1 && (
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="relative w-32 h-32 mx-auto"
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-primary" />
                  </div>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: [0, 1, 0] }}
                      transition={{
                        delay: i * 0.3,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                      className="absolute inset-0 bg-primary/20 rounded-full"
                      style={{ transform: `scale(${1 + i * 0.3})` }}
                    />
                  ))}
                </motion.div>

                <div>
                  <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">Step 1</Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Discover Local Donation Drives
                  </h2>
                  <p className="text-muted-foreground">
                    See real-time needs in your neighborhood. Every glowing pin is an opportunity to help.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Donate */}
            {step === 2 && (
              <div className="text-center space-y-6">
                <motion.div className="relative w-32 h-32 mx-auto">
                  <div className="absolute inset-0 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-secondary" />
                  </div>
                  {[Shirt, UtensilsCrossed, Book].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.2 + i * 0.2,
                        type: "spring",
                        stiffness: 300
                      }}
                      className="absolute w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${10 + (i % 2) * 20}%`
                      }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                  ))}
                </motion.div>

                <div>
                  <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20">Step 2</Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    Donate What You Can, When You Can
                  </h2>
                  <p className="text-muted-foreground">
                    No donation is too small. Drop off clothes, food, supplies — whatever helps your neighbors.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Impact */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <motion.div className="relative w-32 h-32 mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="absolute inset-0 bg-accent/10 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="w-16 h-16 text-accent" fill="currentColor" />
                  </motion.div>
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 2, 3], opacity: [0.5, 0.3, 0] }}
                      transition={{
                        delay: i * 0.4,
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5
                      }}
                      className="absolute inset-0 border-2 border-accent rounded-full"
                    />
                  ))}
                </motion.div>

                <div>
                  <Badge className="mb-3 bg-accent/10 text-accent border-accent/20">Step 3</Badge>
                  <h2 className="text-2xl font-bold text-foreground mb-3">
                    See Your Impact Instantly
                  </h2>
                  <p className="text-muted-foreground">
                    Watch your donation help your neighborhood thrive. Every small act matters.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Categories */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    What Matters to You?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Choose the causes you care about most
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategories.includes(category.id);
                    return (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleCategory(category.id)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          isSelected
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border bg-card hover:border-primary/50"
                        }`}
                      >
                        <Icon className={`w-8 h-8 mx-auto mb-2 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                        <p className={`text-sm font-medium ${isSelected ? "text-primary" : "text-foreground"}`}>
                          {category.name}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>

                <p className="text-xs text-center text-muted-foreground">
                  You can always change this later
                </p>
              </div>
            )}

            {/* Step 5: Location */}
            {step === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring" }}
                    className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4"
                  >
                    <MapPinned className="w-10 h-10 text-primary" />
                  </motion.div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Where Do You Call Home?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    This helps us find nearby drives so you can make a difference close to home
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your city or ZIP code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    We respect your privacy. Location is only used to show nearby donation drives.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={nextStep}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={step === 4 && selectedCategories.length === 0}
              >
                {step === totalSteps - 1 ? "Let's Start Giving!" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {step === 0 && (
              <button
                onClick={handleComplete}
                className="w-full text-center text-sm text-muted-foreground mt-4 hover:text-foreground transition-colors"
              >
                Skip onboarding
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
