import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";

export const getAllTimesheets = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();

        const result = await Timesheet.find({});

        if (!result || result.length === 0) {
            return c.json({ error: 'No timesheets found' }, 404);
        }

        return c.json({result}, 200);
    } catch (error) {
        console.error("Error fetching timesheets:", (error as Error).message);
        return c.json({ error: (error as Error).message }, 500);
    }
};
