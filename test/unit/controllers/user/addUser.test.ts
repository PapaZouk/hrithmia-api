import {afterAll, beforeAll, describe, it} from "jsr:@std/testing/bdd";
import {stub} from "jsr:@std/testing/mock";
import {expect} from "jsr:@std/expect";
import mongoose from "mongoose";
import {createUser} from "../../_mocks/createUser.ts";
import {addUser} from "../../../../src/controllers/user/addUser.ts";
import User from "../../../../src/model/IUser.ts";
import {createMockContext} from "../../_mocks/createMockContext.ts";
import {createUserMongooseModel} from "../../_mocks/createUserMongooseModel.ts";
import {beforeAllSetup} from "../../utils/beforeAllSetup.ts";
import {afterAllSetup} from "../../utils/afterAllSetup.ts";

describe("addUser", () => {
  beforeAll(() => beforeAllSetup());
  afterAll(() => afterAllSetup());

  it("should add a user", async () => {
    const authId = "5";
    const mockAddUserRequest = createUser({ authId: authId });
    const mockContext = createMockContext(
      mockAddUserRequest,
      authId,
    );
    const mockUser = createUserMongooseModel(mockAddUserRequest, authId);

    const saveStub = stub(
      User.prototype,
      "save",
      async function (this: typeof mockUser) {
        this._id = new mongoose.Types.ObjectId(authId.padStart(24, "0"));
        return this as typeof mockUser;
      },
    );

    const response = await addUser(mockContext, () => mockUser);
    const responseJson = response._data as unknown as {
      message: string;
      userId: string;
    };

    expect(response._status).toBe(200);
    expect(responseJson.message).toBe("User saved");
    expect(responseJson.userId).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(responseJson.userId.toString()).toBe(authId.padStart(24, "0"));

    saveStub.restore();
  });

  it("should return 400 if invalid data", async () => {
    const authId = "6";
    const mockAddUserRequest = createUser({ authId });
    const mockContext = createMockContext(mockAddUserRequest, authId);
    const mockUser = createUserMongooseModel(mockAddUserRequest, authId);

    const response = await addUser(
      mockContext,
      () => mockUser,
      () => false,
    );

    expect(response._status).toBe(400);
    expect(response._data).toEqual({ error: "Invalid data" });
  });

  it("should return 500 if error occurs", async () => {
    const authId = "7";
    const mockAddUserRequest = createUser({ authId });
    const mockContext = createMockContext(mockAddUserRequest, authId);
    const mockUser = createUserMongooseModel(mockAddUserRequest, authId);

    const saveStub = stub(
      User.prototype,
      "save",
      async function (this: typeof mockUser) {
        throw new Error("Error saving user");
      },
    );

    const response = await addUser(mockContext, () => mockUser);

    expect(response._status).toBe(500);
    expect(response._data).toEqual({ error: "Error saving user" });

    saveStub.restore();
  });
});
