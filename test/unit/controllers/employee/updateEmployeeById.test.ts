import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createEmployee} from "../../_mocks/createEmployee.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import {createEmployeeMongooseModel} from "../../_mocks/createEmployeeMongooseModel.ts";
import Employee from "../../../../src/model/IEmployee.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import { updateEmployeeById } from "../../../../src/controllers/employee/updateEmployeeById.ts";

describe("updateEmployeeById", () => {
    beforeAll(() => beforeAllSetup());
    afterAll(() => afterAllSetup());

    it("should update an employee", async () => {
        const employeeId = "7654".padStart(24, "0");
        const mockEmployee = createEmployee({id: employeeId});
        const mockContext = createMockContext(
            mockEmployee,
            employeeId,
        );
        const employeeMongooseModel = createEmployeeMongooseModel(mockEmployee, employeeId);

        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                return createQueryMock(
                    employeeMongooseModel,
                    Employee,
                );
            },
        );
        const saveStub = stub(
            Employee.prototype,
            "save",
            async function () {
                return this;
            },
        );

        const response = await updateEmployeeById(mockContext);

        expect(response._status).toBe(200);
        expect(response._data).toEqual({message: "Employee updated"});

        findByIdStub.restore();
        saveStub.restore();
    });

    it("should return 404 if no employee found", async () => {
        const employeeId = "7654".padStart(24, "0");
        const mockEmployee = createEmployee({id: employeeId});
        const mockContext = createMockContext(
            mockEmployee,
            employeeId,
        );

        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                return createQueryMock(
                    null,
                    Employee,
                );
            },
        );

        const response = await updateEmployeeById(mockContext);

        expect(response._status).toBe(404);
        expect(response._data).toEqual({message: "Employee not found"});

        findByIdStub.restore();
    });

    it("should return 400 if no id provided", async () => {
        const mockContext = createMockContext({});

        const response = await updateEmployeeById(mockContext);

        expect(response._status).toBe(400);
        expect(response._data).toEqual({message: "ID is required"});
    });

    it("should return 500 if error", async () => {
        const employeeId = "7654".padStart(24, "0");
        const mockEmployee = createEmployee({id: employeeId});
        const mockContext = createMockContext(
            mockEmployee,
            employeeId,
        );

        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                throw new Error("Error finding employee");
            },
        );

        const response = await updateEmployeeById(mockContext);

        expect(response._status).toBe(500);
        expect(response._data).toEqual({error: "Error finding employee"});

        findByIdStub.restore();
    });
});