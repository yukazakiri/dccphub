import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';
import { motion } from 'framer-motion';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Navbar } from '@/Components/Navbar';
import { toast } from 'sonner';
import { BookOpen, Users2, Trophy, Rocket, ArrowRight, CheckCircle2 } from 'lucide-react';
import { BetaSignupDialog } from '@/Components/BetaSignupDialog';

interface Props {
  canLogin: boolean;
  canRegister: boolean;
}

export default function Welcome({
  canLogin,
  canRegister,
}: Props) {
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Welcome aboard! 🚀', {
      description: "You're on the waitlist. We'll notify you soon!",
    });
    setEmail('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030014]">
      <Head title="DCCP Hub - Integrated Learning Platform" />

      <div className="relative w-full">
        <Navbar />
      </div>

      <main className="relative flex items-center justify-center w-full min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(181,124,236,0.15),transparent_50%)]" />

        <div className="container relative px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-6 py-2 mb-6 text-sm font-medium text-purple-300 border rounded-full bg-purple-500/10 border-purple-500/20"
            >
              🎓 Data Center College of the Philippines
            </motion.div>

            <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
              Empowering Education
              <span className="block mt-2 text-transparent bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] bg-clip-text">
                Together
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-lg leading-relaxed text-gray-400">
              A unified platform for DCCP faculty and students, featuring smart collaboration tools,
              streamlined academic management, and enhanced learning experiences.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center justify-center w-full max-w-md gap-4 mt-10 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your DCCP email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-white bg-white/5 border-white/10 placeholder:text-gray-500"
              />
              <Button
                onClick={() => setIsDialogOpen(true)}
                className="relative w-full sm:w-auto group bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] text-white px-6"
              >
                Join Beta
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-gray-400">
              {[
                'Integrated Campus System',
                'Real-time Updates',
                'Secure Platform'
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <section className="py-20 border-t border-white/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Why Choose DCCP Hub?
            </h2>
            <p className="mt-4 text-gray-400">
              Tailored features for both faculty members and students
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4"
          >
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity" />
                <div className="relative flex flex-col items-center justify-center p-8 text-center border rounded-xl bg-black/40 backdrop-blur-sm border-white/10">
                  <h3 className="mb-2 text-4xl font-bold text-white">{stat.number}</h3>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BetaSignupDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
}

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Smart Learning Management",
    description: "Integrated course materials and assignment tracking for both faculty and students"
  },
  {
    icon: <Users2 className="w-6 h-6" />,
    title: "Campus Collaboration",
    description: "Seamless communication between faculty, students, and departments"
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Performance Analytics",
    description: "Comprehensive tracking of academic progress and teaching effectiveness"
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Resource Center",
    description: "Centralized access to DCCP's digital resources and learning materials"
  }
];

const stats = [
  { number: "100%", label: "Digital Integration" },
  { number: "24/7", label: "Platform Access" },
  { number: "Real-time", label: "Updates & Notifications" }
];

function FeatureCard({ icon, title, description, index }: FeatureCardProps & { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="flex flex-col items-center p-6 text-center transition-all duration-300 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]">
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r from-[#F7AABE]/20 via-[#B57CEC]/20 to-[#E472D1]/20">
          <div className="text-[#E472D1]">{icon}</div>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}
