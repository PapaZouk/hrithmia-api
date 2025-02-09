import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import mongoose from "mongoose";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createEventNotification } from "../../_mocks/createEventNotification.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import EventNotification, {
  IEventNotification,
} from "../../../../src/model/IEventNotification.ts";
import { createEventNotificationMongooseModel } from "../../_mocks/createEventNotificationMongooseModel.ts";
import { addEventNotification } from "../../../../src/controllers/notification/addEventNotification.ts";

describe("addEventNotification", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should add event notification", async () => {
    const notificationId = "1001";
    const mockEventNotification = createEventNotification({
      id: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );
    const notificationMongooseModel = createEventNotificationMongooseModel(
      mockEventNotification,
      notificationId,
    );

    const saveStub = stub(
      EventNotification.prototype,
      "save",
      async function () {
        this._id = new mongoose.Types.ObjectId(
          notificationId.padStart(24, "0"),
        );
        return this as mongoose.Document<IEventNotification>;
      },
    );

    const response = await addEventNotification(
      mockContext,
      () => notificationMongooseModel,
      () => true,
    );
    const responseJson = response._data as unknown as {
      message: string;
      id: string;
    };

    expect(response._status).toBe(200);
    expect(responseJson.message).toBe("Notification saved");
    expect(responseJson).toHaveProperty("id");
    expect(responseJson.id).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(responseJson.id.toString()).toBe(notificationId.padStart(24, "0"));

    saveStub.restore();
  });

  it("should return 400 if invalid data", async () => {
    const notificationId = "1002";
    const mockEventNotification = createEventNotification({
      id: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );
    const mockNotification = createEventNotificationMongooseModel(
      mockEventNotification,
      notificationId,
    );

    const response = await addEventNotification(
      mockContext,
      () => mockNotification,
      () => false,
    );
    const responseJson = response._data as unknown as { error: string };

    expect(response._status).toBe(400);
    expect(responseJson.error).toBe("Invalid data");
  });

  it("should return 500 if error", async () => {
    const notificationId = "1003";
    const mockEventNotification = createEventNotification({
      id: notificationId,
    });
    const mockContext = createMockContext(
      mockEventNotification,
      notificationId,
    );
    const mockNotification = createEventNotificationMongooseModel(
      mockEventNotification,
      notificationId,
    );

    const saveStub = stub(
      EventNotification.prototype,
      "save",
      async function () {
        throw new Error("Error saving notification");
      },
    );

    const response = await addEventNotification(
      mockContext,
      () => mockNotification,
      () => true,
    );

    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error saving notification" });

    saveStub.restore();
  });
});
