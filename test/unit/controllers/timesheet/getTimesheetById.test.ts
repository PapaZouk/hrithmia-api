import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import {createTimesheet} from "../../_mocks/createTimesheet.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import Timesheet, {ITimesheet} from "../../../../src/model/ITimesheet.ts";
import {getTimesheetById} from "../../../../src/controllers/timesheet/getTimesheetById.ts";

describe("getTimesheetById", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return timesheet by id", async () => {
    const timesheetId = "7001".padStart(24, "0");
    const employeeId = "7777";
    const mockTimesheet = createTimesheet({
      id: timesheetId,
      employeeId,
    });

    const findStub = stub(
      Timesheet,
      "findOne",
      function () {
        return createQueryMock(mockTimesheet, Timesheet);
      },
    );

    const mockContext = createMockContext(
      mockTimesheet,
      timesheetId,
    );

    const response = await getTimesheetById(mockContext);
    const responseJson = await response._data as { result: ITimesheet };

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ result: mockTimesheet });
    expect(responseJson.result.employeeId).toBe(employeeId);

    findStub.restore();
  });

    it("should return 404 if no timesheet found", async () => {
        const timesheetId = "7002".padStart(24, "0");
        const mockContext = createMockContext(
        {},
        timesheetId,
        );

        const findStub = stub(
        Timesheet,
        "findOne",
        function () {
            return createQueryMock(null, Timesheet);
        },
        );

        const response = await getTimesheetById(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(404);

        findStub.restore();
    });

    it("should return 400 if timesheet ID is not provided", async () => {
        const mockContext = createMockContext(
        {},
        null,
        );

        const response = await getTimesheetById(mockContext);

        expect(response._status).toBe(400);
    });

    it("should return 500 if an error occurs", async () => {
        const timesheetId = "7003".padStart(24, "0");
        const mockContext = createMockContext(
        {},
        timesheetId,
        );

        const findStub = stub(
        Timesheet,
        "findOne",
        function () {
            throw new Error("Error finding timesheet");
        },
        );

        const response = await getTimesheetById(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(500);

        findStub.restore();
    });
});
