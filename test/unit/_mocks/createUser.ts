import {IUser} from "../../../src/model/IUser.ts";

export function createUser(overrides?: Partial<IUser>): IUser {
  return {
    authId: overrides?.authId ?? "authId",
    roles: overrides?.roles ?? ["roles"],
  } as IUser;
}
