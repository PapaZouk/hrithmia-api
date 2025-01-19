import mongoose, { Schema, Document } from "mongoose";

export interface IEventNotification extends Document{
    eventId: string;
    userId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdBy: string;
    tags: string[];
    isRead: boolean;
}

const EventNotificationSchema: Schema = new Schema({
    eventId: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: String, required: true },
    tags: { type: [String], required: true },
    isRead: { type: Boolean, default: false }
});

export default mongoose.model<IEventNotification>('EventNotification', EventNotificationSchema);