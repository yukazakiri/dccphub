import React from 'react';

export default function ApplicationLogo({ className }: { className?: string }) {
  return (
    <img
      src="/public/android-chrome-512x512.png"
      alt="Application Logo"
      className={className}
    />
  );
}
