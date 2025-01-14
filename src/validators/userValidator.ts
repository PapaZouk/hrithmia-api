import { z } from "npm:zod";

const userSchema = z.object({
    authId: z.string().nonempty("Auth ID is required"),
    roles: z.array(z.string()).nonempty("Roles are required"),
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