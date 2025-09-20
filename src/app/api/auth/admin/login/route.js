import { connectDB } from "@/lib/db";
import Decrypt from "@/lib/Decrypt";
import { generateAccessTokenAdmin, generateRefreshTokenAdmin } from "@/lib/jwt";
import { Admin } from "@/models/admin.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin, check provided email",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch = await Decrypt(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          message: "Incorrect Password",
        },
        {
          status: 400,
        }
      );
    }

    const accessToken = generateAccessTokenAdmin({ id: admin._id });
    const refreshToken = generateRefreshTokenAdmin({ id: admin._id });

    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        admin: { id: admin._id, email: admin.email },
      },
      { status: 200 }
    );

    response.cookies.set("adminToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1 * 60 * 60,
      path: "/admin",
    });

    response.cookies.set("adminRefreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/admin",
    });

    return response;
  } catch (error) {
    console.log("Error login admin ::::", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
