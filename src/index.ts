import express from "express";
import "dotenv/config";
import userRouter from "./routes/userRoute";
import postRouter from "./routes/postRoute";
import commentRouter from "./routes/commentRoute";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))