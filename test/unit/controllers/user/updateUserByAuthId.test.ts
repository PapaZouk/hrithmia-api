import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { stub } from "jsr:@std/testing/mock";
import { expect } from "jsr:@std/expect";
import { beforeAllSetup } from "../../utils/beforeAllSetup.ts";
import { afterAllSetup } from "../../utils/afterAllSetup.ts";
import { createUser } from "../../_mocks/createUser.ts";
import { createMockContext } from "../../_mocks/createMockContext.ts";
import {createUserMongooseModel} from "../../_mocks/createUserMongooseModel.ts";
import {createQueryMock} from "../../_mocks/createQueryMock.ts";
import User from "../../../../src/model/IUser.ts";
import {updateUserByAuthId} from "../../../../src/controllers/user/updateUserByAuthId.ts";

describe("updateUserByAuthId", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should update user with the given auth ID", async () => {
    const authId = "1234";
    const mockUser = createUser({ authId });
    const mockContext = createMockContext(mockUser, authId);
    const userMongooseModel = createUserMongooseModel(mockUser, authId);

    const findOneStub = stub(
      User,
      "findOne",
      function () {
        return createQueryMock(
          userMongooseModel,
          User,
        );
      },
    );

    const saveStub = stub(
      User.prototype,
      "save",
      async function () {
        return this;
      },
    );

    const response = await updateUserByAuthId(mockContext);

    expect(response._status).toBe(200);
    expect(response._data).toEqual({ message: "User updated" });

    findOneStub.restore();
    saveStub.restore();
  });

  it("should return 404 if no user found", async () => {
    const authId = "1234";
    const mockUser = createUser({ authId });
    const mockContext = createMockContext(mockUser, authId);

    const findOneStub = stub(
      User,
      "findOne",
      function () {
        return createQueryMock(
          null,
          User,
        );
      },
    );

    const response = await updateUserByAuthId(mockContext);

    expect(response._status).toBe(404);
    expect(response._data).toEqual({ message: "User not found" });

    findOneStub.restore();
  });

  it("should return 400 if no ID is provided", async () => {
    const mockContext = createMockContext({});

    const response = await updateUserByAuthId(mockContext);

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ message: "ID is required" });
  });

  it("should return 500 if error", async () => {
    const authId = "1234";
    const mockUser = createUser({ authId });
    const mockContext = createMockContext(mockUser, authId);
    const userMongooseModel = createUserMongooseModel(mockUser, authId);

    const findOneStub = stub(
      User,
      "findOne",
      function () {
        return createQueryMock(
          userMongooseModel,
          User,
        );
      },
    );

    const saveStub = stub(
      User.prototype,
      "save",
      async function () {
        throw new Error("Error saving user");
      },
    );

    const response = await updateUserByAuthId(mockContext);

    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error saving user" });

    findOneStub.restore();
    saveStub.restore();
  });
});
