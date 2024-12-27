import { Context } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";

export const deleteTimesheetByEmployeeId = async (c: Context) => {
  try {
    await connectDb();

    const employeeId = c.req.param("id");
    console.log("Requesting to delete timesheet by employeeId: ", employeeId);

    if (!employeeId) {
      c.status(400);
      return c.json({ message: "Employee ID is required" });
    }

    const timesheet = await Timesheet.findOneAndDelete({ employeeId });

    if (!timesheet) {
      c.status(404);
      return c.json({ message: "Timesheet not found" });
    }

    return c.json({ message: "Timesheet deleted" });
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message });
  }
};
