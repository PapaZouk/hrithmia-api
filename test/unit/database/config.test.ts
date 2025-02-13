import {assertEquals} from "https://deno.land/std/assert/assert_equals.ts";
import {getDbConfig} from "../../../src/database/config.ts";

Deno.test("config.ts should return the correct database configuration for production", () => {
   const originalEnvironment = Deno.env.get;

    Deno.env.get = (key: string) => {
         switch (key) {
              case "ENV":
                return "production";
              case "DB_USERNAME":
                return "username";
              case "DB_PASSWORD":
                return "password";
              case "DB_CLUSTER":
                return "cluster";
              case "DB_PORT":
                return "8000";
              case "DB_APP_NAME":
                return "app";
              default:
                return "";
         }
    };

    const config = getDbConfig();

    assertEquals(config.username, "username");
    assertEquals(config.password, "password");
    assertEquals(config.cluster, "cluster");
    assertEquals(config.port, 8000);
    assertEquals(config.appName, "app");
    assertEquals(config.settings, "retryWrites=true&w=majority");

    Deno.env.get = originalEnvironment;
});

Deno.test("config.ts should return the correct database configuration for development", () => {
    const originalEnvironment = Deno.env.get;

    Deno.env.get = (key: string) => {
        switch (key) {
            case "ENV":
                return "development";
            case "LOCAL_DB_USERNAME":
                return "username";
            case "LOCAL_DB_PASSWORD":
                return "password";
            case "LOCAL_DB_CLUSTER":
                return "cluster";
            case "LOCAL_DB_PORT":
                return "8000";
            case "LOCAL_DB_APP_NAME":
                return "app";
            default:
                return "";
        }
    };

    const config = getDbConfig();

    assertEquals(config.url, 'mongodb://localhost:27017');

    Deno.env.get = originalEnvironment;
});