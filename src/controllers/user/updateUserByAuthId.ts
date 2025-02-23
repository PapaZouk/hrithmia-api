import User, { IUser } from "../../model/IUser.ts";
import { Context, TypedResponse } from "hono";
import { connectDb } from "../../database/connectDb.ts";

export const updateUserByAuthId = async (
  c: Context,
): Promise<TypedResponse> => {
  console.log("Requesting to update user");

  try {
    await connectDb();

    const id = c.req.param("id");

    if (!id) {
      return c.json({ message: "ID is required" }, 400);
    }

    const data = await c.req.json();

    if (!data) {
      return c.json({ message: "User data is required" }, 400);
    }

    const user: IUser | null = await User.findOne({ authId: id });

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    console.log(`Updating data for user with ID: ${id}`);
    updateUser(user, data);

    await user.save();

    return c.json({ message: "User updated" }, 200);
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error: (error as Error).message }, 500);
  }
};

const updateUser = (user: IUser, data: any) => {
  if (data) {
    const updateRoles = [...data.roles, ...user.roles];
    user.roles = [...new Set(updateRoles)];
  }
};
