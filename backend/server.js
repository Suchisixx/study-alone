import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));


