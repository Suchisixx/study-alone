import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000/api", // sửa nếu server dùng khác
    headers: { "Content-Type": "application/json" },
});

// api của tasks

// Lưu tasks hiện tại

export const getCurrentTasks = async () => {
    const res = await API.get("/tasks");
    return res.data; // array
};

// Lưu tất cả tasks

export const getAllTasks = async () => {
    const res = await API.get("/all-tasks");
    return res.data; // array
};

// Thêm task mới

export const addTask = async (task) => {
    const res = await API.post("/add-task", task);
    return res.data; // new task object from server (có id)
};

// Xóa task

export const deleteTask = async (id) => {
    const res = await API.delete(`/tasks/${id}`);
    return res.data;
};

// Sửa task

export const patchTask = async (id, completed) => {
    const res = await API.patch(`/tasks/${id}`, completed);
    return res.data;
};



