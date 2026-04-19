import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";

const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.development";
dotenv.config({ path: path.resolve(envFile) });

import errorHandler from "./middleware/error-handler.js";
import authRoutes from "./routes/auth.routes.js";
import personsRoutes from "./routes/persons.routes.js";

const app = express();
const port = process.env.APP_PORT || 8080;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://localhost:5173"],
  credentials: true
}));
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoutes);
app.use("/api/persons", personsRoutes);

app.get("/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
})