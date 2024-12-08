import { router } from '@inertiajs/core';
import { Link, Head } from '@inertiajs/react';
import classNames from 'classnames';
import React, { PropsWithChildren, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import ApplicationMark from '@/Components/ApplicationMark';
import Banner from '@/Components/Banner';
import Dropdown from '@/Components/Dropdown';
import DropdownLink from '@/Components/DropdownLink';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Team } from '@/types';
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';

interface Props {
  title: string;
  renderHeader?(): JSX.Element;
}

export default function AppLayout({
  title,
  renderHeader,
  children,
}: PropsWithChildren<Props>) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <div className="flex flex-col items-center min-h-screen pt-6 bg-background sm:justify-center sm:pt-0">
        <Toaster position="top-right" />
        <Head title={title} />

        <Banner />
        {children}

        {/* Fixed Theme Toggle */}
        <div className="fixed z-50 bottom-4 right-4">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}
