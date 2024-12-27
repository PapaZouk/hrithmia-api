import {Context} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import {timesheetValidator} from "../../validators/timesheetValidator.ts";
import mapResponseToTimesheet from "../../mapper/mapResponseToTimesheet.ts";

export const addTimesheet = async (c: Context) => {
    console.log("Requesting to add timesheet");
    try {
        await connectDb();

        const data = await c.req.json();

        if (!timesheetValidator(data)) {
            return c.json({error: "Invalid data"});
        }

        const timesheet = mapResponseToTimesheet(data);

        const result = await timesheet.save();

        return c.json({message: "Timesheet saved with ID: " + result._id});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error: (error as Error).message});
    }
}