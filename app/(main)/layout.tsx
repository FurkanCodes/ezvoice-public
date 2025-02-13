import DashboardHeader from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar/sidebar';
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col fixed h-screen border-r border-border bg-primary/5 transition-all duration-300"
        style={{ width: 'var(--sidebar-width, 294px)' }}
      >
        <div className="p-6 h-screen">
          <nav className="flex flex-col h-full ">
            <Sidebar />
          </nav>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 transition-all duration-300"
        style={{ marginLeft: 'var(--sidebar-width, 294px)' }}
      >
        {/* Header */}
        <header className="h-16 fixed top-0 right-0 border-b border-border bg-primary/10 backdrop-blur-sm z-50 transition-all duration-300"
          style={{ left: 'var(--sidebar-width, 294px)' }}
        >
          <DashboardHeader />
        </header>
        {/* Main content area */}
        <main className="pt-16 px-4 md:px-8 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}