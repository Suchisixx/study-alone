import { useContext, useState } from "react";
import { TimeContext } from "../context/TimerContext";
import "./study-time.css";

export default function Studytime() {
    const {
        timeLeft, setTimeLeft,
        isOn, setIsOn,
        selfTimer, setSelfTimer,
        SelfTime, setSelfTime,
        studytime, setStudytime
    } = useContext(TimeContext);

    const [inputtime, setInputTime] = useState(25);
    const [isEditing, setIsEditing] = useState(false);

    const ChangeTime = () => {
        const minutes = Number(inputtime);
        if (!isNaN(minutes) && minutes > 0) {
            const newTime = minutes * 60;
            setStudytime(newTime);
            setTimeLeft(newTime);
        }
        setIsEditing(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <main className="study-time-container">
            <h1 className="title">Study Alone</h1>

            {isEditing ? (
                <input
                    type="number"
                    min="1"
                    value={inputtime}
                    onChange={(e) => setInputTime(e.target.value)}
                    onBlur={ChangeTime}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") ChangeTime();
                    }}
                    className="time-input"
                    autoFocus
                />
            ) : (
                <div
                    className={`time-display ${isOn || SelfTime ? "disabled" : ""}`}
                    onClick={() => !isOn && !SelfTime && setIsEditing(true)}
                >
                    {SelfTime ? formatTime(selfTimer) : formatTime(timeLeft)}
                </div>
            )}

            <div className="button-group">
                <button
                    className="start-stop-button"
                    onClick={async () => {
                        if (isOn) {
                            setIsOn(false);
                            try {
                                await addStudytime();
                                console.log("Lưu thành công giờ học ùi");
                            } catch (err) {
                                console.error("Lôi khi lưu:", err);
                            }
                        } else {
                            setIsOn(true);
                        }
                    }}
                >
                    {isOn ? "Stop" : "Start"}
                </button>

                <button
                    className="mode-button"
                    onClick={() => {
                        if (!isOn) {
                            setSelfTime((prev) => {
                                const next = !prev;
                                setIsOn(false);
                                if (next) {
                                    setSelfTimer(0);
                                } else {
                                    setTimeLeft(studytime);
                                }
                                return next;
                            });
                        }
                    }}
                >
                    {SelfTime ? "Study Time" : "Self Time"}
                </button>
            </div>

            <button
                className="reset-button"
                onClick={() => {
                    setIsOn(false);
                    SelfTime ? setSelfTimer(0) : setTimeLeft(studytime);
                }}
            >
                Reset
            </button>
        </main>
    );
}