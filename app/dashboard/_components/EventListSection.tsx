import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import IsLoading from "./IsLoading";
import IsError from "./IsError";

export interface EVENT {
  id: number;
  eventName: string;
  description: string;
  eventDate: string;
  location: string;
  attendees?: number;
  createdBy: string;
  slug: string;
}

function EventListSection({ userSearchInput }: any) {
  const [eventList, setEventList] = useState<EVENT[]>([]);
  const [filteredEventList, setFilteredEventList] = useState<EVENT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch event data from the API
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/events");
        // console.log(response.data);
        setFilteredEventList(response.data);
        setEventList(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = eventList.filter((item) =>
        item.eventName.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      console.log("filtered");
      setFilteredEventList(filterData);
    } else {
      console.log("not filtered");
      setFilteredEventList(eventList);
      console.log(filteredEventList);
    }
  }, [userSearchInput]);

  if (loading) return <IsLoading />;
  if (error) return <IsError message={error} />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
      {filteredEventList.map((item: EVENT, index: number) => (
        <EventCard key={index} {...item} />
        // <h2>{item.eventName}</h2>
      ))}
    </div>
  );
}

export default EventListSection;
