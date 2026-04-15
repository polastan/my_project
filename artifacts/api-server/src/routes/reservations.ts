import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, usersTable, reservationsTable } from "@workspace/db";
import { CreateReservationBody, CheckAvailabilityQueryParams, CheckAvailabilityResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/reservations", async (req, res): Promise<void> => {
  const parsed = CreateReservationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { name, email, phone, date, time, guests, specialRequests } = parsed.data;

  let user = await db.select().from(usersTable).where(eq(usersTable.email, email)).then(r => r[0]);

  if (!user) {
    const [newUser] = await db.insert(usersTable).values({ name, email, phone }).returning();
    user = newUser;
  }

  const [reservation] = await db.insert(reservationsTable).values({
    userId: user.id,
    date,
    time,
    guests,
    specialRequests: specialRequests ?? null,
  }).returning();

  res.status(201).json({
    id: reservation.id,
    userId: reservation.userId,
    date: reservation.date,
    time: reservation.time,
    guests: reservation.guests,
    specialRequests: reservation.specialRequests,
    status: reservation.status,
    createdAt: reservation.createdAt.toISOString(),
  });
});

router.get("/reservations/check", async (req, res): Promise<void> => {
  const parsed = CheckAvailabilityQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { date, time, guests } = parsed.data;

  const existing = await db.select().from(reservationsTable).where(
    and(
      eq(reservationsTable.date, date),
      eq(reservationsTable.time, time)
    )
  );

  const totalGuests = existing.reduce((sum, r) => sum + r.guests, 0);
  const maxCapacity = 50;
  const available = (totalGuests + guests) <= maxCapacity;

  res.json(CheckAvailabilityResponse.parse({
    available,
    message: available ? "Tables are available for your party" : "Sorry, we are fully booked for this time slot",
  }));
});

export default router;
