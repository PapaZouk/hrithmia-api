import {afterAll, beforeAll, describe, it} from 'jsr:@std/testing/bdd';
import {stub} from "jsr:@std/testing/mock";
import {expect} from 'jsr:@std/expect';
import {Context, TypedResponse} from "hono";
import {createUser} from "../../_mocks/createUser.ts";
import {getAllUsers} from "../../../../src/controllers/user/getAllUsers.ts";
import User, {IUser} from "../../../../src/model/IUser.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";

describe("getAllUsers", () => {
    beforeAll(() => beforeAllSetup());
    afterAll(() => afterAllSetup());

    it("should return all users", async () => {
        const mockUsersResponse = [
            createUser({ authId: '1' }),
            createUser({ authId: '2' }),
        ];

        const findStub = stub(User, 'find', function () {
            return createQueryMock(mockUsersResponse, User);
        });

        const mockContext = {
            json: (data: any, status: number) => {
                return { _data: data, _status: status, _format: 'json' } as TypedResponse;
            },
        } as unknown as Context;

        const response = await getAllUsers(mockContext);
        const responseJson = await response._data as { result: IUser[] };

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(200);
        expect(response._data).toEqual({ result: mockUsersResponse });
        expect(responseJson.result.length).toBe(2);
        expect(responseJson.result[0].authId).toBe('1');
        expect(responseJson.result[1].authId).toBe('2');

        findStub.restore();
    });

    it("should return 404 if no users found", async () => {
        const findStub = stub(User, 'find', function () {
            return createQueryMock([], User);
        });

        const mockContext = {
            json: (data: any, status: number) => {
                return { _data: data, _status: status, _format: 'json' } as TypedResponse;
            },
        } as unknown as Context;

        const response = await getAllUsers(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(404);
        expect(response._data).toEqual({ error: 'No users found' });

        findStub.restore();
    });

    it("should return 500 if error occurs", async () => {
        const findStub = stub(User, 'find', () => {
            throw new Error('Error occurred');
        });

        const mockContext = {
            json: (data: any, status: number) => {
                return { _data: data, _status: status, _format: 'json' } as TypedResponse;
            },
        } as unknown as Context;

        const response = await getAllUsers(mockContext);

        expect(findStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: 'Error occurred' });

        findStub.restore();
    });
});