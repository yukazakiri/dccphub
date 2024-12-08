import React from 'react';
import ProviderIcon from '@/Components/SocialstreamIcons/ProviderIcon';
import { cn } from '@/lib/utils';

interface Provider {
  id: string;
  name: string;
  buttonLabel?: string;
  [key: string]: any;
}

interface ConnectedAccountProps {
  provider: Provider;
  createdAt?: string | null;
  action?: React.ReactNode;
  className?: string;
}

const ConnectedAccount: React.FC<ConnectedAccountProps> = ({
  provider,
  createdAt = null,
  action,
  className
}) => {
  return (
    <div className={cn(
      "rounded-lg border border-gray-200 dark:border-gray-800 p-4",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <ProviderIcon provider={provider} className="h-6 w-6" />

          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {provider.name}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400">
              {createdAt ? (
                <>Connected {createdAt}</>
              ) : (
                <>Not connected</>
              )}
            </div>
          </div>
        </div>

        {action && (
          <div className="flex items-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectedAccount;
