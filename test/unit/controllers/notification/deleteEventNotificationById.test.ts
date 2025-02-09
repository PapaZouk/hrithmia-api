import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createEventNotification } from "../../_mocks/createEventNotification.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import EventNotification from "../../../../src/model/IEventNotification.ts";
import {
  createQueryMock,
} from "../../_mocks/createQueryMock.ts";
import { deleteEventNotificationById } from "../../../../src/controllers/notification/deleteEventNotificationById.ts";
import {createDeleteQueryResultMock} from "../../_mocks/createDeleteQueryResultMock.ts";

describe("deleteEventNotificationById", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should delete event notification by id", async () => {
    const notificationId = "91";
    const mockEventNotification = createEventNotification({
      id: notificationId,
    });
    const mockContext = createMockContext(
      {},
      notificationId,
    );

    const findByIdStub = stub(
      EventNotification,
      "findById",
      function () {
        return createQueryMock(mockEventNotification, EventNotification);
      },
    );

    const deleteOneStub = stub(
      EventNotification,
      "deleteOne",
      function () {
        return createDeleteQueryResultMock({
          acknowledged: true,
          deletedCount: 1,
        });
      },
    );

    const response = await deleteEventNotificationById(mockContext);

    expect(findByIdStub.calls.length).toBe(1);
    expect(deleteOneStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "Notification deleted" });

    findByIdStub.restore();
    deleteOneStub.restore();
  });

    it("should return 404 if no notification found", async () => {
        const notificationId = "92";
        const mockContext = createMockContext(
        {},
        notificationId,
        );

        const findByIdStub = stub(
        EventNotification,
        "findById",
        function () {
            return createQueryMock(null, EventNotification);
        },
        );

        const response = await deleteEventNotificationById(mockContext);

        expect(findByIdStub.calls.length).toBe(1);
        expect(response._status).toBe(404);
        expect(response._data).toEqual({ message: "Notification not found" });

        findByIdStub.restore();
    });

    it("should return 400 if no id provided", async () => {
        const mockContext = createMockContext({}, "");

        const response = await deleteEventNotificationById(mockContext);

        expect(response._status).toBe(400);
        expect(response._data).toEqual({ message: "ID is required" });
    });

    it("should return 500 if error", async () => {
        const notificationId = "93";
        const mockEventNotification = createEventNotification({
        id: notificationId,
        });
        const mockContext = createMockContext(
        {},
        notificationId,
        );

        const findByIdStub = stub(
        EventNotification,
        "findById",
        function () {
            return createQueryMock(mockEventNotification, EventNotification);
        },
        );

        const deleteOneStub = stub(
        EventNotification,
        "deleteOne",
        function () {
            throw new Error("Error deleting notification");
        },
        );

        const response = await deleteEventNotificationById(mockContext);

        expect(findByIdStub.calls.length).toBe(1);
        expect(deleteOneStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: "Error deleting notification" });

        findByIdStub.restore();
        deleteOneStub.restore();
    });
});
