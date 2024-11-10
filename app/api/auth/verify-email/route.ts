import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Ungültiger Token" },
        { status: 400 }
      );
    }

    // Finde User mit diesem Token
    const [users] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE verification_token = ?",
      [token]
    );

    if (!users || users.length === 0) {
      return NextResponse.json(
        { error: "Ungültiger Token" },
        { status: 400 }
      );
    }

    // Setze E-Mail als verifiziert
    await db.query(
      `UPDATE users 
       SET email_verified_at = CURRENT_TIMESTAMP, 
           verification_token = NULL 
       WHERE verification_token = ?`,
      [token]
    );

    // Redirect zur Login-Seite
    return NextResponse.redirect(new URL("/login?verified=true", req.url));
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "E-Mail-Verifizierung fehlgeschlagen" },
      { status: 500 }
    );
  }
}
