import { Context, TypedResponse } from "hono";
import {connectDb} from "../../database/connectDb.ts";
import User from "../../model/IUser.ts";

export const getAllUsers = async (c: Context): Promise<TypedResponse> => {
    console.log("Requesting to get all users");
    try {
        await connectDb();

        const result = await User.find({});

        if (!result) {
            return c.json({ error: 'No users found' }, 404);
        }

        return c.json({result}, 200);
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error: (error as Error).message}, 500);
    }
}