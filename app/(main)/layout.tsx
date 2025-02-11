
import DashboardHeader from '@/components/dashboard/header';
import Header from '@/components/dashboard/header';
import React from 'react';
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed h-screen border-r border-border bg-primary/5">

        <div className="p-6">
          {/* Sidebar content */}
          <nav className="space-y-2">
            {/* Add your navigation items here */}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-16 fixed top-0 right-0 left-0 md:left-64 border-b border-border bg-primary/10 backdrop-blur-sm z-50">

          <DashboardHeader />
        </header>

        {/* Main content area */}
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}