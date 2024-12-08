import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import ConnectedAccount from '@/Components/ConnectedAccount';
import { Button } from '@/Components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, AlertTriangle, Lock, Unlock, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialstreamProps {
  socialstream: {
    show: boolean;
    prompt: string;
    providers: Array<{
      id: string;
      name: string;
      buttonLabel: string;
    }>;
    hasPassword: boolean;
    connectedAccounts: Array<{
      id: string;
      provider: string;
      created_at: string;
      avatar_path?: string;
    }>;
  };
}

const MotionButton = motion(Button);

const providerColors: Record<string, { light: string; dark: string }> = {
  google: { light: 'from-red-50 to-red-100/50', dark: 'dark:from-red-950/30 dark:to-red-900/20' },
  facebook: { light: 'from-blue-50 to-blue-100/50', dark: 'dark:from-blue-950/30 dark:to-blue-900/20' },
  github: { light: 'from-gray-50 to-gray-100/50', dark: 'dark:from-gray-950/30 dark:to-gray-900/20' },
  twitter: { light: 'from-sky-50 to-sky-100/50', dark: 'dark:from-sky-950/30 dark:to-sky-900/20' },
};

const ConnectedAccountsForm: React.FC<SocialstreamProps> = ({ socialstream }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [hoveredProvider, setHoveredProvider] = useState<string | null>(null);

  const form = useForm({
    password: '',
  });

  const getAccountForProvider = (providerId: string) => {
    return socialstream.connectedAccounts
      .find(account => account.provider === providerId);
  };

  const setProfilePhoto = (id: string) => {
    form.put(route('user-profile-photo.set', { id }), {
      preserveScroll: true,
    });
  };

  const confirmRemoveAccount = (id: string) => {
    setSelectedAccountId(id);
    setIsOpen(true);
  };

  const removeAccount = () => {
    if (!selectedAccountId) return;

    form.delete(route('connected-accounts.destroy', { id: selectedAccountId }), {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
      onFinish: () => form.reset(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <motion.div 
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 dark:from-red-950/30 dark:to-red-900/20 p-1"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5 [mask-image:linear-gradient(to_bottom_right,white,transparent,white)]" />
        <motion.div 
          className="relative rounded-lg bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm p-6 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-start gap-4">
            <motion.div 
              className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg"
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </motion.div>
            <div>
              <motion.h3 
                className="font-semibold text-red-600 dark:text-red-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Security Notice
              </motion.h3>
              <motion.p 
                className="mt-1 text-sm text-red-600/90 dark:text-red-400/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                If you feel any of your connected accounts have been compromised, you should disconnect them
                immediately and change your password.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <LayoutGroup>
        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {socialstream.providers.map((provider, index) => {
              const connectedAccount = getAccountForProvider(provider.id);
              const isConnected = !!connectedAccount;
              const colors = providerColors[provider.id.toLowerCase()] || providerColors.github;

              return (
                <motion.div
                  layout
                  key={provider.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                    delay: index * 0.1 
                  }}
                  onHoverStart={() => setHoveredProvider(provider.id)}
                  onHoverEnd={() => setHoveredProvider(null)}
                  className="group relative"
                >
                  <div className={cn(
                    "relative overflow-hidden rounded-xl border transition-all duration-500",
                    "bg-gradient-to-br",
                    colors.light,
                    colors.dark,
                    hoveredProvider === provider.id ? "border-primary shadow-lg scale-[1.02]" : "border-border",
                    isConnected ? "bg-opacity-50" : ""
                  )}>
                    <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    )} />
                    <motion.div 
                      className="relative p-6"
                      layout
                    >
                      <ConnectedAccount
                        provider={provider}
                        createdAt={connectedAccount?.created_at}
                        action={
                          <motion.div layout className="flex items-center gap-3">
                            {connectedAccount ? (
                              <>
                                {connectedAccount.avatar_path && (
                                  <MotionButton
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setProfilePhoto(connectedAccount.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-sm"
                                  >
                                    Use Avatar
                                  </MotionButton>
                                )}
                                {(socialstream.connectedAccounts.length > 1 || socialstream.hasPassword) && (
                                  <MotionButton
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => confirmRemoveAccount(connectedAccount.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="gap-2"
                                  >
                                    <Unlock className="w-4 h-4" />
                                    Disconnect
                                  </MotionButton>
                                )}
                              </>
                            ) : (
                              <MotionButton
                                variant="outline"
                                size="sm"
                                className="w-full gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                asChild
                              >
                                <a href={route('oauth.redirect', { provider: provider.id })}>
                                  <Lock className="w-4 h-4" />
                                  Connect {provider.name}
                                  <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                                </a>
                              </MotionButton>
                            )}
                          </motion.div>
                        }
                      />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Remove Connected Account
              </DialogTitle>
              <DialogDescription>
                Please enter your password to confirm you would like to remove this account.
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={form.data.password}
                    onChange={e => form.setData('password', e.target.value)}
                    autoComplete="current-password"
                    className="pr-10"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                </div>
                <AnimatePresence mode="wait">
                  {form.errors.password && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm text-destructive"
                    >
                      {form.errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <MotionButton
                variant="outline"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </MotionButton>
              <MotionButton
                variant="destructive"
                onClick={removeAccount}
                disabled={form.processing}
                className="gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {form.processing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <Unlock className="w-4 h-4" />
                )}
                Remove Account
              </MotionButton>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ConnectedAccountsForm;
