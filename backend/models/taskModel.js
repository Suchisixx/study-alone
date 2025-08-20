// backend/models/taskModel.js

// File model sẽ làm nhiệm vụ giao tiếp với DB để xử lý dữ liệu 
import db from "../config/db.js";

// Lấy tất cả tasks
export const getTasks = async () => {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
};

// Lấy tất cả tasks hôm nay: WHERE date = CURDATE()
export const getTasksByDate = async () => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE date = CURDATE();");
    return rows;
};

export const addTask = async (task) => {
    const { name, date, completed, color } = task;
    const currentDate = date || new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const completedVal = completed ? 1 : 0;

    const [result] = await db.query(
        "INSERT INTO tasks (name, date, completed, color) VALUES (?, ?, ?, ?)",
        [name.trim(), currentDate, completedVal, color]
    );

    // Cách 1: trả về từ input (đủ để UI hiển thị ngay)
    // return { id: result.insertId, name: name.trim(), date: currentDate, completed: completedVal, color };

    // Cách 2: SELECT lại đúng record vừa thêm để chắc chắn
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    return rows[0];
};

export const deleteTask = async (id) => {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    // có thể kiểm tra not found nếu cần: result.affectedRows === 0
    return result.affectedRows > 0;
};

export const toggleComplete = async (id, completed) => {
    const val = completed ? 1 : 0;
    await db.query("UPDATE tasks SET completed = ? WHERE id = ?", [val, id]);
    // trả về record sau cập nhật 
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
};
