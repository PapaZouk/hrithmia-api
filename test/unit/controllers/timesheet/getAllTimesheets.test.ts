import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createTimesheet} from "../../_mocks/createTimesheet.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import Timesheet, {ITimesheet} from "../../../../src/model/ITimesheet.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import {getAllTimesheets} from "../../../../src/controllers/timesheet/getAllTimesheets.ts";

describe("getAllTimesheets", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return all timesheets", async () => {
    const employeeId1 = "9001";
    const employeeId2 = "9002";
    const mockTimesheet1 = createTimesheet({ employeeId: employeeId1 });
    const mockTimesheet2 = createTimesheet({ employeeId: employeeId2 });
    const mockTimesheetResponse = [mockTimesheet1, mockTimesheet2];

    const mockContext = createMockContext({}, employeeId1);

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        return createQueryMock(mockTimesheetResponse, Timesheet);
      },
    );

    const response = await getAllTimesheets(mockContext);
    const responseJson = await response._data as { result: ITimesheet[] };

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ result: mockTimesheetResponse });
    expect(responseJson.result.length).toBe(2);
    expect(responseJson.result[0].employeeId).toBe(employeeId1);
    expect(responseJson.result[1].employeeId).toBe(employeeId2);

    findStub.restore();
  });

  it("should return 404 if no timesheets found", async () => {
    const employeeId = "9003";
    const mockContext = createMockContext({}, employeeId);

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        return createQueryMock([], Timesheet);
      },
    );

    const response = await getAllTimesheets(mockContext);

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(404);
    expect(response._data).toEqual({ error: "No timesheets found" });

    findStub.restore();
  });

  it("should return 500 if an error occurs", async () => {
    const employeeId = "9004";
    const mockContext = createMockContext({}, employeeId);

    const findStub = stub(
      Timesheet,
      "find",
      function () {
        throw new Error("Error finding timesheets");
      },
    );

    const response = await getAllTimesheets(mockContext);

    expect(findStub.calls.length).toBe(1);
    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error finding timesheets" });

    findStub.restore();
  });
});
