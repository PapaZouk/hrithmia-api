import { Context, Hono } from 'hono';
import { logger } from 'hono/logger';
import { cors } from "hono/cors";
import {jwt} from "hono/jwt";
import {healthCheck} from "./src/controllers/employee/healthCheck.ts";
import {generateToken} from "./src/authentication/generateToken.ts";
import {getAllEmployees} from "./src/controllers/employee/getAllEmployees.ts";
import {getEmployeeById} from "./src/controllers/employee/getEmployeeById.ts";
import {addEmployee} from "./src/controllers/employee/addEmployee.ts";
import {deleteEmployeeById} from "./src/controllers/employee/deleteEmployeeById.ts";
import {updateEmployeeById} from "./src/controllers/employee/updateEmployeeById.ts";
import employeeRouter from "./src/router/employeeRouter.ts";
import timesheetRouter from "./src/router/timesheetRouter.ts";

const app = new Hono();
const secretKey = Deno.env.get('JWT_SECRET_KEY');

app.use("*", cors());
app.use(logger());
app.use('/api/auth/*', jwt({
    secret: secretKey || '', alg: 'HS256' })
);

app.get('/api/auth/health', async (c: Context) => await healthCheck(c));
app.get('/api/token/:id', async (c: Context) => {
    const id: string = c.req.param('id');

    if (!id) {
        c.status(400);
        return c.json({ message: 'ID is required' });
    }

    const jwt: string = await generateToken(id);
    c.res.headers.set('Authorization', `Bearer ${jwt}`);
    return c.json({ jwt });
});

app.route('/api/auth/employee', employeeRouter);
app.route('/api/auth/timesheet', timesheetRouter);

Deno.serve(app.fetch);