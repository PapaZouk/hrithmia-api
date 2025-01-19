import { z } from "npm:zod";

const eventNotificationSchema = z.object({
  eventId: z.string().nonempty("Event ID is required"),
  userId: z.string(),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  date: z.string().nonempty("Date is required"),
  time: z.string().nonempty("Time is required"),
  location: z.string().nonempty("Location is required"),
  createdBy: z.string(),
  tags: z.array(z.string()).nonempty("Tags are required"),
  isRead: z.boolean().default(false),
});

export const validateEventNotification = (data: object): boolean => {
  try {
    eventNotificationSchema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.errors);
    }
    return false;
  }
};
