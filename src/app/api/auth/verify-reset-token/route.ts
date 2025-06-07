import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token is required", valid: false },
        { status: 400 }
      );
    }

    // Find the reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid token", valid: false },
        { status: 400 }
      );
    }

    // Check if token has expired
    if (resetToken.expires < new Date()) {
      // Delete expired token
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });

      return NextResponse.json(
        { error: "Token has expired", valid: false },
        { status: 400 }
      );
    }

    // Check if token has been used
    if (resetToken.used) {
      return NextResponse.json(
        { error: "Token has already been used", valid: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { valid: true, message: "Token is valid" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify reset token error:", error);
    return NextResponse.json(
      { error: "Internal server error", valid: false },
      { status: 500 }
    );
  }
}