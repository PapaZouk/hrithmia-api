import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import { ObjectId } from "mongodb";
import Timesheet from "../../model/ITimesheet.ts";

export const getTimesheetById = async (c: Context): Promise<TypedResponse> => {
  try {
    await connectDb();
    const id = c.req.param("id");

    if (!id) {
      return c.json({ error: "No ID provided" }, 400);
    }

    const result = await Timesheet.findOne({ _id: new ObjectId(id) });

    if (!result) {
      return c.json({ message: "Timesheet not found" }, 404);
    }

    return c.json({ result }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
