import {create, getNumericDate} from "https://deno.land/x/djwt@v2.4/mod.ts";
import {assertEquals} from "https://deno.land/std/testing/asserts.ts";
import {stub} from "https://deno.land/std/testing/mock.ts";
import {verifyToken} from "../../../src/authentication/verifyToken.ts";

Deno.test("verifyToken should validate a JWT", async () => {
    const secretKeyStub = stub(Deno.env, "get", (key: string) => {
        if (key === "JWT_SECRET_KEY") {
            return "mock-secret-key";
        }
        return undefined;
    });

    try {
        const keyBuf = new TextEncoder().encode("mock-secret-key");
        const key = await crypto.subtle.importKey(
            "raw",
            keyBuf,
            { name: "HMAC", hash: { name: "SHA-256" } },
            false,
            ["sign", "verify"]
        );

        const payload = { iss: "test", exp: getNumericDate(60) }; // Token expires in 60 seconds
        const token = await create({ alg: "HS256", typ: "JWT" }, payload, key);

        const result = await verifyToken(token);
        assertEquals(result, payload);
    } finally {
        secretKeyStub.restore();
    }
});
