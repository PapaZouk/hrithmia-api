import {Context, TypedResponse} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import Timesheet from "../../model/ITimesheet.ts";
import {ObjectId} from "mongodb";

export const getTimesheetByEmployeeId = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const employeeId = c.req.param('id');

        const queryYear = c.req.query('year');
        const queryMonth = c.req.query('month');

        const result = await Timesheet.find({
            employeeId: new ObjectId(employeeId),
            year: queryYear,
            month: queryMonth
        });

        return c.json({ result });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}