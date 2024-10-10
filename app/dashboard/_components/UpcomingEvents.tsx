import React from "react";
import { EVENT } from "./EventListSection";
import EventCard from "./EventCard";

const UpcomingEvents: React.FC<{ eventList?: EVENT[] }> = ({
  eventList = [],
}) => {
  const upcomingEvents: EVENT[] = [...eventList]
    .sort(
      (a, b) =>
        new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
    )
    .slice(0, 3);

  return (
    <>
      <h1 className="text-primary text-3xl">Upcoming Events...</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10">
        {upcomingEvents?.map((item: EVENT, index: number) => (
          <EventCard key={index} {...item} />
          // <h2>{item.eventName}</h2>
        ))}
      </div>
    </>
  );
};

export default UpcomingEvents;
