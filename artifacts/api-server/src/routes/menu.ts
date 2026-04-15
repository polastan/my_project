import { Router, type IRouter } from "express";
import { db, menuTable } from "@workspace/db";
import { GetMenuResponse, GetMenuCategoriesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/menu", async (_req, res): Promise<void> => {
  const items = await db.select().from(menuTable);
  res.json(GetMenuResponse.parse(items));
});

router.get("/menu/categories", async (_req, res): Promise<void> => {
  const items = await db.select({ category: menuTable.category }).from(menuTable);
  const categories = [...new Set(items.map((i) => i.category))];
  res.json(GetMenuCategoriesResponse.parse(categories));
});

export default router;
