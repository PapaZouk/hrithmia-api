import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import mongoose from "mongoose";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import {createTimesheet} from "../../_mocks/createTimesheet.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import Timesheet, {ITimesheet} from "../../../../src/model/ITimesheet.ts";
import {addTimesheet} from "../../../../src/controllers/timesheet/addTimesheet.ts";
import {createTimesheetMongooseModel} from "../../_mocks/createTimesheetMongooseModel.ts";

describe("addTimesheet", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should add timesheet and return 200", async () => {
    const timesheetId = "2001";
    const mockTimesheet = createTimesheet({
      id: timesheetId,
    });
    const mockContext = createMockContext(
      mockTimesheet,
      timesheetId,
    );
    const timesheetMongooseModel = createTimesheetMongooseModel(
      mockTimesheet,
      timesheetId,
    );

    const saveStub = stub(
      Timesheet.prototype,
      "save",
      async function () {
        this._id = new mongoose.Types.ObjectId(
          timesheetId.padStart(24, "0"),
        );
        return this as mongoose.Document<ITimesheet>;
      },
    );

    const response = await addTimesheet(
      mockContext,
      () => timesheetMongooseModel,
      () => true,
    );
    const responseJson = response._data as unknown as {
      message: string;
      id: string;
    };

    expect(response._status).toBe(200);
    expect(responseJson.message).toBe(`Timesheet saved with ID: ${timesheetId.padStart(24, "0")}`);
    expect(saveStub.calls.length).toBe(1);

    saveStub.restore();
  });

    it("should return 400 if timesheet is invalid", async () => {
        const timesheetId = "2002";
        const mockTimesheet = createTimesheet({
        id: timesheetId,
        });
        const mockContext = createMockContext(
        mockTimesheet,
        timesheetId,
        );
        const timesheetMongooseModel = createTimesheetMongooseModel(
        mockTimesheet,
        timesheetId,
        );

        const saveStub = stub(
        Timesheet.prototype,
        "save",
        async function () {
            this._id = new mongoose.Types.ObjectId(
            timesheetId.padStart(24, "0"),
            );
            return this as mongoose.Document<ITimesheet>;
        },
        );

        const response = await addTimesheet(
        mockContext,
        () => timesheetMongooseModel,
        () => false,
        );
        const responseJson = response._data as unknown as {
        error: string;
        };

        expect(response._status).toBe(400);
        expect(responseJson.error).toBe("Invalid data");
        expect(saveStub.calls.length).toBe(0);

        saveStub.restore();
    });

    it("should return 500 if error", async () => {
        const timesheetId = "2003";
        const mockTimesheet = createTimesheet({
        id: timesheetId,
        });
        const mockContext = createMockContext(
        mockTimesheet,
        timesheetId,
        );
        const timesheetMongooseModel = createTimesheetMongooseModel(
        mockTimesheet,
        timesheetId,
        );

        const saveStub = stub(
        Timesheet.prototype,
        "save",
        async function () {
            throw new Error("Error saving timesheet");
        },
        );

        const response = await addTimesheet(
        mockContext,
        () => timesheetMongooseModel,
        () => true,
        );
        const responseJson = response._data as unknown as {
        error: string;
        };

        expect(response._status).toBe(500);
        expect(responseJson.error).toBe("Error saving timesheet");
        expect(saveStub.calls.length).toBe(1);

        saveStub.restore();
    });
});
