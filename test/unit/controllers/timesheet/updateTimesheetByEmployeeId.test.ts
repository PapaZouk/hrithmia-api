import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createTimesheet } from "../../_mocks/createTimesheet.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { createQueryMock } from "../../_mocks/createQueryMock.ts";
import Timesheet from "../../../../src/model/ITimesheet.ts";
import { updateTimesheetByEmployeeId } from "../../../../src/controllers/timesheet/updateTimesheetByEmployeeId.ts";

describe("updateTimesheetByEmployeeId", () => {
  afterAll(() => afterAllSetup());
  beforeAll(() => beforeAllSetup());

  it("should update timesheet by employee id", async () => {
    const employeeId = "9001";
    const mockTimesheet = createTimesheet({ employeeId });
    const mockContext = createMockContext(mockTimesheet, employeeId);

    const findOneAndUpdateStub = stub(
      Timesheet,
      "findOneAndUpdate",
      function () {
        return createQueryMock(mockTimesheet, Timesheet);
      },
    );

    const response = await updateTimesheetByEmployeeId(mockContext, () => true);

    expect(findOneAndUpdateStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "Timesheet updated", timesheet: mockTimesheet});

    findOneAndUpdateStub.restore();
  });

    it("should return 404 if no timesheet found", async () => {
        const employeeId = "9002";
        const mockContext = createMockContext({}, employeeId);

        const findOneAndUpdateStub = stub(
        Timesheet,
        "findOneAndUpdate",
        function () {
            return createQueryMock(null, Timesheet);
        },
        );

        const response = await updateTimesheetByEmployeeId(mockContext, () => true);

        expect(findOneAndUpdateStub.calls.length).toBe(1);
        expect(response._status).toBe(404);

        findOneAndUpdateStub.restore();
    });

    it("should return 400 if no data was provided", async () => {
        const employeeId = "9003";
        const mockContext = createMockContext({}, employeeId);

        const response = await updateTimesheetByEmployeeId(mockContext, () => false);

        expect(response._status).toBe(400);
    });

    it("should return 500 if an error occurs", async () => {
        const employeeId = "9004";
        const mockContext = createMockContext({}, employeeId);

        const findOneAndUpdateStub = stub(
        Timesheet,
        "findOneAndUpdate",
        function () {
            throw new Error("Error occurred");
        },
        );

        const response = await updateTimesheetByEmployeeId(mockContext, () => true);

        expect(findOneAndUpdateStub.calls.length).toBe(1);
        expect(response._status).toBe(500);

        findOneAndUpdateStub.restore();
    });
});
