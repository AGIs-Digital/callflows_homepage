import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";

// Typen für User und Request Body
interface User {
  id: number;
  email: string;
  password: string;
  email_verified_at: Date | null;
}

interface LoginRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, password } = (await req.json()) as LoginRequest;
    // Hole User aus Datenbank
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT * FROM users WHERE email = ? AND email_verified_at IS NOT NULL",
      [email]
    );
    const [user] = rows;

    if (!user) {
      return NextResponse.json(
        { error: "Ungültige Anmeldedaten" },
        { status: 401 }
      );
    }

    // Prüfe Passwort
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Ungültige Anmeldedaten" },
        { status: 401 }
      );
    }

    // Erstelle JWT Token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!, // Verwendet den gespeicherten Secret
      { expiresIn: "24h" }
    );

    const response = NextResponse.json(
      { message: "Login erfolgreich" },
      { status: 200 }
    );

    // Setze Cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 Stunden
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Interner Server-Fehler" },
      { status: 500 }
    );
  }
}
