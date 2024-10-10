"use client";
import React, { useState } from "react";
import SearchSection from "../_components/SearchSection";
import EventListSection from "../_components/EventListSection";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <div>
      {/* Search Section  */}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />

      {/* Template List Section  */}
      <EventListSection userSearchInput={userSearchInput} />
    </div>
  );
}

export default Dashboard;
