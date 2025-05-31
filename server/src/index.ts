import express from "express";
import dotenv from "dotenv";

import userRouter from "./routes/user-routes";
import taskRouter from "./routes/task-routes";
import cors from "cors";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/", taskRouter);
app.use("/api/v1/", userRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
