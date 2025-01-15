import {Context} from 'hono';
import {connectDb} from "../../database/connectDb.ts";
import EventNotification from '../../model/IEventNotification.ts';

export const deleteEventNotificationById = async (c: Context) => {
    try {
        await connectDb();

        const id = c.req.param('id');

        if (!id) {
            return c.json({ message: 'ID is required' }, 400);
        }

        console.log("Deleting notification with id: ", id);

        const notification = await EventNotification.findById(id);

        if (!notification) {
            return c.json({ message: 'Notification not found' }, 404);
        }

        await EventNotification.deleteOne({ _id: id });

        return c.json({ message: 'Notification deleted' }, 200);
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message }, 500);
    }
}