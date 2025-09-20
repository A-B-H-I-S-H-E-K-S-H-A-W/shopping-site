import { connectDB } from "@/lib/db";
import Encrypt from "@/lib/Encrypt";
import { Admin } from "@/models/admin.model";
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

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Admin already exists!",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await Encrypt(password);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    return NextResponse.json(
      {
        success: true,
        message: "Admin registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin registration error ::::", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
