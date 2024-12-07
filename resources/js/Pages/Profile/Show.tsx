import React from 'react';
import { motion } from 'framer-motion';
import DeleteUserForm from '@/Pages/Profile/Partials/DeleteUserForm';
import LogoutOtherBrowserSessions from '@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm';
import TwoFactorAuthenticationForm from '@/Pages/Profile/Partials/TwoFactorAuthenticationForm';
import UpdatePasswordForm from '@/Pages/Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from '@/Pages/Profile/Partials/UpdateProfileInformationForm';
import useTypedPage from '@/Hooks/useTypedPage';
import { Card } from "@/components/ui/card";
import { Head } from '@inertiajs/react';
import { SidebarDemo } from '@/Components/Sidebar/SidebarDemo';
import { Session } from '@/types';
import { Button } from "@/components/ui/button";
import {
  RiUserLine,
  RiShieldLine,
  RiComputerLine,
  RiAlertLine,
} from "react-icons/ri";

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props) {
  const page = useTypedPage();
  const [activeSection, setActiveSection] = React.useState('profile');

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const sections = [
    { id: 'profile', label: 'Profile Information', icon: RiUserLine },
    { id: 'security', label: 'Security Settings', icon: RiShieldLine },
    { id: 'sessions', label: 'Browser Sessions', icon: RiComputerLine },
    { id: 'danger', label: 'Danger Zone', icon: RiAlertLine },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return page.props.jetstream.canUpdateProfileInformation && (
          <UpdateProfileInformationForm user={page.props.auth.user!} />
        );
      case 'security':
        return (
          <div className="space-y-6">
            {page.props.jetstream.canUpdatePassword && <UpdatePasswordForm />}
            {page.props.jetstream.canManageTwoFactorAuthentication && (
              <TwoFactorAuthenticationForm
                requiresConfirmation={confirmsTwoFactorAuthentication}
              />
            )}
          </div>
        );
      case 'sessions':
        return <LogoutOtherBrowserSessions sessions={sessions} />;
      case 'danger':
        return page.props.jetstream.hasAccountDeletionFeatures && <DeleteUserForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <Head title="Profile" />
      <div className="bg-background">
        <SidebarDemo>
          <div className="flex flex-col flex-1 w-full h-full gap-4 p-2 bg-white border md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <h2 className="text-xl font-semibold leading-tight text-foreground">
                Profile Settings
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6 md:flex-row"
            >
              {/* Profile Navigation Sidebar */}
              <motion.div
                variants={itemVariants}
                className="w-full md:w-64 shrink-0"
              >
                <Card className="p-4">
                  <div className="flex flex-col space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon;
                      return (
                        <Button
                          key={section.id}
                          variant={activeSection === section.id ? "default" : "ghost"}
                          className="justify-start"
                          onClick={() => setActiveSection(section.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {section.label}
                        </Button>
                      );
                    })}
                  </div>
                </Card>
              </motion.div>

              {/* Content Area */}
              <motion.div
                variants={itemVariants}
                className="flex-1"
              >
                <Card className="p-6">
                  {renderContent()}
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </SidebarDemo>
      </div>
    </>
  );
}
