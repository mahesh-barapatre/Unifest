import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { event } from "../../../../utils/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Define the update event schema
const updateEventSchema = z.object({
  eventName: z.string().optional(),
  description: z.string().optional(),
  eventDate: z.string().optional(),
  registrationDate: z.string().optional(),
  location: z.string().optional(),
  attendees: z.number().int().optional(),
  createdBy: z.string().optional(),
});

// Handle GET request for a specific event
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const singleEvent = await db
      .select()
      .from(event)
      .where(eq(event.id, Number(id)));

    if (!singleEvent.length) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(singleEvent[0], { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// Handle PUT request to update an event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const validatedData = updateEventSchema.parse(body);

    const updatedEvent = await db
      .update(event)
      .set(validatedData)
      .where(eq(event.id, Number(id)));

    if (!updatedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event updated successfully", updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// Handle DELETE request to delete an event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const deletedEvent = await db.delete(event).where(eq(event.id, Number(id)));

    if (!deletedEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
