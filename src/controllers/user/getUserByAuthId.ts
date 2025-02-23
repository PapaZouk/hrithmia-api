import {Context, TypedResponse} from 'hono';
import {connectDb} from "../../database/connectDb.ts";
import User from '../../model/IUser.ts';

export const getUserByAuthId = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();

        const authId = c.req.param('id');
        console.log("Fetching user with authId:", authId);

        const result = await User.findOne({ authId: authId});

        if (!result) {
            return c.json({ error: 'No user found' }, 404);
        }

        return c.json({result}, 200);
    } catch (error) {
        console.error(`Error fetching user with ID: ${c.req.param('id')}:`, (error as Error).message);
        return c.json({ error: (error as Error).message }, 500);
    }
}