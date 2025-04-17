import express from "express";
import Notification from "../models/Notification";
import * as OneSignal from 'onesignal-node';  

const router = express.Router();

// Initialize OneSignal Client

const oneSignalClient = new OneSignal.Client(
  process.env.YOUR_REST_API_KEY ?? '',
  process.env.YOUR_ONESIGNAL_APP_ID ?? ''
);

router.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const notification = new Notification({ message });
    await notification.save();

    console.log("✅ New Notification:", message);

    const response = await oneSignalClient.createNotification({
      contents: { en: message },
      included_segments: ["All"], // Sends to all subscribed users
    });

    console.log("📤 OneSignal response:", response);

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
