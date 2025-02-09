import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createEmployee} from "../../_mocks/createEmployee.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import Employee, {IEmployee} from "../../../../src/model/IEmployee.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {getAllEmployees} from "../../../../src/controllers/employee/getAllEmployees.ts";

describe("getAllEmployees", () => {
   beforeAll(() => beforeAllSetup());
    afterAll(() => afterAllSetup());

    it("should return all employees and 200", async () => {
        const mockEmployee1 = createEmployee({ id: "1" });
        const mockEmployee2 = createEmployee({ id: "2" });
        const mockEmployeesResponse = [mockEmployee1, mockEmployee2];

        const findStub = stub(Employee, "find", function () {
            return createQueryMock(mockEmployeesResponse, Employee);
        });

        const mockContext = createMockContext(mockEmployeesResponse);

        const response = await getAllEmployees(mockContext);
        const responseJson = await response._data as {
            result: IEmployee[];
        };

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(200);
        expect(response._data).toEqual({ result: mockEmployeesResponse });
        expect(responseJson.result.length).toBe(2);
        expect(responseJson.result[0]).toEqual(mockEmployee1);
        expect(responseJson.result[1]).toEqual(mockEmployee2);

        findStub.restore();
    });

    it("should return 404 if no employees found", async () => {
        const findStub = stub(Employee, "find", function () {
            return createQueryMock([], Employee);
        });

        const mockContext = createMockContext([]);

        const response = await getAllEmployees(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(404);
        expect(response._data).toEqual({ error: "No employees found" });

        findStub.restore();
    });

    it("should return 500 if an error occurs", async () => {
        const findStub = stub(Employee, "find", function () {
            throw new Error("Error occurred");
        });

        const mockContext = createMockContext([]);

        const response = await getAllEmployees(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: "Error occurred" });

        findStub.restore();
    });
});