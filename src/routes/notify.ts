// src/routes/notify.ts
import express from "express";
import Notification from "../models/Notification";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message } = req.body;
  const notification = new Notification({ message });
  await notification.save();

  console.log("New Notification:", message);
  res.status(201).send("Notification saved.");
});

router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ timestamp: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

export default router;
