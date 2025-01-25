
import { Router } from "express";
import { createComment, deleteComment, fetchComments, showComment } from "../controller/commentController";

const commentRouter = Router();


commentRouter.post("/", createComment);
// commentRouter.put("/:id", updateComment);
commentRouter.get("/:id", showComment);
commentRouter.get("/", fetchComments);
commentRouter.delete("/:id", deleteComment);



export default commentRouter;