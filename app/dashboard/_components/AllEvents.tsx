import React, { useState } from "react";
import EventCard from "./EventCard"; // Assuming EventCard is the component for rendering events
import { EVENT } from "./EventListSection";

const AllEvents: React.FC<{ eventList?: EVENT[] }> = ({ eventList = [] }) => {
  const [currentPage, setCurrentPage] = useState(1); // For tracking the current page
  const eventsPerPage = 4; // Number of events to display per page

  // Calculate the indices for the events on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventList.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate total number of pages
  const totalPages = Math.ceil(eventList.length / eventsPerPage);

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <h1 className="text-primary text-3xl">All Events...</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4 sm:p-10">
        {currentEvents.map((item: EVENT, index: number) => (
          <EventCard key={index} {...item} />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center space-x-4 mt-5">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 bg-primary text-white rounded-md ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          className={`px-4 py-2 bg-primary text-white rounded-md ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default AllEvents;
