import React from 'react';
import BitbucketIcon from '@/Components/SocialstreamIcons/BitbucketIcon';
import FacebookIcon from '@/Components/SocialstreamIcons/FacebookIcon';
import GithubIcon from '@/Components/SocialstreamIcons/GithubIcon';
import GitLabIcon from '@/Components/SocialstreamIcons/GitLabIcon';
import GoogleIcon from '@/Components/SocialstreamIcons/GoogleIcon';
import LinkedInIcon from '@/Components/SocialstreamIcons/LinkedInIcon';
import SlackIcon from '@/Components/SocialstreamIcons/SlackIcon';
import TwitterIcon from '@/Components/SocialstreamIcons/TwitterIcon';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProviderIconProps {
  provider: {
    id: string;
  };
  classes?: string;
}

const getProviderColor = (providerId: string) => {
  const colors = {
    google: '#4285F4',
    facebook: '#1877F2',
    github: '#333333',
    twitter: '#1DA1F2',
    linkedin: '#0A66C2',
    gitlab: '#FC6D26',
    bitbucket: '#0052CC',
    slack: '#4A154B',
  };

  return colors[providerId as keyof typeof colors] || '#000000';
};

const iconVariants = {
  initial: { scale: 0.5, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20
    }
  }
};

const ProviderIcon: React.FC<ProviderIconProps> = ({ provider, classes }) => {
  const defaultClasses = "transition-all duration-300";
  const combinedClasses = cn(defaultClasses, classes);

  return (
    <motion.div
      className={combinedClasses}
      variants={iconVariants}
      initial="initial"
      animate="animate"
      style={{ color: getProviderColor(provider.id) }}
    >
      {provider.id === 'bitbucket' && <BitbucketIcon className={combinedClasses} />}
      {provider.id === 'facebook' && <FacebookIcon className={combinedClasses} />}
      {provider.id === 'github' && <GithubIcon className={combinedClasses} />}
      {provider.id === 'gitlab' && <GitLabIcon className={combinedClasses} />}
      {provider.id === 'google' && <GoogleIcon className={combinedClasses} />}
      {(provider.id === 'linkedin' || provider.id === 'linkedin-openid') && <LinkedInIcon className={combinedClasses} />}
      {provider.id === 'slack' && <SlackIcon className={combinedClasses} />}
      {(provider.id === 'twitter' || provider.id === 'twitter-oauth-2') && <TwitterIcon className={combinedClasses} />}
    </motion.div>
  );
};

export default ProviderIcon;
