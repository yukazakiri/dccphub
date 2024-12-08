import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import { ThemeToggle } from '@/Components/ThemeToggle';
import logo from '../../../../public/android-chrome-512x512.png';
import {
  RiDashboardLine,
  RiBookOpenLine,
  RiCalendarLine,
  RiGraduationCapLine,
  RiNotification3Line,
  RiSettings4Line,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const Icons = {
  Dashboard: RiDashboardLine,
  Book: RiBookOpenLine,
  Calendar: RiCalendarLine,
  Graduation: RiGraduationCapLine,
  Notification: RiNotification3Line,
  Settings: RiSettings4Line,
  Logout: RiLogoutBoxRLine,
};

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function SidebarDemo({ children }: { children: React.ReactNode }) {
  const route = useRoute();
  const page = useTypedPage();

  const links: SidebarLink[] = [
    {
      label: "Dashboard",
      href: route('dashboard'),
      icon: Icons.Dashboard,
    },
    {
      label: "Courses",
      href: route('courses.index'),
      icon: Icons.Book,
    },
    {
      label: "Schedule",
      href: route('schedule.index'),
      icon: Icons.Calendar,
    },
    {
      label: "Grades",
      href: route('grades.index'),
      icon: Icons.Graduation,
    },
    {
      label: "Notifications",
      href: "#",
      icon: Icons.Notification,
    },
    {
      label: "Settings",
      href: route('profile.show'),
      icon: Icons.Settings,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="flex flex-col gap-2 mt-8">
              {links.map((link, idx) => {
                const IconComponent = link.icon;
                return (
                  <SidebarLink
                    key={idx}
                    link={{
                      ...link,
                      icon: <IconComponent className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className={cn(
            "flex flex-col border-t dark:border-neutral-700",
            !open && "items-center"
          )}>
            {open ? (
              <div className="w-full p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={page.props.auth.user?.profile_photo_url}
                    alt={page.props.auth.user?.name}
                    className="w-10 h-10 rounded-full ring-2 ring-primary/10"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate dark:text-white">
                      {page.props.auth.user?.name}
                    </p>
                    <p className="text-xs truncate text-neutral-500 dark:text-neutral-400">
                      {page.props.auth.user?.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link
                    href={route('profile.show')}
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm transition-colors rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <Icons.Settings className="w-4 h-4" />
                    Profile Settings
                  </Link>
                  {/* <ThemeToggle className="flex items-center w-full gap-2 px-3 py-2 text-sm transition-colors rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800" /> */}
                  <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Icons.Logout className="w-4 h-4" />
                    Sign Out
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-4">
                {/* <ThemeToggle className="p-2 transition-colors rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800" /> */}
                <div className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-700" />
                <button
                  onClick={() => route('profile.show')}
                  className="relative group"
                >
                  <img
                    src={page.props.auth.user?.profile_photo_url}
                    alt={page.props.auth.user?.name}
                    className="w-8 h-8 transition-transform rounded-full ring-2 ring-primary/10 group-hover:scale-105"
                  />
                  <span className="absolute w-3 h-3 border-2 border-white rounded-full -top-1 -right-1 bg-primary dark:border-neutral-800" />
                </button>
                <Link
                  href={route('logout')}
                  method="post"
                  as="button"
                  className="p-2 text-red-600 transition-colors rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Icons.Logout className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </SidebarBody>
      </Sidebar>
      {children}
    </div>
  );
}

export const Logo = () => {
  const route = useRoute();
  return (
    <Link
      href={route('dashboard')}
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <img
        src={logo}
        alt="Logo"
        className="w-6 h-6"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black whitespace-pre dark:text-white"
      >
        School Portal
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  const route = useRoute();
  return (
    <Link
      href={route('dashboard')}
      className="relative z-20 flex items-center py-1 space-x-2 text-sm font-normal text-black"
    >
      <img
        src={logo}
        alt="Logo"
        className="w-6 h-6"
      />
    </Link>
  );
};
