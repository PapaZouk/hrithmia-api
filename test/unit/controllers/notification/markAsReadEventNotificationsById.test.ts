import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createEventNotification } from "../../_mocks/createEventNotification.ts";
import EventNotification, {
  IEventNotification,
} from "../../../../src/model/IEventNotification.ts";
import { createQueryMock } from "../../_mocks/createQueryMock.ts";
import {
  markAsReadEventNotificationsById,
} from "../../../../src/controllers/notification/markAsReadEventNotificationsById.tsx";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import mongoose from "mongoose";
import { createEventNotificationMongooseModel } from "../../_mocks/createEventNotificationMongooseModel.ts";

describe("markAsReadEventNotificationsById", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should mark as read event notifications by id", async () => {
    const id = "3";
    const eventNotification = createEventNotification({
      eventId: id,
      userId: id,
    });
    const eventNotificationMongooseModel = [
      createEventNotificationMongooseModel(eventNotification, id),
    ];

    const findOneStub = stub(EventNotification, "find", function () {
      return createQueryMock(eventNotificationMongooseModel, EventNotification);
    });

    const saveStub = stub(
      EventNotification.prototype,
      "save",
      async function () {
        this._id = new mongoose.Types.ObjectId(
          eventNotification.eventId.padStart(24, "0"),
        );
        return this as mongoose.Document<IEventNotification>;
      },
    );

    const mockContext = createMockContext(
      eventNotificationMongooseModel,
      null,
      id,
    );

    const response = await markAsReadEventNotificationsById(mockContext);

    expect(findOneStub.calls.length).toBe(1);
    expect(saveStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "Notifications updated" });

    findOneStub.restore();
    saveStub.restore();
  });

    it("should mark as read all event notifications by ids", async () => {
        const id1 = "4";
        const id2 = "5";
        const eventNotification1 = createEventNotification({
            eventId: id1,
            userId: id1,
        });
        const eventNotification2 = createEventNotification({
            eventId: id2,
            userId: id2,
        });
        const eventNotificationMongooseModel = [
            createEventNotificationMongooseModel(eventNotification1, id1),
            createEventNotificationMongooseModel(eventNotification2, id2),
        ];

        const findOneStub = stub(EventNotification, "find", function () {
            return createQueryMock(eventNotificationMongooseModel, EventNotification);
        });

        const saveStub = stub(
            EventNotification.prototype,
            "save",
            async function () {
                this._id = new mongoose.Types.ObjectId(
                    eventNotification1.eventId.padStart(24, "0"),
                );
                return this as mongoose.Document<IEventNotification>;
            },
        );

        const mockContext = createMockContext(
            eventNotificationMongooseModel,
            null,
            [id1, id2].join(","),
        );

        const response = await markAsReadEventNotificationsById(mockContext);

        expect(findOneStub.calls.length).toBe(1);
        expect(saveStub.calls.length).toBe(2);
        expect(response._status).toBe(200);
        expect(response._data).toEqual({ message: "Notifications updated" });

        findOneStub.restore();
        saveStub.restore();
    });

  it("should return 404 if no event notifications found", async () => {
    const findOneStub = stub(EventNotification, "find", function () {
      return createQueryMock([], EventNotification);
    });

    const mockContext = createMockContext([], null, "4");

    const response = await markAsReadEventNotificationsById(mockContext);

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(404);
    expect(response._data).toEqual({ message: "Notifications not found" });

    findOneStub.restore();
  });

  it("should return 500 if an error occurs", async () => {
    const findOneStub = stub(EventNotification, "find", function () {
      throw new Error("Error finding notifications");
    });

    const mockContext = createMockContext([], null, "5");

    const response = await markAsReadEventNotificationsById(mockContext);

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error finding notifications" });

    findOneStub.restore();
  });
});
