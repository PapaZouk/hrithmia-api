import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import EventNotification, {
  IEventNotification,
} from "../../model/IEventNotification.ts";

export const markAsReadEventNotificationsById = async (
  c: Context,
): Promise<TypedResponse> => {
  console.log("Requesting to mark event notifications by IDs as read");
  try {
    await connectDb();

    const ids: string[] = c.req.query("ids")?.split(",") || [];
    console.log("Notification IDs:", ids);

    if (ids.length === 0) {
      return c.json({ error: "IDs are required" }, 400);
    }

    const eventNotifications = await EventNotification.find({ _id: { $in: ids } });

    if (eventNotifications.length === 0) {
      return c.json({ message: "Notifications not found" }, 404);
    }

    console.log("Updating all event notifications");
    eventNotifications.forEach((notification) => {
      updateNotificationData(notification, { isRead: true });
      notification.save();
    });

    return c.json({ message: "Notifications updated" }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};

const updateNotificationData = (
  eventNotification: IEventNotification,
  data: any,
): void => {
  eventNotification.isRead = data.isRead;
};
