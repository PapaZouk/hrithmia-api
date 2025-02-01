import { connectDb } from "../../database/connectDb.ts";
import { Context, TypedResponse } from "hono";
import Timesheet from "../../model/ITimesheet.ts";
import mongoose from "mongoose";

export const updateTimesheetByEmployeeId = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();

        const employeeId = c.req.param('id');

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return c.json({ error: 'Invalid employeeId' }, { status: 400 });
        }

        const data = await c.req.json();

        const timesheet = await Timesheet.findOneAndUpdate(
            { employeeId },
            { $set: data },
            { new: false, runValidators: true }
        );

        if (!timesheet) {
            return c.json({ message: 'Timesheet not found' }, { status: 404 });
        }

        return c.json({ message: 'Timesheet updated', timesheet }, { status: 200 });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message }, { status: 500 });
    }
}