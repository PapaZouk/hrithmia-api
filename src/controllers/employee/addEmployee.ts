import { Context } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import { employeeValidator } from "../../validators/employeeValidator.ts";
import mapResponseToEmployee from "../../mapper/mapResponseToEmployee.ts";

export const addEmployee = async (
  c: Context,
  mapper = mapResponseToEmployee,
  isValidEmployeeData = employeeValidator,
) => {
  console.log("Requesting to add employee");
  try {
    await connectDb();

    const data = await c.req.json();

    if (!data || Object.keys(data).length === 0) {
      return c.json({ error: "Invalid data" }, 400);
    }

    if (!isValidEmployeeData(data)) {
      return c.json({ error: "Invalid data" }, 400);
    }

    const employee = mapper(data);

    const result = await employee.save();

    return c.json({ message: "Employee saved", id: result._id }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
