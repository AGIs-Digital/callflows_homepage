import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/email";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    
    // Prüfe ob User bereits existiert
    const [existingUsers] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "E-Mail bereits registriert" },
        { status: 400 }
      );
    }

    // Generiere verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Erstelle neuen User
    await db.query(
      `INSERT INTO users (email, password, verification_token) 
       VALUES (?, ?, ?)`,
      [email, hashedPassword, verificationToken]
    );

    // Sende Verifikations-E-Mail
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "Registrierung erfolgreich. Bitte überprüfen Sie Ihre E-Mails." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Registrierung fehlgeschlagen" },
      { status: 500 }
    );
  }
}
