import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { Link } from '@inertiajs/react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
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
      href: "#",
      icon: Icons.Book,
    },
    {
      label: "Schedule",
      href: "#",
      icon: Icons.Calendar,
    },
    {
      label: "Grades",
      href: "#",
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
    <div className="flex flex-col flex-1 w-full overflow-hidden bg-gray-100 md:flex-row dark:bg-neutral-800">
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
          <div className="flex flex-col gap-2">
            <SidebarLink
              link={{
                label: page.props.auth.user?.name || "",
                href: route('profile.show'),
                icon: (
                  <div className="flex items-center justify-center flex-shrink-0 text-white rounded-full h-7 w-7 bg-primary">
                    {page.props.auth.user?.name?.charAt(0)}
                  </div>
                ),
              }}
            />
            <SidebarLink
              link={{
                label: "Logout",
                href: route('logout'),
                icon: <Icons.Logout className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />,
              }}
            />
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
      <div className="flex-shrink-0 w-6 h-5 rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg bg-primary dark:bg-white" />
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
      <div className="flex-shrink-0 w-6 h-5 rounded-tl-lg rounded-tr-sm rounded-bl-sm rounded-br-lg bg-primary dark:bg-white" />
    </Link>
  );
};
