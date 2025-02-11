"use client"
import LogoutButton from "@/components/general/logout-button";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

import React from "react";
function Dashboard({ token }: { token?: RequestCookie }) {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="text-muted-foreground">Your daily analytics and statistics</p>
        </div>
      </div>
      
      {/* Add your dashboard content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example card */}
        <div className="p-6 rounded-lg bg-card border border-border shadow-sm hover:border-primary/30 transition-all duration-200">

          <h3 className="font-medium mb-2">Statistics</h3>
          {/* Card content */}
        </div>
      </div>
    </div>
  );
}


export default Dashboard;
