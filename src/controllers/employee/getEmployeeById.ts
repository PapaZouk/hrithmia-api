import {Context, TypedResponse} from 'hono';
import {connectDb} from "../../database/connectDb.ts";
import {ObjectId} from "mongodb";
import Employee from "../../model/IEmployee.ts";

export const getEmployeeById = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const id = c.req.param('id');
        const result = await Employee.findOne({ _id: new ObjectId(id) });
        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error});
    }
}