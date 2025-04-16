// src/index.ts
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notifyRouter from "./routes/notify";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 5000;


app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI ?? "").then(() => {
  console.log("MongoDB connected");
});

app.use("/api/notify", notifyRouter);

app.listen(5000, '0.0.0.0', () => {
    console.log("Server running on port 5000");
  });
  
