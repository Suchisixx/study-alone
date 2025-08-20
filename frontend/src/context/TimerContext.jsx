// TimeContext.jsx

import { createContext, useState, useEffect } from "react";

export const TimeContext = createContext();

export const TimeProvider = ({ children }) => {
    const [isOn, setIsOn] = useState(false);
    const [selfTimer, setSelfTimer] = useState(0);
    const [SelfTime, setSelfTime] = useState(false);
    const [studytime, setStudytime] = useState(25 * 60);
    const [timeLeft, setTimeLeft] = useState(25 * 60);

    // Hàm gọi API lưu studytime
    const saveStudytime = async ({ type, duration, started_at, ended_at }) => {
        try {
            const res = await addStudytime({
                type,
                duration,
                started_at,
                ended_at
            });
            console.log("Lưu giờ học thành công:", res);
            return res;
        } catch (err) {
            console.error("Lỗi khi lưu:", err);
        }
    };

    // Đồng hồ đếm ngược (Pomodoro cố định)
    useEffect(() => {
        let timer;

        if (!SelfTime && isOn && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 950);
        }

        if (!SelfTime && timeLeft === 0 && isOn) {
            alert("🎉 Hết giờ học rùi, nghỉ 5 phút nhaa!");
            setIsOn(false);

            // khi hết giờ thì lưu record vào DB
            saveStudytime({
                type: "fixed",
                duration: studytime,
                started_at: new Date(Date.now() - studytime * 1000).toISOString(),
                ended_at: new Date().toISOString()
            });
        }

        return () => clearInterval(timer);
    }, [isOn, SelfTime, timeLeft]);

    // Đồng hồ tự đếm (tự stop khi user nhấn)
    useEffect(() => {
        let timer;

        if (SelfTime && isOn) {
            timer = setInterval(() => {
                setSelfTimer((prev) => prev + 1);
            }, 950);
        }

        return () => clearInterval(timer);
    }, [isOn, SelfTime]);

    return (
        <TimeContext.Provider
            value={{
                timeLeft, setTimeLeft,
                isOn, setIsOn,
                selfTimer, setSelfTimer,
                SelfTime, setSelfTime,
                studytime, setStudytime,
                saveStudytime // cho phép gọi thủ công từ FE
            }}
        >
            {children}
        </TimeContext.Provider>
    );
};
