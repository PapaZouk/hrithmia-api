import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createTimesheet} from "../../_mocks/createTimesheet.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import Timesheet from "../../../../src/model/ITimesheet.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import {deleteTimesheetByEmployeeId} from "../../../../src/controllers/timesheet/deleteTimesheetByEmployeeId.ts";

describe("deleteTimesheetByEmployeeId", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should delete timesheet by employee id", async () => {
    const employeeId = "5001";
    const mockTimesheet = createTimesheet({
      employeeId,
    });
    const mockContext = createMockContext(
      {},
      employeeId,
    );

    const findOneAndDeleteStub = stub(
      Timesheet,
      "findOneAndDelete",
      function () {
        return createQueryMock(mockTimesheet, Timesheet);
      },
    );

    const response = await deleteTimesheetByEmployeeId(mockContext);

    expect(findOneAndDeleteStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "Timesheet deleted" });

    findOneAndDeleteStub.restore();
  });

  it("should return 404 if no timesheet found", async () => {
    const employeeId = "5002";
    const mockContext = createMockContext(
      {},
      employeeId,
    );

    const findOneAndDeleteStub = stub(
      Timesheet,
      "findOneAndDelete",
      function () {
        return createQueryMock(null, Timesheet);
      },
    );

    const response = await deleteTimesheetByEmployeeId(mockContext);

    expect(findOneAndDeleteStub.calls.length).toBe(1);
    expect(response._status).toBe(404);
    expect(response._data).toEqual({ message: "Timesheet not found" });

    findOneAndDeleteStub.restore();
  });

  it("should return 400 if employee ID is not provided", async () => {
    const mockContext = createMockContext(
      {},
      null,
    );

    const response = await deleteTimesheetByEmployeeId(mockContext);

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ message: "Employee ID is required" });
  });

  it("should return 500 if error", async () => {
    const employeeId = "5003";
    const mockContext = createMockContext(
      {},
      employeeId,
    );

    const findOneAndDeleteStub = stub(
      Timesheet,
      "findOneAndDelete",
      function () {
        throw new Error("Error deleting timesheet");
      },
    );

    const response = await deleteTimesheetByEmployeeId(mockContext);

    expect(findOneAndDeleteStub.calls.length).toBe(1);
    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error deleting timesheet" });

    findOneAndDeleteStub.restore();
  });
});
