import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, name } = await request.json();

    // Validation
    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernamePattern.test(username)) {
      return NextResponse.json(
        { error: "Username must be 4-20 characters long and can only contain letters, numbers, and underscores." },
        { status: 400 }
      );
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:,.?]{8,}$/;
    if (!passwordPattern.test(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long and include letters, numbers, and special characters." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: username },
          { email: email },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}