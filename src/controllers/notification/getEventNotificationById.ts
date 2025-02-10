import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import EventNotification from "../../model/IEventNotification.ts";

export const getEventNotificationById = async (
  c: Context,
): Promise<TypedResponse> => {
  try {
    await connectDb();

    const id = c.req.param("id");
    console.log("Requesting notification with id: ", id);

    const result = await EventNotification.find({ userId: id });

    if (!result || result.length === 0) {
        return c.json({ error: "No notification found" }, 404);
    }

    return c.json({ result }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
