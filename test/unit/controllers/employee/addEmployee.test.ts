import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import mongoose from "mongoose";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createEmployee } from "../../_mocks/createEmployee.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import { createEmployeeMongooseModel } from "../../_mocks/createEmployeeMongooseModel.ts";
import Employee, { IEmployee } from "../../../../src/model/IEmployee.ts";
import { addEmployee } from "../../../../src/controllers/employee/addEmployee.ts";

describe("addEmployee", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should add employee and return 200", async () => {
    const employeeId = "2222";
    const mockEmployee = createEmployee({
      id: employeeId,
    });
    const mockContext = createMockContext(
      mockEmployee,
      employeeId,
    );
    const employeeMongooseModel = createEmployeeMongooseModel(
      mockEmployee,
      employeeId,
    );

    const saveStub = stub(
      Employee.prototype,
      "save",
      async function () {
        this._id = new mongoose.Types.ObjectId(
          employeeId.padStart(24, "0"),
        );
        return this as mongoose.Document<IEmployee>;
      },
    );

    const response = await addEmployee(
      mockContext,
      () => employeeMongooseModel,
      () => true,
    );
    const responseJson = response._data as unknown as {
      message: string;
      id: string;
    };

    expect(response._status).toBe(200);
    expect(responseJson.message).toBe("Employee saved");
    expect(responseJson).toHaveProperty("id");
    expect(responseJson.id).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(responseJson.id.toString()).toBe(employeeId.padStart(24, "0"));

    saveStub.restore();
  });

  it("should return 400 if data is invalid", async () => {
    const mockEmployee = createEmployee();
    const mockContext = createMockContext(
      mockEmployee,
      "2222",
    );

    const response = await addEmployee(
      mockContext,
      () => createEmployeeMongooseModel(mockEmployee, "2223"),
      () => false,
    );

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ error: "Invalid data" });
  });

  it("should return 400 when no request data is provided", async () => {
    const mockContext = createMockContext(
      {},
      "2224",
    );

    const response = await addEmployee(
      mockContext,
      () => createEmployeeMongooseModel({}, "2224"),
      () => true,
    );

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ error: "Invalid data" });
  });

  it("should return 500 if error", async () => {
    const employeeId = "2225";
    const mockEmployee = createEmployee({
      id: employeeId,
    });
    const mockContext = createMockContext(
      mockEmployee,
      employeeId,
    );

    const saveStub = stub(
      Employee.prototype,
      "save",
      async function () {
        throw new Error("Error saving employee");
      },
    );

    const response = await addEmployee(
      mockContext,
      () => createEmployeeMongooseModel(mockEmployee, employeeId),
      () => true,
    );

    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error saving employee" });

    saveStub.restore();
  });
});
