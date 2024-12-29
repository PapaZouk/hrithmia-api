import { Context, Hono } from 'hono';
import {getTimesheetById} from "../controllers/timesheet/getTimesheetById.ts";
import {addTimesheet} from "../controllers/timesheet/addTimesheet.ts";
import {getAllTimesheets} from "../controllers/timesheet/getAllTimesheets.ts";
import {updateTimesheetByEmployeeId} from "../controllers/timesheet/updateTimesheetByEmployeeId.ts";
import {deleteTimesheetByEmployeeId} from "../controllers/timesheet/deleteTimesheetByEmployeeId.ts";
import {getTimesheetByEmployeeId} from "../controllers/timesheet/getTimesheetByEmployeeId.ts";

const timesheetRouter = new Hono();

timesheetRouter.get(':id', async (c: Context) => await getTimesheetById(c));
timesheetRouter.post('/', async (c: Context) => await addTimesheet(c));
timesheetRouter.get('all', async (c: Context) => await getAllTimesheets(c));
timesheetRouter.get('/employee/:id', async (c: Context) => await getTimesheetByEmployeeId(c));
timesheetRouter.put('/employee/:id', async (c: Context) => await updateTimesheetByEmployeeId(c));
timesheetRouter.delete('/employee/:id', async (c: Context) => await deleteTimesheetByEmployeeId(c));

export default timesheetRouter;