import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import EventNotification, {
  IEventNotification,
} from "../../model/IEventNotification.ts";

export const updateAllEventNotifications = async (
  c: Context,
): Promise<TypedResponse> => {
  console.log("Requesting to update all event notifications");
  try {
    await connectDb();

    const data = await c.req.json();

    const dataEventIds: IEventNotification[] = data.map((
      notification: IEventNotification,
    ) => notification.eventId);

    if (!dataEventIds) {
      return c.json({ message: "Event IDs are required" }, 400);
    }

    const eventNotifications = [];

    for (const eventId of dataEventIds) {
      if (!eventId) {
        c.json({ message: "Event ID is required" }, 400);
      } else {
        const result = await EventNotification.findOne({ eventId: eventId });
        if (result) {
          eventNotifications.push(result);
        }
      }
    }

    if (eventNotifications.length === 0) {
      return c.json({ message: "Notifications not found" }, 404);
    }

    console.log("Updating all notifications data");
    eventNotifications.forEach((notification) => {
      updateNotificationData(notification, data);
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
