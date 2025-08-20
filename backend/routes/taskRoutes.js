import express from "express";
import { getAllTasks, getDateTasks, createTask, removeTask, Completion, } from "../controllers/taskController.js";

const router = express.Router();

router.get("/tasks", getDateTasks);
router.get("/all-tasks", getAllTasks);
router.post("/add-task", createTask);
router.delete("/tasks/:id", removeTask);
router.patch("/tasks/:id", Completion);

export default router;
