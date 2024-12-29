import {Context, TypedResponse} from 'hono';
import {connectDb} from "../../database/connectDb.ts";
import Employee from "../../model/IEmployee.ts";

export const getAllEmployees = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const result = await Employee.find({});

        if (!result) {
            return c.json({error: "No employees found"});
        }

        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}