import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Replace this with real user lookup and password verification
  const isValid =
    email === "admin@example.com" && password === "password";

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ success: true });

  // This cookie is what your dashboard guard will check
  res.cookies.set("auth_token", "dummy-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return res;
}
