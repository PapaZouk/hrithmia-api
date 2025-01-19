import EventNotification, {IEventNotification} from "../model/IEventNotification.ts";

export default function mapResponseToEventNotification(data: IEventNotification) {
  return new EventNotification({
    eventId: data.eventId,
    userId: data.userId,
    title: data.title,
    description: data.description,
    date: data.date,
    time: data.time,
    location: data.location,
    createdBy: data.createdBy,
    tags: data.tags,
    isRead: data.isRead
  });
}