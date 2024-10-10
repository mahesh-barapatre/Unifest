// api/events/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { event } from "../../../utils/schema";
import { z } from "zod";
import { db } from "@/utils/db";

// Event schema validation
const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
  location: z.string().optional(),
  attendees: z.number().int().default(0).optional(),
  createdBy: z.string().min(1, "Created by is required"),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const validatedData = eventSchema.parse(req.body);
      const result = await db.insert(event).values(validatedData);
      return res
        .status(201)
        .json({ message: "Event created successfully", data: result });
    } else if (req.method === "GET") {
      const allEvents = await db.select().from(event);
      return res.status(200).json(allEvents);
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default handler;
