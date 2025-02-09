import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";
import { ObjectId } from "mongodb";

export const getTimesheetByEmployeeId = async (
  c: Context,
): Promise<TypedResponse> => {
  try {
    await connectDb();
    const employeeId = c.req.param("id");

    if (!employeeId) {
      return c.json({ error: "Employee ID is required" }, 400);
    }

    const queryYear = c.req.query("year");
    const queryMonth = c.req.query("month");

    if (!queryYear || !queryMonth) {
      return c.json({ error: "Year and month are required" }, 400);
    }

    const result = await Timesheet.find({
      employeeId: new ObjectId(employeeId),
      year: queryYear,
      month: queryMonth,
    });

    if (!result || result.length === 0) {
      return c.json({ error: "Timesheet not found" }, 404);
    }

    return c.json({ result }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
