import { connectDb } from "../../database/connectDb.ts";
import { Context, TypedResponse } from "hono";
import Employee from "../../model/IEmployee.ts";

export const getAllEmployeesWithIds: (c: Context) => Promise<TypedResponse> =
  async (c: Context): Promise<TypedResponse> => {
    try {
      await connectDb();

      const ids: string[] = c.req.query("ids")?.split(",") || [];

      if (ids.length === 0) {
        c.status(400);
        return c.json({ error: "IDs are required" });
      }

      const result = await Employee.find({ _id: { $in: ids } });

      if (!result || result.length === 0) {
        return c.json({ error: "No employees found" });
      }

      return c.json({ result });
    } catch (error) {
      console.error((error as Error).message);
      return c.json({ error: (error as Error).message }, 500);
    }
  };
