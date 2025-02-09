import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createEventNotification} from "../../_mocks/createEventNotification.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import EventNotification, {IEventNotification,} from "../../../../src/model/IEventNotification.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {getAllEventNotifications} from "../../../../src/controllers/notification/getAllEventNotifications.ts";

describe("getAllEventNotifications", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return all event notifications", async () => {
    const mockNotificationsResponse = [
      createEventNotification({ eventId: "1" }),
      createEventNotification({ eventId: "2" }),
    ];

    const findStub = stub(EventNotification, "find", function () {
      return createQueryMock(mockNotificationsResponse, EventNotification);
    });

    const mockContext = createMockContext(mockNotificationsResponse);

    const response = await getAllEventNotifications(mockContext);
    const responseJson = await response._data as {
      result: IEventNotification[];
    };

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ result: mockNotificationsResponse });
    expect(responseJson.result.length).toBe(2);
    expect(responseJson.result[0].eventId).toBe("1");
    expect(responseJson.result[1].eventId).toBe("2");

    findStub.restore();
  });

    it("should return 404 if no event notifications found", async () => {
        const findStub = stub(EventNotification, "find", function () {
        return createQueryMock([], EventNotification);
        });

        const mockContext = createMockContext([]);

        const response = await getAllEventNotifications(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(404);
        expect(response._data).toEqual({ error: "No notifications found" });

        findStub.restore();
    });

    it("should return 500 if an error occurs", async () => {
        const findStub = stub(EventNotification, "find", function () {
            throw new Error("Error finding notifications");
        });

        const mockContext = createMockContext([]);

        const response = await getAllEventNotifications(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: "Error finding notifications" });

        findStub.restore();
    });
});
