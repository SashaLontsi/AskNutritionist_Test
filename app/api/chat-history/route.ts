import type { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import ChatConversation from "@/lib/models/ChatConversation";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  await clientPromise;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  const conversations = await ChatConversation.find({ userId: session.user.email })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await ChatConversation.countDocuments({ userId: session.user.email });

  return Response.json({
    conversations,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  await clientPromise;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, messages } = body;

  const conversation = await ChatConversation.create({
    userId: session.user.email,
    title,
    messages,
  });

  return Response.json(conversation);
}

export async function DELETE(req: NextRequest) {
  await clientPromise;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return Response.json({ error: "Missing conversation id" }, { status: 400 });
  }

  const deleted = await ChatConversation.findOneAndDelete({ _id: id, userId: session.user.email });
  if (!deleted) {
    return Response.json({ error: "Conversation not found or not authorized" }, { status: 404 });
  }

  return Response.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  await clientPromise;
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { id, title, messageId, newContent } = body;

  if (id && title) {
    // Edit conversation title (existing logic)
    const updated = await ChatConversation.findOneAndUpdate(
      { _id: id, userId: session.user.email },
      { title },
      { new: true }
    );
    if (!updated) {
      return Response.json({ error: "Conversation not found or not authorized" }, { status: 404 });
    }
    return Response.json(updated);
  }

  if (id && messageId && typeof newContent === "string") {
    // Edit a message in the conversation
    const conversation = await ChatConversation.findOne({ _id: id, userId: session.user.email });
    if (!conversation) {
      return Response.json({ error: "Conversation not found or not authorized" }, { status: 404 });
    }
    const msg = conversation.messages.id(messageId);
    if (!msg) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }
    if (msg.role !== "user") {
      return Response.json({ error: "You can only edit your own messages." }, { status: 403 });
    }
    // Add previous content to edit history
    msg.editHistory = msg.editHistory || [];
    msg.editHistory.push({
      content: msg.content,
      editedAt: new Date(),
    });
    msg.content = newContent;
    await conversation.save();
    return Response.json({ success: true, conversation });
  }

  return Response.json({ error: "Missing required fields" }, { status: 400 });
} 