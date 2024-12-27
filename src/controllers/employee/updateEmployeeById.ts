import Employee, {IEmployee} from '../../model/IEmployee.ts';
import {connectDb} from "../../database/connectDb.ts";
import {Context} from "hono";

export const updateEmployeeById = async (c: Context) => {
    console.log("Requesting to update employee");
    try {
        await connectDb();

        const id = c.req.param("id");

        if (!id) {
            c.status(400);
            return c.json({ message: "ID is required" });
        }

        const data = await c.req.json();

        const employee: IEmployee|null = await Employee.findById(id);

        if (!employee) {
            c.status(404);
            return c.json({ message: "Employee not found" });
        }

        console.log("Updating employee data");
        updateEmployeeData(employee, data);

        await employee.save();

        return c.json({ message: "Employee updated" });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}

const updateEmployeeData = (employee: IEmployee, data: any) => {
    if (data.personalData) {
        employee.personalData = {
            ...employee.personalData,
            ...data.personalData,
            address1: {
                ...employee.personalData.address1,
                ...data.personalData.address1,
            },
            address2: {
                ...employee.personalData.address2,
                ...data.personalData.address2,
            }
        };
    }

    if (data.jobDetails) {
        employee.jobDetails = {
            ...employee.jobDetails,
            ...data.jobDetails,
            salary: {
                ...employee.jobDetails?.salary,
                ...data.jobDetails?.salary,
            }
        };
    }
};
