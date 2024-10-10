import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const event = pgTable("event", {
  id: serial("id").primaryKey(),
  eventName: varchar("name").unique(),
  description: text("description"),
  eventDate: varchar("eventDate"),
  registrationDate: varchar("registrationDate"),
  location: varchar("location"),
  attendees: integer("attendees").default(0),
  createdBy: varchar("createdBy"),
});

export const User = pgTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email"),
  userName: varchar("userName"),
  joinDate: varchar("joinData"),
});
