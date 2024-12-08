import React from 'react';
import InputError from '@/Components/InputError';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon';
import { Button } from '@/Components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface Provider {
  id: string;
  name: string;
  buttonLabel?: string;
}

interface SocialstreamProps {
  prompt?: string;
  error?: string | null;
  providers: Provider[];
  labels?: Record<string, string>;
  show?: boolean;
}

const getProviderStyles = (providerId: string) => {
  const styles = {
    google: {
      hover: 'hover:bg-white hover:text-[#4285F4] hover:border-[#4285F4] hover:shadow-lg hover:shadow-[#4285F4]/20',
      active: 'active:bg-[#4285F4]/10',
      icon: 'group-hover:text-[#4285F4]',
    },
    facebook: {
      hover: 'hover:bg-white hover:text-[#1877F2] hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20',
      active: 'active:bg-[#1877F2]/10',
      icon: 'group-hover:text-[#1877F2]',
    },
  };

  return styles[providerId as keyof typeof styles] || {
    hover: 'hover:bg-gray-100 dark:hover:bg-gray-800',
    active: 'active:bg-gray-200 dark:active:bg-gray-700',
    icon: 'group-hover:text-current',
  };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    }
  },
};

const Socialstream: React.FC<SocialstreamProps> = ({
  prompt = 'Or Login Via',
  error = null,
  providers = [],
  labels = {},
  show = true
}) => {
  if (!show || providers.length === 0) return null;

  return (
    <motion.div
      className="space-y-6 py-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative flex items-center px-6">
        <div className="flex-grow border-t border-border"></div>
        <motion.span
          className="flex-shrink mx-4 text-sm text-muted-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {prompt}
        </motion.span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {error && <InputError message={error} className="text-center" />}

      <motion.div
        className="grid gap-3 px-6"
        variants={containerVariants}
      >
        {providers.map((provider) => {
          const styles = getProviderStyles(provider.id);
          return (
            <motion.div key={provider.id} variants={itemVariants}>
              <Button
                variant="outline"
                className={cn(
                  'relative w-full group border transition-all duration-200',
                  styles.hover,
                  styles.active
                )}
                onClick={() => {
                  window.location.href = `/oauth/${provider.id}`;
                }}
                onError={(error) => {
                  if (error.response?.data?.error) {
                    toast.error('Authentication Error', {
                      description: error.response.data.error
                    });
                  }
                }}
              >
                <a
                  href={`/oauth/${provider.id}`}
                  className="flex items-center justify-center gap-3 py-6"
                >
                  <ProviderIcon
                    provider={provider}
                    classes={cn("h-5 w-5 transition-colors duration-300", styles.icon)}
                  />
                  <span className="font-medium">
                    {provider.buttonLabel || `Continue with ${provider.name}`}
                  </span>
                </a>
              </Button>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Socialstream;
