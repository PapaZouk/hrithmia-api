import { Context } from "hono";
import { connectDb } from "../../database/connectDb.ts";
import { userValidator } from "../../validators/userValidator.ts";
import mapResponseToUser from "../../mapper/mapResponseToUser.ts";

export const addUser = async (
  c: Context,
  mapper = mapResponseToUser,
  isValidUserData = userValidator,
) => {
  console.log("Requesting to add user", c.req.json());
  try {
    await connectDb();

    const data = await c.req.json();
    console.log("Request data:", data);

    if (!isValidUserData(data)) {
      return c.json({ error: "Invalid data" }, 400);
    }

    const user = mapper(data);

    const result = await user.save();

    return c.json({ message: "User saved", userId: result._id }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};
