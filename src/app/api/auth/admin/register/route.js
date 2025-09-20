import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
  } catch (error) {
    return {
      success: false,
      message: "Internal Server Error",
      statusCode: 500,
    };
  }
}
