import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createTimesheet } from "../../_mocks/createTimesheet.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { createQueryMock } from "../../_mocks/createQueryMock.ts";
import Timesheet, { ITimesheet } from "../../../../src/model/ITimesheet.ts";
import { getTimesheetByEmployeeId } from "../../../../src/controllers/timesheet/getTimesheetByEmployeeId.ts";
import { createTimesheetMongooseModel } from "../../_mocks/createTimesheetMongooseModel.ts";

describe("getTimesheetByEmployeeId", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return timesheet by employee id", async () => {
    const employeeId = "4001";
    const mockTimesheet = createTimesheet({
      employeeId,
    });
    const timesheetMongooseModel = createTimesheetMongooseModel(
      mockTimesheet,
      employeeId,
    );

    const mockContext = createMockContext(
      {},
      employeeId.padStart(24, "0"),
      { year: "2025", "month": "12" },
    );

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        return createQueryMock(timesheetMongooseModel, Timesheet);
      },
    );

    const response = await getTimesheetByEmployeeId(mockContext);
    const responseJson = await response._data as { result: ITimesheet };

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(responseJson.result.employeeId).toBe(employeeId);

    findStub.restore();
  });

  it("should return 404 if no timesheet found", async () => {
    const employeeId = "4002";
    const mockContext = createMockContext(
      {},
      employeeId.padStart(24, "0"),
      { year: "2025", "month": "12" },
    );

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        return createQueryMock([], Timesheet);
      },
    );

    const response = await getTimesheetByEmployeeId(mockContext);

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(404);

    findStub.restore();
  });

  it("should return 400 if year and month are missing", async () => {
    const employeeId = "4003";
    const mockContext = createMockContext(
      {},
      employeeId.padStart(24, "0"),
      {},
    );

    const response = await getTimesheetByEmployeeId(mockContext);

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ error: "Year and month are required" });
  });

  it("should return 400 if employee ID is not provided", async () => {
    const mockContext = createMockContext(
      {},
      null,
      { year: "2025", "month": "12" },
    );

    const response = await getTimesheetByEmployeeId(mockContext);

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ error: "Employee ID is required" });
  });

  it("should return 500 if error", async () => {
    const employeeId = "4004";

    const mockContext = createMockContext(
      {},
      employeeId.padStart(24, "0"),
      { year: "2025", "month": "12" },
    );

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        throw new Error("Error finding timesheet");
      },
    );

    const response = await getTimesheetByEmployeeId(mockContext);

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(500);

    findStub.restore();
  });
});
