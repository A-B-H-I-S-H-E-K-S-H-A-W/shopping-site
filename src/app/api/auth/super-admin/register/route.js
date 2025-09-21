import { connectDB } from "@/lib/db";
import Encrypt from "@/lib/Encrypt";
import { SuperAdmin } from "@/models/superAdmin.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    const existingSuperAdmin = await SuperAdmin.findOne({ email });

    if (existingSuperAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "SuperAdmin already exists!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await Encrypt(password);

    const newSuperAdmin = new SuperAdmin({
      username,
      email,
      password: hashedPassword,
    });

    await newSuperAdmin.save();

    return NextResponse.json(
      {
        success: true,
        message: "SuperAdmin registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SuperAdmin registration error ::::", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
