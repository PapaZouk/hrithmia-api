import {IEventNotification} from "../../../src/model/IEventNotification.ts";

export function createEventNotification(overrides?: Partial<IEventNotification>) {
    return {
        eventId: overrides?.eventId ?? "eventId",
        userId: overrides?.userId ?? "userId",
        title: overrides?.title ?? "title",
        description: overrides?.description ?? "description",
        date: overrides?.date ?? "date",
        time: overrides?.time ?? "time",
        location: overrides?.location ?? "location",
        createdBy: overrides?.createdBy ?? "createdBy",
        tags: overrides?.tags ?? ["tags"],
        isRead: overrides?.isRead ?? false,
    }
}