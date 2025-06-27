import './globals.css';
import localFont from 'next/font/local';
import React from 'react';

const nunito = localFont({
  src: '../public/fonts/Nunito-Regular.ttf',
  variable: '--font-nunito',
});

const manrope = localFont({
  src: '../public/fonts/manrope-regular.otf',
  variable: '--font-manrope',
});

export const metadata = {
  title: 'Contact Document Explainer',
  description: 'Extract contact info from documents with AI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${nunito.variable} ${manrope.variable}`}>
      <body className="relative overflow-x-hidden text-white">
        {/* 🔵 Fullscreen background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover z-[-1]"
        >
          <source src="images/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 🔴 Optional dark overlay */}
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-0" />

        {/* Page content */}
        <div className="relative z-10 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
