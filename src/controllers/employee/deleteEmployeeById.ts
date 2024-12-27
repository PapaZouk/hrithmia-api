import {Context} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import Employee from '../../model/IEmployee.ts';

export const deleteEmployeeById = async (c: Context) => {
    console.log("Requesting to delete employee");
    try {
        await connectDb();

        const id = c.req.param('id');

        if (!id) {
            c.status(400);
            return c.json({ message: 'ID is required' });
        }

        const employee = await Employee.findById(id);

        if (!employee) {
            c.status(404);
            return c.json({ message: 'Employee not found' });
        }

        await Employee.deleteOne({ _id: id });

        return c.json({ message: 'Employee deleted' });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}