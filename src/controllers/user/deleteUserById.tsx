import {Context} from "hono";
import {connectDb} from "../../database/connectDb.ts";
import User from '../../model/IUser.ts';

export const deleteUserById = async (c: Context) => {
    console.log("Requesting to delete user");

    try {
        await connectDb();

        const id = c.req.param('id');

        if (!id) {
            return c.json({ message: "ID is required" }, 400);
        }

        await User.findOneAndDelete({ _id: id });

        return c.json({ message: `Deleted user with ID: ${id}` }, 200);
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message }, 500);
    }
}