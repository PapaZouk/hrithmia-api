import mongoose from "mongoose";
import Timesheet from "../../../src/model/ITimesheet.ts";

export function createTimesheetMongooseModel(timesheetRequest: any, authId: string) {
    return new Timesheet({
        ...timesheetRequest,
        _id: new mongoose.Types.ObjectId(authId.padStart(24, "0")),
    });
}