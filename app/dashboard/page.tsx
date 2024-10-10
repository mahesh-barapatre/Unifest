"use client";
import React, { useEffect, useState } from "react";
import SearchSection from "./_components/SearchSection";
import { EVENT } from "./_components/EventListSection";
import IsLoading from "./_components/IsLoading";
import IsError from "./_components/IsError";
import axios from "axios";
import EventCard from "./_components/EventCard";
import UpcomingEvents from "./_components/UpcomingEvents";
import AllEvents from "./_components/AllEvents";

function Dashboard() {
  const [eventList, setEventList] = useState<EVENT[]>([]);
  const [isLodading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchData = async () => {
        const response = await axios.get("/api/events");
        setEventList(response.data);
        console.log(response.data);
        setError(null);
        setIsLoading(false);
      };
      fetchData();
    } catch (error) {
      setError("error in fetching events");
      setIsLoading(false);
    }
  }, []);

  if (isLodading) return <IsLoading />;
  if (error) return <IsError message={error} />;

  return (
    <div className="p-6">
      <UpcomingEvents eventList={eventList} />
      <AllEvents eventList={eventList} />
    </div>
  );
}

export default Dashboard;
