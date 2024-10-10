"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input"; // Import your Input component
import { Button } from "@/components/ui/button"; // Import your Button component
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EVENT } from "../../_components/EventListSection";
import IsLoading from "../../_components/IsLoading";
import IsError from "../../_components/IsError";

interface PROPS {
  params: {
    id: string;
  };
}

const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  location: z.string().optional(),
  attendees: z.number().int().default(0).optional(),
  createdBy: z.string().min(1, "Created by is required"),
});

const EventDetailPage = ({ params }: PROPS) => {
  const { id } = params; // Get dynamic id from URL
  const [event, setEvent] = useState<EVENT | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const { data: session } = useSession(); // Using NextAuth for user session

  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventName: "",
      description: "",
      eventDate: "",
      location: "",
      attendees: 0,
    },
  });

  useEffect(() => {
    async function fetchEvent() {
      if (id) {
        try {
          const response = await axios.get(`/api/events/${id}`);
          setEvent(response.data);
          form.reset(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching event data", error);
          setIsLoading(false);
        }
      }
    }
    fetchEvent();
  }, [id]);

  const handleUpdate = async (data: any) => {
    try {
      await axios.put(`/api/events/${id}`, data);
      alert("Event updated successfully");
    } catch (error) {
      console.error("Error updating event", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/events/${id}`);
      alert("Event deleted successfully");
      window.location.href = "/dashboard/events";
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  if (isLoading) return <IsLoading />;
  if (!event) return <IsError message="NO EVENT FOUND" />;

  // Check if the current user is the creator of the event
  const isCreator = true;
  // const isCreator = session?.user?.email === event.createdBy;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{event.eventName}</h1>
      <p className="text-gray-600 mt-2">{event.description}</p>
      <p className="mt-4">Date: {event.eventDate}</p>
      <p className="mt-1">Location: {event.location}</p>
      <p className="mt-1">Attendees: {event.attendees}</p>
      <p className="mt-1">Created by: {event.createdBy}</p>

      {/* If the user is the creator, show update and delete options */}
      {isCreator ? (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Update Event</h2>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <div className="mb-4">
              <label>Event Name</label>
              <Input {...form.register("eventName")} />
            </div>
            <div className="mb-4">
              <label>Description</label>
              <Input {...form.register("description")} />
            </div>
            <div className="mb-4">
              <label>Event Date</label>
              <Input type="date" {...form.register("eventDate")} />
            </div>
            <div className="mb-4">
              <label>Location</label>
              <Input {...form.register("location")} />
            </div>
            <div className="mb-4">
              <label>Attendees</label>
              <Input type="number" {...form.register("attendees")} />
            </div>

            <Button type="submit" className="bg-purple-600 text-white">
              Update Event
            </Button>
          </form>
          <Button onClick={handleDelete} className="bg-red-600 text-white mt-4">
            Delete Event
          </Button>
        </div>
      ) : (
        <div className="mt-10">
          <p>You do not have permission to update or delete this event.</p>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
