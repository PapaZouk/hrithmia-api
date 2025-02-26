import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createTimesheet } from "../../_mocks/createTimesheet.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { createTimesheetMongooseModel } from "../../_mocks/createTimesheetMongooseModel.ts";
import Timesheet, { ITimesheet } from "../../../../src/model/ITimesheet.ts";
import { getAnnualLeavesByYear } from "../../../../src/controllers/timesheet/getAnnualLeavesByYear.ts";
import { createAggregateMock } from "../../_mocks/createAggregateMock.ts";

describe("getAnnualLeavesByYear", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return annual leaves by year", async () => {
    const year = "2025";
    const mockTimesheet = createTimesheet({ year: parseInt(year) });
    const timesheetMongooseModel = createTimesheetMongooseModel(
      mockTimesheet,
      year,
    );
    const mockContext = createMockContext({}, year);

    const aggregateStub = stub(
      Timesheet,
      "aggregate",
      function () {
        return createAggregateMock([timesheetMongooseModel]);
      },
    );

    const response = await getAnnualLeavesByYear(mockContext);
    const responseJson = await response._data as { result: ITimesheet[] };

    expect(aggregateStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(responseJson.result[0].year).toBe(parseInt(year));

    aggregateStub.restore();
  });

  it("should return 404 if no annual leaves found", async () => {
    const year = "2026";
    const mockContext = createMockContext({}, year);

    const aggregateStub = stub(
      Timesheet,
      "aggregate",
      function () {
        return createAggregateMock([]);
      },
    );

    const response = await getAnnualLeavesByYear(mockContext);

    expect(aggregateStub.calls.length).toBe(1);
    expect(response._status).toBe(404);

    aggregateStub.restore();
  });

  it("should return 400 if year is not provided", async () => {
    const mockContext = createMockContext({}, "");

    const response = await getAnnualLeavesByYear(mockContext);

    expect(response._status).toBe(400);
  });

    it("should return 500 if an error occurs", async () => {
        const year = "2025";
        const mockContext = createMockContext({}, year);

        const aggregateStub = stub(
        Timesheet,
        "aggregate",
        function () {
            throw new Error("Test error");
        },
        );

        const response = await getAnnualLeavesByYear(mockContext);

        expect(aggregateStub.calls.length).toBe(1);
        expect(response._status).toBe(500);

        aggregateStub.restore();
    });
});
