import mysql from "mysql2/promise"

// File để config kết nối DB
export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "yourpassword",      // hoặc mật khẩu nếu có
    database: "your-db-name",
});

// db.connect((err) => {
//     if (err) throw err;
//     console.log("✅ Connected to MySQL!");
// });

export default db;

// TABLE tasks(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255),
//     date DATE DEFAULT,
//     completed BOOLEAN DEFAULT false,
//     color VARCHAR(20)
// );

// TABLE studytime(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     type ENUM('fixed', 'manual') NOT NULL,
//     duration INT NOT NULL,
//     ended_at DATETIME NOT NULL,
//     date DATE NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );