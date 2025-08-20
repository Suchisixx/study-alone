import { useEffect, useState } from "react";
import ToDoInput from "../components/ToDoInput";
import ToDoList from "../components/ToDoList";
import { getCurrentTasks, getAllTasks, addTask as apiAddTask, deleteTask as apiDeleteTask, patchTask } from "../api/api";
import { Link } from "react-router-dom";

export default function StudyToDo() {
    const currentDate = new Date().toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const [tasks, setTasks] = useState([]);
    const [allTasks, setAllTasks] = useState([]);

    // Load tasks hôm nay/ tất cả ngày
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const curTasks = await getCurrentTasks();
                const Tasks = await getAllTasks();
                setTasks(curTasks);
                setAllTasks(Tasks);
            } catch (err) {
                console.error("Lỗi khi tải tasks:", err);
            }
        }
        loadTasks();
    }, []);

    const completedCurTasks = tasks.filter((tasks) => tasks.completed).length;
    const UnCompletedCurTasks = tasks.length;
    // const completedAllTasks = allTasks.filter((tasks) => tasks.completed).length;
    // const UnCompletedAllTasks = allTasks.length;

    // Thêm task
    const addTask = async (task) => {
        try {
            const newTask = await apiAddTask(task);
            setTasks((prev) => [...prev, newTask]);
        } catch (err) {
            console.error("Lỗi khi thêm task:", err);
        }
    };

    // Xoá task
    const deleteTask = async ({ id }) => {
        try {
            await apiDeleteTask(id);
            setTasks((prev) => prev.filter((task) => task.id !== id));
        } catch (err) {
            console.error("Lỗi khi xóa task:", err);
        }
    };

    // Toggle hoàn thành
    const toggleComplete = async (id, completed) => {
        try {
            await patchTask(id, { completed });
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === id ? { ...task, completed } : task
                )
            );
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
        }
    };

    return (
        <>
            <div>
                <h2 style={{ fontSize: "40px" }}>{currentDate}</h2>
                <span>
                    {/* <p> Tổng thời gian học: {formatTime(totalStudySeconds)} <br /> */}
                    <p>
                        Phần học đã hoàn thành hôm nay: {completedCurTasks}/{UnCompletedCurTasks}<br />
                        {/* Tổng Công việc đã hoàn thành: {completedAllTasks}/{UnCompletedAllTasks} */}
                    </p>
                </span>
                <ToDoInput onAddTask={addTask} />
            </div >
            <div>
                <ToDoList
                    tasks={tasks}
                    DeleteTask={deleteTask}
                    Completed={toggleComplete}
                    className="task"
                />
            </div >
        </>
    );
}

