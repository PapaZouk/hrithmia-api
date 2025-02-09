import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createEventNotification } from "../../_mocks/createEventNotification.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { createEventNotificationMongooseModel } from "../../_mocks/createEventNotificationMongooseModel.ts";
import EventNotification from "../../../../src/model/IEventNotification.ts";
import { createQueryMock } from "../../_mocks/createQueryMock.ts";
import { updateEventNotificationById } from "../../../../src/controllers/notification/updateEventNotificationById.ts";

describe("updateEventNotificationById", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should update event notification by id", async () => {
    const notificationId = "5001";
    const mockEventNotification = createEventNotification({
      eventId: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );
    const eventNotificationMongooseModel = createEventNotificationMongooseModel(
      mockEventNotification,
      notificationId,
    );

    const findOneStub = stub(
      EventNotification,
      "findOne",
      function () {
        return createQueryMock(
          eventNotificationMongooseModel,
          EventNotification,
        );
      },
    );
    const saveStub = stub(
      EventNotification.prototype,
      "save",
      async function () {
        return this;
      },
    );

    const response = await updateEventNotificationById(mockContext);

    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "Notification updated" });
    expect(findOneStub.calls.length).toBe(1);
    expect(saveStub.calls.length).toBe(1);

    findOneStub.restore();
    saveStub.restore();
  });

  it("should return 404 if no notification found", async () => {
    const notificationId = "5002";
    const mockEventNotification = createEventNotification({
      eventId: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );

    const findOneStub = stub(
      EventNotification,
      "findOne",
      function () {
        return createQueryMock(null, EventNotification);
      },
    );

    const response = await updateEventNotificationById(mockContext);

    expect(response._status).toBe(404);
    expect(response._data).toEqual({ message: "Notification not found" });
    expect(findOneStub.calls.length).toBe(1);

    findOneStub.restore();
  });

  it("should return 400 if no id provided", async () => {
    const mockContext = createMockContext(
      createEventNotification({}),
      "",
    );

    const response = await updateEventNotificationById(mockContext);

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ message: "ID is required" });
  });

  it("should return 500 if error", async () => {
    const notificationId = "5003";
    const mockEventNotification = createEventNotification({
      eventId: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );
    const eventNotificationMongooseModel = createEventNotificationMongooseModel(
      mockEventNotification,
      notificationId,
    );

    const findOneStub = stub(
      EventNotification,
      "findOne",
      function () {
        return createQueryMock(
          eventNotificationMongooseModel,
          EventNotification,
        );
      },
    );
    const saveStub = stub(
      EventNotification.prototype,
      "save",
      async function () {
        throw new Error("Error saving notification");
      },
    );

    const response = await updateEventNotificationById(mockContext);

    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error saving notification" });
    expect(findOneStub.calls.length).toBe(1);
    expect(saveStub.calls.length).toBe(1);

    findOneStub.restore();
    saveStub.restore();
  });
});
