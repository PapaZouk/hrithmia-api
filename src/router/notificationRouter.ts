import { Context, Hono } from 'hono';
import {addEventNotification} from "../controllers/notification/addEventNotification.ts";
import {getAllEventNotifications} from "../controllers/notification/getAllEventNotifications.ts";
import {getEventNotificationById} from "../controllers/notification/getEventNotificationById.ts";
import {deleteEventNotificationById} from "../controllers/notification/deleteEventNotificationById.ts";
import {updateEventNotificationById} from "../controllers/notification/updateEventNotificationById.ts";
import {markAsReadEventNotificationsById} from "../controllers/notification/markAsReadEventNotificationsById.tsx";

const notificationRouter = new Hono();

notificationRouter.get('/event/all', async (c: Context) => await getAllEventNotifications(c));
notificationRouter.get('/event/:id', async (c: Context) => await getEventNotificationById(c));
notificationRouter.post('/event/add/', async (c: Context) => await addEventNotification(c));
notificationRouter.delete('/event/delete/:id', async (c: Context) => await deleteEventNotificationById(c));
notificationRouter.put('/event/update/:id', async (c: Context) => await updateEventNotificationById(c));
notificationRouter.patch('/event/read/all', async (c: Context) => await markAsReadEventNotificationsById(c));

export default notificationRouter;