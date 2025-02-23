import { connectDb } from "../../database/connectDb.ts";
import { Context, TypedResponse } from "hono";
import Timesheet from "../../model/ITimesheet.ts";
import mongoose from "mongoose";

export const updateTimesheetByEmployeeId = async (
  c: Context,
  isValidId = mongoose.Types.ObjectId.isValid,
): Promise<TypedResponse> => {
  try {
    await connectDb();

    const employeeId = c.req.param("id");
    console.log(`Requesting to update timesheet by employeeId: ${employeeId}`);

    if (!isValidId(employeeId)) {
      return c.json({ error: "Invalid employeeId" }, 400);
    }

    const data = await c.req.json();

    if (!data) {
      return c.json({ error: "Invalid data" }, 400);
    }

    const timesheet = await Timesheet.findOneAndUpdate(
      { employeeId },
      { $set: data },
      { new: false, runValidators: true },
    );

    if (!timesheet) {
      return c.json({ message: "Timesheet not found" }, 404);
    }

    return c.json({ message: "Timesheet updated", timesheet }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
