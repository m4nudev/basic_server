
import { Router } from "express";
import { createUser, deleteUser, fetchUser, showUser, updateUser } from "../controller/userController";

const userRouter = Router();


userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.get("/:id", showUser);
userRouter.get("/", fetchUser);
userRouter.delete("/:id", deleteUser);



export default userRouter;