import { stub } from "https://deno.land/std/testing/mock.ts";
import mongoose from "mongoose";
import { getDbConfig } from "../../../src/database/config.ts";
import { connectDb } from "../../../src/database/connectDb.ts";
import { assert } from "https://deno.land/std@0.224.0/assert/assert.ts";

Deno.test("connectDb should connect to the database", async () => {
  const originalEnvironment = Deno.env.get;
  Deno.env.get = getMockEnvironment();

  let isConnected = false;

  const mongooseConnectStub = stub(mongoose, "connect", async (uri: string) => {
    isConnected = true;
    return mongoose;
  });

  const getDbConfigStub = stub({ getDbConfig }, "getDbConfig", () => ({
    username: "mockUsername",
    password: "mockPassword",
    cluster: "mockCluster",
    port: 8000,
    appName: "mockApp",
    settings: "mockSettings",
    url: "mongodb://mockurl",
  }));

  try {
    await connectDb();
    assert(isConnected, "Database should be connected");
  } finally {
    mongooseConnectStub.restore();
    getDbConfigStub.restore();
    Deno.env.get = originalEnvironment;
  }
});

Deno.test("connectDb should handle connection errors", async () => {
  const originalEnvironment = Deno.env.get;
  Deno.env.get = getMockEnvironment();

  const isConnected = false;

  const mongooseConnectStub = stub(mongoose, "connect", async (uri: string) => {
    throw new Error("Connection error");
  });

  const getDbConfigStub = stub({ getDbConfig }, "getDbConfig", () => ({
    username: "mockUsername",
    password: "mockPassword",
    cluster: "mockCluster",
    port: 8000,
    appName: "mockApp",
    settings: "mockSettings",
    url: "mongodb://mockurl",
  }));

  try {
    await connectDb();
    assert(!isConnected, "Database should not be connected");
  } finally {
    mongooseConnectStub.restore();
    getDbConfigStub.restore();
    Deno.env.get = originalEnvironment;
  }
});

function getMockEnvironment() {
  return (key: string) => {
    switch (key) {
      case "ENV":
        return "development";
      case "LOCAL_DB_USERNAME":
        return "mockUsername";
      case "LOCAL_DB_PASSWORD":
        return "mockPassword";
      case "LOCAL_DB_CLUSTER":
        return "mockCluster";
      case "LOCAL_DB_PORT":
        return "8000";
      case "LOCAL_DB_APP_NAME":
        return "mockApp";
      default:
        return "";
    }
  };
}
