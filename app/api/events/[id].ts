//api/events/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { event } from "../../../utils/schema";
import { z } from "zod";
import { db } from "@/utils/db";
import { eq } from "drizzle-orm";

const updateEventSchema = z.object({
  eventName: z.string().optional(),
  description: z.string().optional(),
  eventDate: z.string().optional(),
  registrationDate: z.string().optional(),
  location: z.string().optional(),
  attendees: z.number().int().optional(),
  createdBy: z.string().optional(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      // Delete the event by ID
      await db.delete(event).where(eq(event.id, Number(id)));
      return res.status(200).json({ message: "Event deleted successfully" });
    } else if (req.method === "PUT") {
      // Validate and update event
      const validatedData = updateEventSchema.parse(req.body);
      await db
        .update(event)
        .set(validatedData)
        .where(eq(event.id, Number(id)));
      return res.status(200).json({ message: "Event updated successfully" });
    } else if (req.method === "GET") {
      // Get event by ID
      const singleEvent = await db
        .select()
        .from(event)
        .where(eq(event.id, Number(id)));
      if (!singleEvent.length)
        return res.status(404).json({ message: "Event not found" });

      return res.status(200).json(singleEvent[0]); // Return the first item in the result
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
