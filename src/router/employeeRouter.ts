import {Context, Hono} from 'hono';
import {getAllEmployees} from "../controllers/employee/getAllEmployees.ts";
import {getEmployeeById} from "../controllers/employee/getEmployeeById.ts";
import {addEmployee} from "../controllers/employee/addEmployee.ts";
import {updateEmployeeById} from "../controllers/employee/updateEmployeeById.ts";
import {deleteEmployeeById} from "../controllers/employee/deleteEmployeeById.ts";

const employeeRouter = new Hono();

employeeRouter.get('all', async (c: Context) => await getAllEmployees(c));
employeeRouter.get(':id', async (c: Context) => await getEmployeeById(c));
employeeRouter.post('/', async (c: Context) => await addEmployee(c));
employeeRouter.put(':id', async (c: Context) => await updateEmployeeById(c));
employeeRouter.delete(':id', async (c: Context) => await deleteEmployeeById(c));

export default employeeRouter;