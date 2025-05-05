import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    console.log("Signup received:", { name, email, password: !!password });
    if (!name || !email || !password) {
      console.log("Missing fields");
      return NextResponse.json({ error: "Name, email and password are required." }, { status: 400 });
    }
    const client = await clientPromise;
    const db = client.db();
    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      console.log("User already exists:", email);
      return NextResponse.json({ error: "User already exists." }, { status: 400 });
    }
    const hashed = await hash(password, 10);
    await db.collection("users").insertOne({ name, email, password: hashed });
    console.log("User created:", email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : JSON.stringify(error) }, { status: 500 });
  }
} 