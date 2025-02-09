import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";
import {createEmployee} from "../../_mocks/createEmployee.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import Employee, {IEmployee} from "../../../../src/model/IEmployee.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {getEmployeeById} from "../../../../src/controllers/employee/getEmployeeById.ts";

describe("getEmployeeById", () => {
   beforeAll(() => beforeAllSetup());
    afterAll(() => afterAllSetup());

    it("should return an employee by id", async () => {
        const id = "3".padStart(24, "0");
        const mockEmployeeResponse = createEmployee({
            id: id,
        });

        const findOneStub = stub(Employee, "findOne", function () {
            return createQueryMock(mockEmployeeResponse, Employee);
        });

        const mockContext = createMockContext(
            mockEmployeeResponse,
            id,
        );

        const response = await getEmployeeById(mockContext);

        expect(findOneStub.calls.length).toBe(1);
        expect(response._status).toBe(200);
        expect(response._data).toEqual({result: mockEmployeeResponse});

        findOneStub.restore();
    });

    it("should return 400 if no id is provided", async () => {
        const mockContext = createMockContext(
            {},
            null,
        );

        const response = await getEmployeeById(mockContext);

        expect(response._status).toBe(400);
        expect(response._data).toEqual({message: "ID is required"});
    });

    it("should return 500 if an error occurs", async () => {
        const findOneStub = stub(Employee, "findOne", function () {
            throw new Error("Error occurred");
        });

        const mockContext = createMockContext(
            {},
            "1".padStart(24, "0"),
        );

        const response = await getEmployeeById(mockContext);

        expect(findOneStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({error: "Error occurred"});

        findOneStub.restore();
    });
});