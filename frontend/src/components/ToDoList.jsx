import "./ToDoList.css";

function ToDoList({ tasks, DeleteTask, Completed }) {
    const handleDelete = (taskToDelete) => {
        const confirmDelete = confirm("Bạn muốn xóa học phần này thiệt hả ?!");
        if (confirmDelete) {
            DeleteTask(taskToDelete);
        }
    };

    const handleComplete = (task) => {
        const isCompleted = task.completed === 1;
        const message = isCompleted
            ? "Bạn chắc muốn hủy hoàn thành phần học này hong ?!"
            : "Bạn chắc là xong phần học này chưa đó ?!";

        if (confirm(message)) {
            Completed(task.id, isCompleted ? 0 : 1);
        }
    };


    return (
        <div className="task-container">
            {tasks.map(task => (
                <span
                    key={task.id}
                    className="task-item"
                    style={{ backgroundColor: task.color }}
                >
                    <span className={`${task.completed ? "completed" : ""}`}> # &nbsp;{task.name}</span>
                    <button
                        onClick={() => handleComplete(task)}
                        className="complete-btn"
                        title="Đánh dấu hoàn thành"
                    >
                        ✔
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => handleDelete(task)}
                        title="Xoá"
                    >
                        ✖
                    </button>
                </span>
            ))}
        </div>
    );
}

export default ToDoList;
