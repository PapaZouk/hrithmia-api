import { IUser } from "../../../src/model/IUser.ts";

export function createUser(overrides?: Partial<IUser>): object {
  return {
    authId: overrides?.authId ?? "authId",
    roles: overrides?.roles ?? ["roles"],
  };
}
