import {connectDb} from "../../database/connectDb.ts";
import {Context, TypedResponse} from "hono";
import Timesheet from "../../model/ITimesheet.ts";

export const updateTimesheetByEmployeeId = async (c: Context): Promise<TypedResponse> => {
    try {
      await connectDb();

        const employeeId = c.req.param('id');
        console.log("Updating timesheet with employeeId: ", employeeId);

      const data = await c.req.json();

      const timesheet = await Timesheet.findOneAndUpdate(
          { employeeId },
          { $set: data },
          { new: true, runValidators: true }
      );
        if (!timesheet) {
            c.status(404);
            return c.json({message: 'Timesheet not found'});

        }

        await timesheet.save();

        return c.json({message: "Timesheet updated with employeeId: " + employeeId});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}