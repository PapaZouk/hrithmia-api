import { afterAll, beforeAll, describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { stub } from "jsr:@std/testing/mock";
import { healthCheck } from "../../../src/controllers/healthCheck.ts";
import { createMockContext } from "../_mocks/createMockContext.ts";
import mongoose from "mongoose";
import { afterAllSetup } from "../utils/afterAllSetup.ts";
import { setIsConnected } from "../../../src/database/connectDb.ts"; // Import setter

describe("healthCheck", () => {
  beforeAll(() => {
    stub(console, "log");
    stub(console, "error");
  });

  afterAll(() => afterAllSetup());

  it("should return 200 when DB is already connected", async () => {
    setIsConnected(true);

    const mockContext = createMockContext({});
    const response = await healthCheck(mockContext);

    expect(response._status).toBe(200);
  });

  it("should return 200 when DB connects successfully", async () => {
    setIsConnected(false); // Ensure DB is disconnected

    const dbConnectionStub = stub(mongoose, "connect", () => Promise.resolve(mongoose));

    const mockContext = createMockContext({});
    const response = await healthCheck(mockContext);

    expect(response._status).toBe(200);
    expect(dbConnectionStub.calls.length).toBe(1);

    dbConnectionStub.restore();
  });

  it("should return 500 when DB connection fails", async () => {
    setIsConnected(false);

    const dbConnectionStub = stub(
        mongoose,
        "connect",
        () => Promise.reject(new Error("Connection failed")),
    );

    const mockContext = createMockContext({});
    const response = await healthCheck(mockContext);

    expect(response._status).toBe(500);
    expect(response._data).toEqual({
      status: "Unhealthy",
      error: "Connection failed",
    });
    expect(dbConnectionStub.calls.length).toBe(1);

    dbConnectionStub.restore();
  });
});
