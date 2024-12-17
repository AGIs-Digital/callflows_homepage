import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const isVoiceRoute = request.nextUrl.pathname.startsWith("/voice");

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decoded = verify(token.value, process.env.JWT_SECRET!);
    
    if (isVoiceRoute) {
      // Füge JWT als Query-Parameter hinzu
      const voiceUrl = new URL("https://login.callflows.de");
      voiceUrl.searchParams.set("token", token.value);
      return NextResponse.redirect(voiceUrl);
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/voice/:path*", "/dashboard/:path*"]
};
