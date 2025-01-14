import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    authId: string;
    roles: string[];
}

const UserSchema: Schema = new Schema({
    authId: { type: String, required: true },
    roles: { type: [String], required: true },
});

export default mongoose.model<IUser>("User", UserSchema);