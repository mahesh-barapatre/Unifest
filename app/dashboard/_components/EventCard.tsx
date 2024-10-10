import Link from "next/link";
import Image from "next/image";
import { EVENT } from "./EventListSection";

const EventCard = (event: EVENT) => {
  return (
    <Link href={`/dashboard/events/${event.id}`}>
      <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer h-full hover:scale-105 transition-all">
        <Image
          src="/path/to/default-icon.png"
          alt="icon"
          width={50}
          height={50}
        />{" "}
        {/* Replace with event-specific icon if available */}
        <h2 className="font-medium text-lg">{event.eventName}</h2>
        <p className="text-gray-500 line-clamp-3">{event.description}</p>
        <p className="text-gray-600">Date: {event.eventDate}</p>
        <p className="text-gray-600">Location: {event.location}</p>
        {event.attendees !== undefined && (
          <p className="text-gray-600">Attendees: {event.attendees}</p>
        )}
      </div>
    </Link>
  );
};

export default EventCard;
