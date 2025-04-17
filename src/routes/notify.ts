import express from "express";
import Notification from "../models/Notification";
import { Client } from "onesignal-node"; // ✅ Fix this import

const router = express.Router();

const oneSignalClient = new Client(
  process.env.YOUR_REST_API_KEY ?? '',
  process.env.YOUR_ONESIGNAL_APP_ID ?? ''
);

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const notification = new Notification({ message });
    await notification.save();

    console.log("✅ New Notification:", message);

    await oneSignalClient.createNotification({
      contents: { en: message },
      included_segments: ["All"],
    });

    res.status(201).send("Notification saved and push sent.");
  } catch (err: any) {
    console.error("❌ Notification Error:", err.message);
    res.status(500).json({ error: "Failed to save or send notification" });
  }
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
