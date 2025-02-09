import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import {createEmployee} from "../../_mocks/createEmployee.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {createEmployeeMongooseModel} from "../../_mocks/createEmployeeMongooseModel.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import Employee from "../../../../src/model/IEmployee.ts";
import {createDeleteQueryResultMock} from "../../_mocks/createDeleteQueryResultMock.ts";
import {deleteEmployeeById} from "../../../../src/controllers/employee/deleteEmployeeById.ts";

describe("deleteEmployeeById", () => {
   beforeAll(() => beforeAllSetup());
    afterAll(() => afterAllSetup());

    it("should delete employee by id and return 200", async () => {
        const employeeId = "4321";
        const mockEmployee = createEmployee({
            id: employeeId,
        });
        const employeeMongooseModel = createEmployeeMongooseModel(mockEmployee, employeeId);
        const mockContext = createMockContext(
            {},
            employeeId,
        );
        const deleteOneStub = stub(
            Employee,
            "deleteOne",
            function () {
                return createDeleteQueryResultMock({
                    acknowledged: true,
                    deletedCount: 1,
                });
            },
        );

        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                return createQueryMock(employeeMongooseModel, Employee);
            },
        );

        const response = await deleteEmployeeById(mockContext);
        const responseJson = response._data as unknown as { message: string };

        expect(deleteOneStub.calls.length).toBe(1);
        expect(findByIdStub.calls.length).toBe(1);
        expect(response._status).toBe(200);
        expect(responseJson.message).toBe("Employee deleted");

        deleteOneStub.restore();
        findByIdStub.restore();
    });

    it("should return 400 if no id is provided", async () => {
        const mockContext = createMockContext(
            {},
            "",
        );

        const response = await deleteEmployeeById(mockContext);
        const responseJson = response._data as unknown as { message: string };

        expect(response._status).toBe(400);
        expect(responseJson.message).toBe("ID is required");
    });

    it("should return 404 if employee not found", async () => {
        const employeeId = "4321";
        const mockContext = createMockContext(
            {},
            employeeId,
        );
        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                return createQueryMock(null, Employee);
            },
        );

        const response = await deleteEmployeeById(mockContext);
        const responseJson = response._data as unknown as { message: string };

        expect(findByIdStub.calls.length).toBe(1);
        expect(response._status).toBe(404);
        expect(responseJson.message).toBe("Employee not found");

        findByIdStub.restore();
    });

    it("should return 500 if error", async () => {
        const employeeId = "4322";
        const mockEmployee = createEmployee({
            id: employeeId,
        });
        const employeeMongooseModel = createEmployeeMongooseModel(mockEmployee, employeeId);
        const mockContext = createMockContext(
            {},
            employeeId,
        );

        const findByIdStub = stub(
            Employee,
            "findById",
            function () {
                return createQueryMock(employeeMongooseModel, Employee);
            },
        );

        const deleteOneStub = stub(
            Employee,
            "deleteOne",
            function () {
                throw new Error("Error deleting employee");
            },
        );

        const response = await deleteEmployeeById(mockContext);
        const responseJson = response._data as unknown as { error: string };

        expect(findByIdStub.calls.length).toBe(1);
        expect(deleteOneStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(responseJson.error).toBe("Error deleting employee");

        findByIdStub.restore();
        deleteOneStub.restore();
    });
});