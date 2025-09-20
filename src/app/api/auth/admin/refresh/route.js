import { generateAccessTokenAdmin, verifyRefreshTokenAdmin } from "@/lib/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const refreshToken = req.cookies.get("adminRefreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshTokenAdmin(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid refresh token" },
        { status: 403 }
      );
    }

    const newAccessToken = generateAccessTokenAdmin({
      id: decoded.id,
      role: decoded.role,
    });

    const response = NextResponse.json(
      { success: true, message: "Token refreshed" },
      { status: 200 }
    );

    response.cookies.set("adminToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 60 * 60,
      path: "/admin",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error :::", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
