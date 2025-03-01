import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    authId: string;
    roles: string[];
    otpSecret?: string;
    otpEnabled?: boolean;
    otpConfirmed?: boolean;
    otpRecoveryCodes?: string[];
}

const UserSchema: Schema = new Schema({
    authId: { type: String, required: true },
    roles: { type: [String], required: true },
    otpSecret: { type: String, required: false },
    otpEnabled: { type: Boolean, required: false },
    otpConfirmed: { type: Boolean, required: false },
    otpRecoveryCodes: { type: [String], required: false },
});

export default mongoose.model<IUser>("User", UserSchema);