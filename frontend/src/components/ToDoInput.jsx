import { useState } from "react";
import "./ToDoInput.css";

const colors = ["#7ADAA5", "#B9375D", "#C5B0CD", "#932F67", "#799EFF", "#5E936C"];

function ToDoInput({ onAddTask }) {
    const [task, setTask] = useState("");

    const randomColor = () => colors[Math.floor(Math.random() * colors.length)];

    const addTask = () => {
        const trimmed = task.trim();
        if (!trimmed) return;

        onAddTask({
            name: trimmed,
            color: randomColor()
        });

        setTask("");
    };

    const handleEnter = (e) => e.key === "Enter" && addTask();

    return (
        <>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Nhập phần học..."
                style={{ fontSize: "17px" }}
            />
            <button onClick={addTask} className="add-button">Add</button>
        </>
    );
}

export default ToDoInput;
