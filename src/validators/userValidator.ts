import { z } from "npm:zod";

const userSchema = z.object({
    authId: z.string().nonempty("Auth ID is required"),
    roles: z.array(z.string()).nonempty("Roles are required"),
    otpSecret: z.string().optional(),
    otpEnabled: z.boolean().optional(),
    otpConfirmed: z.boolean().optional(),
    otpRecoveryCodes: z.array(z.string()).optional(),
})

export const userValidator = (data: object): boolean => {
    try {
        userSchema.parse(data);
        return true;
    } catch (error) {
        console.error((error as Error).message);
        return false;
    }
}