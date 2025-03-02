import {Context, Hono} from "hono";
import {addUser} from "../controllers/user/addUser.ts";
import {getAllUsers} from "../controllers/user/getAllUsers.ts";
import {getUserByAuthId} from "../controllers/user/getUserByAuthId.ts";
import {updateUserByAuthId} from "../controllers/user/updateUserByAuthId.ts";
import {deleteUserById} from "../controllers/user/deleteUserById.tsx";

const userRouter = new Hono();

userRouter.post('/add/', async (c: Context) => await addUser(c));
userRouter.get('all', async (c: Context) => await getAllUsers(c));
userRouter.get(':id', async (c: Context) => await getUserByAuthId(c));
userRouter.put('/update/:id', async (c: Context) => await updateUserByAuthId(c));
userRouter.delete('/remove/:id', async (c: Context) => await deleteUserById(c));

export default userRouter;