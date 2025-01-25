
import { Router } from "express";
import { createPost, deletePost, fetchPosts, showPost, updatePost } from "../controller/postController";

const postRouter = Router();


postRouter.post("/", createPost);
postRouter.put("/:id", updatePost);
postRouter.get("/:id", showPost);
postRouter.get("/", fetchPosts);
postRouter.delete("/:id", deletePost);
postRouter.get("/:id", showPost);




export default postRouter;