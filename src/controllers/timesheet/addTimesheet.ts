import { Context } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import { timesheetValidator } from "../../validators/timesheetValidator.ts";
import mapResponseToTimesheet from "../../mapper/mapResponseToTimesheet.ts";

export const addTimesheet = async (
  c: Context,
  mapper = mapResponseToTimesheet,
  isValidTimesheet = timesheetValidator,
) => {
  console.log("Requesting to add timesheet");
  try {
    await connectDb();

    const data = await c.req.json();

    if (!isValidTimesheet(data)) {
      return c.json({ error: "Invalid data" }, 400);
    }

    const timesheet = mapper(data);

    const result = await timesheet.save();

    return c.json({ message: "Timesheet saved with ID: " + result._id }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
