import User from "../../../src/model/IUser.ts";
import mongoose from "mongoose";

export function createUserMongooseModel(userRequest: any, authId: string) {
    return new User({
        ...userRequest,
        _id: new mongoose.Types.ObjectId(authId.padStart(24, "0")),
    });
}