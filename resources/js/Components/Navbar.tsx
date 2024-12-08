import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { BetaSignupDialog } from '@/Components/BetaSignupDialog';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'FAQ', href: '#faq' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 mx-auto px-4 py-4 w-full`}
      >
        <div className={`mx-auto max-w-7xl ${scrolled ? 'bg-black/60' : 'bg-black/30'}
          backdrop-blur-md rounded-2xl border border-white/10 transition-all duration-300`}>
          <div className="px-6 mx-auto">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#F7AABE] to-[#E472D1] blur-lg opacity-50" />
                <Sparkles className="relative w-8 h-8 text-white" />
                <span className="relative text-lg font-bold text-white">DCCP Hub</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:gap-2">
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    isActive={activeSection === item.href}
                    onClick={() => setActiveSection(item.href)}
                  />
                ))}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsDialogOpen(true)}
                  className="px-5 py-2 ml-4 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  Join Beta
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 transition-colors md:hidden rounded-xl bg-white/5 hover:bg-white/10"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 right-0 w-full p-4 mt-2 border shadow-xl rounded-2xl bg-black/95 backdrop-blur-lg border-white/10 md:hidden"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.label}
                label={item.label}
                href={item.href}
                isActive={activeSection === item.href}
                onClick={() => {
                  setActiveSection(item.href);
                  setIsMenuOpen(false);
                }}
              />
            ))}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setIsDialogOpen(true);
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 mt-2 text-sm font-medium text-white rounded-xl bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1]"
            >
              Join Beta
            </motion.button>
          </div>
        </motion.div>
      )}

      <BetaSignupDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

// NavItem component with hover effect
const NavItem = ({ label, href, isActive, onClick }) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative px-4 py-2 text-sm transition-colors rounded-lg text-white/80 hover:text-white group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#F7AABE] to-[#E472D1] w-0 group-hover:w-full transition-all duration-300"
        style={{
          width: isActive ? '100%' : '0%',
        }}
      />
    </motion.a>
  );
};
