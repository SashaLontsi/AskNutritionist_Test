import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema({
  role: { type: String, enum: ["user", "assistant"], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  editHistory: [
    {
      content: String,
      editedAt: { type: Date, default: Date.now },
    },
  ],
});

const ChatConversationSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default models.ChatConversation || model("ChatConversation", ChatConversationSchema); 