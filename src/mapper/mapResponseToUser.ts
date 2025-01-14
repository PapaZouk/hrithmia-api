import User, { IUser } from "../model/IUser.ts";

export default function mapResponseToUser(data: IUser) {
    return new User({
        authId: data.authId,
        roles: data.roles.map((role) => role),
    });
}