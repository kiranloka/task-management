import { Router } from "express";
import { prisma } from "../../prisma";
import { authenticateToken, AuthRequest } from "../user-routes/middleware";
const taskRouter = Router();
taskRouter.use(authenticateToken);
taskRouter.get("/allTasks/userId", async (req: AuthRequest, res) => {
  const userId = req.params;
  const tasks = await prisma.task.findMany({ where: { userId: userId } });
  res.status(200).json(tasks);
});

taskRouter.post("/tasks", async (req: AuthRequest, res) => {
  const { title, userId } = req.body;

  const task = await prisma.task.create({ data: { title, userId: userId } });

  res.status(200).json(task);
});

taskRouter.put("/tasks/:id", async (req: AuthRequest, res) => {
  const taskId = req.params;

  const { title, completed } = req.body;

  const updatedData = await prisma.task.update({
    where: { taskId },
    data: {
      title,
      completed,
    },
  });

  res.status(200).json({ message: "Task updated successfully", updatedData });
});

taskRouter.delete("tasks/:id", async (req, res) => {
  const taskId = req.params;
  const deletedTask = await prisma.task.delete({ where: { taskId } });
  res.status(200).json({ message: "Task deleted successfully", deletedTask });
});

export default taskRouter;
