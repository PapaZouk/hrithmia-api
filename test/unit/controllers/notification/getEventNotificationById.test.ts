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
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { getEventNotificationById } from "../../../../src/controllers/notification/getEventNotificationById.ts";

describe("getEventNotificationById", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return a event notification by id", async () => {
    const id = "3";
    const mockEventNotificationResponse = createEventNotification({
      eventId: id,
      userId: id,
    });

    const findOneStub = stub(EventNotification, "findOne", function () {
      return createQueryMock(mockEventNotificationResponse, EventNotification);
    });

    const mockContext = createMockContext(
      mockEventNotificationResponse,
      id,
    );

    const response = await getEventNotificationById(mockContext);
    const responseJson = await response._data as { result: IEventNotification };

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ result: mockEventNotificationResponse });
    expect(responseJson.result.eventId).toBe(id);

    findOneStub.restore();
  });

  it("should return 404 if no event notification found", async () => {
    const findOneStub = stub(EventNotification, "findOne", function () {
      return createQueryMock(null, EventNotification);
    });

    const mockContext = createMockContext({}, "4");

    const response = await getEventNotificationById(mockContext);

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(404);
    expect(response._data).toEqual({ error: "No notification found" });

    findOneStub.restore();
  });

    it("should return 500 if an error occurs", async () => {
        const findOneStub = stub(EventNotification, "findOne", function () {
        throw new Error("Error occurred");
        });

        const mockContext = createMockContext({}, "5");

        const response = await getEventNotificationById(mockContext);

        expect(findOneStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: "Error occurred" });

        findOneStub.restore();
    });
});
