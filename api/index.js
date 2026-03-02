import express from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js"; 
import authRoutes from "../routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Backend running 🚀" });
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);

export default app;