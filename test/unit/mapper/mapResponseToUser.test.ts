import {assertEquals} from "https://deno.land/std/assert/assert_equals.ts";
import {assertInstanceOf} from "https://deno.land/std/assert/assert_instance_of.ts";
import mapResponseToUser from "../../../src/mapper/mapResponseToUser.ts";
import User, {IUser} from "../../../src/model/IUser.ts";

Deno.test('given data should map to User instance', () => {
    // Arrange
    const data = {
        authId: 'authId',
        roles: ['role1', 'role2'],
    } as IUser;

    // Act
    const user = mapResponseToUser(data);

    // Assert
    assertInstanceOf(user, User);
    assertEquals(user.authId, 'authId');
    assertEquals(user.roles, ['role1', 'role2']);
});