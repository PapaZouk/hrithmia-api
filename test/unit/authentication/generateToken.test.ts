import { stub } from "https://deno.land/std/testing/mock.ts";
import {generateToken} from "../../../src/authentication/generateToken.ts";
import {assertEquals} from "https://deno.land/std/assert/assert_equals.ts";

Deno.test("generateToken should return a string", async () => {
    const secretKeyStub = stub(Deno.env, "get", (key: string) => {
        if (key === "JWT_SECRET_KEY") {
            return "secret";
        }
        return undefined;
    });

    class MockTextEncoder extends TextEncoder {
        constructor() {
            super();
        }

        override encode(input: string): Uint8Array {
            return new Uint8Array([1, 2, 3, 4]);
        }
    }

    const textEncoderStub = stub(globalThis, "TextEncoder", () => new MockTextEncoder());

    try {
        const token = await generateToken("123");
        assertEquals(typeof token, "string");
    } finally {
        secretKeyStub.restore();
        textEncoderStub.restore();
    }
});