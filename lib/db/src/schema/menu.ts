import { pgTable, text, serial, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const menuTable = pgTable("menu", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
});

export const insertMenuSchema = createInsertSchema(menuTable).omit({ id: true });
export type InsertMenu = z.infer<typeof insertMenuSchema>;
export type Menu = typeof menuTable.$inferSelect;
