import {Context, TypedResponse} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import {ObjectId} from "mongodb";
import Timesheet from "../../model/ITimesheet.ts";

export const getTimesheetById = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const id = c.req.param('id');
        const result = await Timesheet.findOne({ _id: new ObjectId(id) });
        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error});
    }
}