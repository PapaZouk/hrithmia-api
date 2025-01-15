import mongoose, { Schema, Document } from "mongoose";

export interface IEventNotification extends Document{
    eventId: string;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    createdBy: string;
    tags: string[];
}

const EventNotificationSchema: Schema = new Schema({
    eventId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    createdBy: { type: String, required: true },
    tags: { type: [String], required: true }
});

export default mongoose.model<IEventNotification>('EventNotification', EventNotificationSchema);