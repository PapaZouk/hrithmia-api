import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import {Context, TypedResponse} from "hono";
import User, {IUser} from "../../../../src/model/IUser.ts";
import {createUser} from "../../_mocks/createUser.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import {getUserByAuthId} from "../../../../src/controllers/user/getUserByAuthId.ts";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";

describe("getUserByAuthId", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should return a user by authId", async () => {
    const mockUserResponse = createUser({ authId: "3" });

    const findOneStub = stub(User, "findOne", function () {
      return createQueryMock(mockUserResponse, User);
    });

    const mockContext = {
      req: {
        param: (name: string) => "3",
      },
      json: (data: any, status: number) => {
        return {
          _data: data,
          _status: status,
          _format: "json",
        } as TypedResponse;
      },
    } as unknown as Context;

    const response = await getUserByAuthId(mockContext);
    const responseJson = await response._data as { result: IUser };

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(200);
    expect(response._data).toEqual({ result: mockUserResponse });
    expect(responseJson.result.authId).toBe("3");

    findOneStub.restore();
  });

  it("should return 404 if no user found", async () => {
    const findOneStub = stub(User, "findOne", function () {
      return createQueryMock(null, User);
    });

    const mockContext = {
      req: {
        param: (name: string) => "4",
      },
      json: (data: any, status: number) => {
        return {
          _data: data,
          _status: status,
          _format: "json",
        } as TypedResponse;
      },
    } as unknown as Context;

    const response = await getUserByAuthId(mockContext);

    expect(findOneStub.calls.length).toBe(1);
    expect(response._status).toBe(404);
    expect(response._data).toEqual({ error: "No user found" });

    findOneStub.restore();
  });

    it("should return 500 if error occurs", async () => {
        const findOneStub = stub(User, "findOne", () => {
        throw new Error("Error occurred");
        });

        const mockContext = {
        req: {
            param: (name: string) => "5",
        },
        json: (data: any, status: number) => {
            return {
            _data: data,
            _status: status,
            _format: "json",
            } as TypedResponse;
        },
        } as unknown as Context;

        const response = await getUserByAuthId(mockContext);

        expect(findOneStub.calls.length).toBe(1);
        expect(response._status).toBe(500);
        expect(response._data).toEqual({ error: "Error occurred" });

        findOneStub.restore();
    });
});
