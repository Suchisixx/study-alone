// backend/controllers/taskController.js
import * as Task from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  try {
    const rows = await Task.getTasks();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getDateTasks = async (req, res) => {
  try {
    const rows = await Task.getTasksByDate();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const task = await Task.addTask(req.body);
    res.status(201).json(task); // trả về task đầy đủ để UI render ngay
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const removeTask = async (req, res) => {
  try {
    const ok = await Task.deleteTask(req.params.id);
    if (!ok) return res.status(404).json({ error: "Task không tồn tại" });
    res.status(204).send();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const Completion = async (req, res) => {
  try {
    const row = await Task.toggleComplete(req.params.id, req.body.completed);
    res.json({ id: row.id, completed: row.completed });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
