import mongoose from "mongoose";
import Employee from "../../../src/model/IEmployee.ts";

export function createEmployeeMongooseModel(employeeRequest: any, authId: string) {
    return new Employee({
        ...employeeRequest,
        _id: new mongoose.Types.ObjectId(authId.padStart(24, "0")),
    });
}