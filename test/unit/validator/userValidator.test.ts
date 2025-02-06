import {userValidator} from "../../../src/validators/userValidator.ts";
import {assertEquals} from "jsr:@std/assert";
import {createUser} from "../_mocks/createUser.ts";

Deno.test( "given a data object should parse it with the user schema and return true", () =>{
    const userData = createUser();

    const result = userValidator(userData);

    assertEquals(result, true);
});

Deno.test( "given a data object with missing authId should return false", () =>{
    const userData = createUser({ authId: "" });

    const result = userValidator(userData);

    assertEquals(result, false);
});

Deno.test( "given a data object with missing roles should return false", () =>{
    const userData = createUser({ roles: [] });

    const result = userValidator(userData);

    assertEquals(result, false);
});