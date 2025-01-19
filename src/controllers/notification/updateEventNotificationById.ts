import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import EventNotification, {
  IEventNotification,
} from "../../model/IEventNotification.ts";

export const updateEventNotificationById = async (
  c: Context,
): Promise<TypedResponse> => {
  console.log("Requesting to update event notification");
  try {
    await connectDb();

    const id = c.req.param("id");

    if (!id) {
      return c.json({ message: "ID is required" }, 400);
    }

    const data = await c.req.json();

    const notification = await EventNotification
        .findOne({ eventId: id });
    console.log("Notification: ", notification);

    if (!notification) {
      return c.json({ message: "Notification not found" }, 404);
    }

    console.log("Updating notification data");
    updateNotificationData(notification, data);

    await notification.save();

    return c.json({ message: "Notification updated" }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};

const updateNotificationData = (
  eventNotification: IEventNotification,
  data: any,
) => {
  eventNotification._id = data._id;
  eventNotification.eventId = data.eventId;
  eventNotification.userId = data.userId;
  eventNotification.title = data.title;
  eventNotification.description = data.description;
  eventNotification.date = data.date;
  eventNotification.time = data.time;
  eventNotification.location = data.location;
  eventNotification.createdBy = data.createdBy;
  eventNotification.tags = data.tags;
  eventNotification.isRead = data.isRead;
};
