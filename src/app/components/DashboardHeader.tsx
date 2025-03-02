"use client";

import { AddClientDialog } from "./AddClientDialog";

export function DashboardHeader() {
  const handleClientAdded = () => {
    // Refresh the page to show new data
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
        Hello Admin, Welcome to CRM
      </h2>
      <AddClientDialog onClientAdded={handleClientAdded} />
    </div>
  );
}
