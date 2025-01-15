import {Context} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import {validateEventNotification} from "../../validators/eventNotificationValidator.ts";
import mapResponseToEventNotification from "../../mapper/mapResponseToEventNotiication.ts";

export const addEventNotification = async (c: Context) => {
    console.log("Requesting to add notification");
    try {
        await connectDb();

        const data = await c.req.json();

        if (!validateEventNotification(data)) {
            return c.json({error: "Invalid data"}, 400);
        }

        const notification = mapResponseToEventNotification(data);

        const result = await notification.save();

        return c.json({message: "Notification saved", id: result._id}, 200);
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error: (error as Error).message}, 500);
    }
}