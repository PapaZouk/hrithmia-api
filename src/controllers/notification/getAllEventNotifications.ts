import {Context, TypedResponse} from 'hono';
import {connectDb} from "../../database/connectDb.ts";
import EventNotification from '../../model/IEventNotification.ts';

export const getAllEventNotifications = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const result = await EventNotification.find({});

        if (!result || result.length === 0) {
            return c.json({error: "No notifications found"}, 404);
        }

        return c.json({result}, 200);
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message }, 500);
    }
}