import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/utils/db"; // Make sure this path is correct
import { event } from "@/utils/schema";

// Event schema validation using Zod
const eventSchema = z.object({
  eventName: z.string().min(1, "Event name is required"),
  description: z.string().optional(),
  eventDate: z.string().min(1, "Event date is required"),
  registrationDate: z.string().min(1, "Registration date is required"),
  location: z.string().optional(),
  attendees: z.number().int().default(0).optional(),
  createdBy: z.string().min(1, "Created by is required"),
});

// Handle POST request
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = eventSchema.parse(body);

    // Insert data into the database
    const result = await db.insert(event).values(validatedData);

    return NextResponse.json(
      { message: "Event created successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// Handle GET request
export async function GET() {
  try {
    const allEvents = await db.select().from(event);

    return NextResponse.json(allEvents, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
