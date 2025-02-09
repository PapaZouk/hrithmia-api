import { Context } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";

export const deleteTimesheetByEmployeeId = async (c: Context) => {
  try {
    await connectDb();

    const employeeId = c.req.param("id");
    console.log("Requesting to delete timesheet by employeeId: ", employeeId);

    if (!employeeId) {
      return c.json({ message: "Employee ID is required" }, 400);
    }

    const timesheet = await Timesheet.findOneAndDelete({ employeeId });

    if (!timesheet) {
      return c.json({ message: "Timesheet not found" }, 404);
    }

    return c.json({ message: "Timesheet deleted" }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
