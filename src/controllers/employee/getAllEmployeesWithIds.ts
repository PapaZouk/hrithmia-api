import { connectDb } from "../../database/connectDb.ts";
import { Context, TypedResponse } from "hono";
import Employee from "../../model/IEmployee.ts";

export const getAllEmployeesWithIds: (c: Context) => Promise<TypedResponse> =
  async (c: Context): Promise<TypedResponse> => {
    try {
      await connectDb();

      const ids: string[] = c.req.query("ids")?.split(",") || [];

      if (ids.length === 0 || (ids.length === 1 && ids[0] === "")) {
        return c.json({ error: "No IDs provided" }, 400);
      }

      const result = await Employee.find({ _id: { $in: ids } });

      if (!result || result.length === 0) {
        return c.json({ error: "No employees found" }, 404);
      }

      return c.json({ result }, 200);
    } catch (error) {
      console.error((error as Error).message);
      return c.json({ error: (error as Error).message }, 500);
    }
  };
