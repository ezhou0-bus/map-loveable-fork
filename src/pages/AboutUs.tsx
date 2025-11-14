import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Shield, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BackButton } from '@/components/BackButton';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-full p-2">
                <Heart className="w-6 h-6 text-primary-foreground" fill="currentColor" />
              </div>
              <h1 className="text-2xl font-bold text-primary">GiveGo</h1>
            </Link>
            <BackButton label="Back to Map" variant="dark" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Heart className="w-4 h-4" fill="currentColor" />
              <span className="text-sm font-medium">About GiveGo</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Making Giving Effortless, Local, and Human
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Connecting people with nearby donation opportunities so they can create real, visible impact in their communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-2xl">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Mission Statement</h2>
            </div>
            <div className="bg-card rounded-3xl p-8 border border-border shadow-lg">
              <p className="text-lg leading-relaxed text-foreground mb-4">
                GiveGo's mission is to make giving effortless, local, and human—connecting people with nearby donation opportunities so they can create real, visible impact in their communities.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We believe generosity should feel simple, immediate, and joyful. By turning nearby needs into a living map, GiveGo empowers people to show up for one another, one small act at a time.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Core Values</h2>
              <p className="text-muted-foreground">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Community First */}
              <motion.div
                className="bg-card rounded-3xl p-8 border border-border shadow-lg"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Community First</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We design for connection, not clicks. Every feature strengthens the fabric of neighborhoods by making it easier for people to support one another.
                </p>
              </motion.div>

              {/* Radical Simplicity */}
              <motion.div
                className="bg-card rounded-3xl p-8 border border-border shadow-lg"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Radical Simplicity</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Giving should be as easy as tapping a pin on a map. We eliminate friction, complexity, and clutter so action can happen in seconds.
                </p>
              </motion.div>

              {/* Transparency & Impact */}
              <motion.div
                className="bg-card rounded-3xl p-8 border border-border shadow-lg"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Transparency & Impact</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  People deserve to know where their donations go and how they matter. GiveGo makes impact visible—one coat, one meal, one family at a time.
                </p>
              </motion.div>

              {/* Integrity & Trust */}
              <motion.div
                className="bg-card rounded-3xl p-8 border border-border shadow-lg"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Integrity & Trust</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  We uplift legitimate, community-backed drives. Trust is a cornerstone of giving, so we prioritize safety, verification, and accountability.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder's Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">The Founder's Story</h2>
              <p className="text-muted-foreground">How a winter coat changed everything</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-lg space-y-6 text-foreground">
                <p className="text-lg leading-relaxed">
                  GiveGo began with something unexpectedly simple: <span className="font-semibold text-primary">a winter coat</span>.
                </p>

                <p className="leading-relaxed">
                  One of the founders had a perfectly good coat sitting in a closet—warm, barely worn, and untouched for years. They knew someone in the city could use it far more than they could. But where could they take it?
                </p>

                <p className="leading-relaxed">
                  Facebook posts were outdated. Flyers were inconsistent. Google Maps didn't help. A friend texted, <em>"There's a drive somewhere near the library, I think,"</em> but they weren't sure.
                </p>

                <p className="leading-relaxed">
                  After an hour of searching, the coat stayed in the closet.
                </p>

                <p className="leading-relaxed">
                  A week later, the founder walked past a local shelter and saw a sign:<br />
                  <span className="inline-block mt-2 px-4 py-2 bg-primary/10 rounded-lg font-medium">"Coat donations needed. Urgent."</span>
                </p>

                <p className="leading-relaxed font-medium">
                  It was three blocks away.
                </p>

                <p className="leading-relaxed">
                  That moment sparked something.
                </p>

                <div className="bg-muted/50 rounded-2xl p-6 space-y-3 my-8">
                  <p className="leading-relaxed">💭 How many people want to donate, but simply don't know where to go?</p>
                  <p className="leading-relaxed">💭 How many local efforts struggle to spread the word?</p>
                  <p className="leading-relaxed">💭 How many opportunities for kindness are lost in the noise?</p>
                </div>

                <p className="leading-relaxed">
                  The founders—students, neighbors, and community advocates—started asking around. Everyone had a story like that:
                </p>

                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>Furniture left on the curb because no one knew who needed it</li>
                  <li>Shelters overwhelmed some weeks and empty-handed the next</li>
                  <li>Drives announced on random flyers, emails, and social posts that never reached those who wanted to help</li>
                </ul>

                <p className="leading-relaxed font-medium">
                  There was generosity everywhere—just no simple system to connect it.
                </p>

                <p className="leading-relaxed">
                  So they imagined a different world:
                </p>

                <div className="bg-primary/5 rounded-2xl p-6 space-y-3 my-8">
                  <p className="leading-relaxed">✨ What if every nearby need appeared on a map?</p>
                  <p className="leading-relaxed">✨ What if giving felt as easy as finding a coffee shop?</p>
                  <p className="leading-relaxed">✨ What if communities could see their collective impact, not just hope they made one?</p>
                </div>

                <p className="text-lg font-semibold leading-relaxed">
                  GiveGo was born from that vision.
                </p>

                <p className="leading-relaxed">
                  A tool designed not just to list donation drives, but to build a sense of belonging.<br />
                  A place where small acts add up visibly.<br />
                  A warm, welcoming home for generosity.
                </p>

                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 mt-8">
                  <p className="text-lg leading-relaxed">
                    Today, GiveGo is the product the founders wished they'd had that day—the map that helps a coat find its home faster, the bridge between willing donors and overwhelmed organizers, and a joyful spark that reminds people how powerful communities can be when everyone shows up.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community and start making a difference in your neighborhood today.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/">
                Explore Donation Drives
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
