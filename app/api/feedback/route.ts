import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const feedbackSchema = z.object({
  message: z.string().min(1).max(1000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message } = feedbackSchema.parse(body);

    // Store feedback in database
    await db.query(
      "INSERT INTO feedback (message, created_at) VALUES (?, NOW())",
      [message]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}