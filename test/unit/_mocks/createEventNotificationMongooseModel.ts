import EventNotification from "../../../src/model/IEventNotification.ts";
import mongoose from "mongoose";

export function createEventNotificationMongooseModel(notificationRequest: any, authId: string) {
    return new EventNotification({
        ...notificationRequest,
        _id: new mongoose.Types.ObjectId(authId.padStart(24, "0")),
    })
}