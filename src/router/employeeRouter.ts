import {Context, Hono} from 'hono';
import {getAllEmployees} from "../controllers/employee/getAllEmployees.ts";
import {getEmployeeById} from "../controllers/employee/getEmployeeById.ts";
import {addEmployee} from "../controllers/employee/addEmployee.ts";
import {updateEmployeeById} from "../controllers/employee/updateEmployeeById.ts";
import {deleteEmployeeById} from "../controllers/employee/deleteEmployeeById.ts";
import {getAllEmployeesWithIds} from "../controllers/employee/getAllEmployeesWithIds.ts";

const employeeRouter = new Hono();

employeeRouter.get('all', async (c: Context) => await getAllEmployees(c));
employeeRouter.get(':id', async (c: Context) => await getEmployeeById(c));
employeeRouter.post('/add/', async (c: Context) => await addEmployee(c));
employeeRouter.put('/update/:id', async (c: Context) => await updateEmployeeById(c));
employeeRouter.delete('/delete/:id', async (c: Context) => await deleteEmployeeById(c));
employeeRouter.get('/filter/all', async (c: Context) => await getAllEmployeesWithIds(c));

export default employeeRouter;