// src/models/Notification.ts
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Notification", NotificationSchema);
