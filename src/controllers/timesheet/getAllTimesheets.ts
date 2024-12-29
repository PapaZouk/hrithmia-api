import {Context, TypedResponse} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";

export const getAllTimesheets = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        console.log("Requesting all timesheets");

        const result = await Timesheet.find({});
        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}