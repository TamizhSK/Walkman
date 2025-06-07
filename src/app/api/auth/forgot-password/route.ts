import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Configure your email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Always return success to prevent email enumeration attacks
    if (!user) {
      return NextResponse.json(
        { message: "If an account with that email exists, we've sent a password reset link." },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1); // Token expires in 1 hour

    // Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Create new reset token
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        userId: user.id,
        expires: tokenExpiry,
      },
    });

    // Send reset email
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;
    
  const mailOptions = {
  from: process.env.SMTP_FROM || "walkman1970s@gmail.com",
  to: email,
  subject: "Reset Your Walkman Password",
  html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Password</title>
    <style>
      @media (prefers-color-scheme: dark) {
        body {
          background-color: #111111 !important;
          color: #e0e0e0 !important;
        }
        .card {
          background-color: #1e1e1e !important;
          color: #e0e0e0 !important;
        }
        .highlight {
          background-color: #333 !important;
        }
        a.button {
          background-color: #f59e0b !important;
          color: #000000 !important;
        }
      }

      @keyframes slide-in {
        0% {
          transform: translateY(-20px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    </style>
  </head>
  <body style="margin:0; font-family:Arial, sans-serif; background-color:#f4f4f4; color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          <table class="card" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1); animation: slide-in 0.6s ease-out;">
            <tr>
              <td style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 30px; text-align: center;">
                <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0;">
                  Walkman
                  <span style="display:inline-block; width:12px; height:12px; background-color:#fbbf24; border-radius:50%; margin-left:6px; vertical-align:middle;"></span>
                </h1>
                <p style="color: #fff; font-size: 16px; margin-top: 8px;">Vintage Sound. Modern Reset.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px;">
                <h2 style="margin-top: 0; font-size: 22px;">Reset Your Password</h2>
                <p>We received a request to reset your password for your Walkman account. If you didn't request this, you can safely ignore this email.</p>
                <p>Click the button below to reset your password:</p>
                <div style="text-align:center; margin: 28px 0;">
                  <a href="${resetUrl}" class="button" style="background-color: #f59e0b; color: white; padding: 14px 32px; font-weight: bold; border-radius: 6px; text-decoration: none; display:inline-block;">
                    Reset Password
                  </a>
                </div>
                <p>If the button doesn't work, copy and paste this URL into your browser:</p>
                <p class="highlight" style="background: #eee; padding: 12px; border-radius: 6px; font-size: 14px; word-break: break-all;">${resetUrl}</p>
                <p style="margin-top: 24px;"><strong>This link will expire in 1 hour.</strong></p>
                <p>Thank you,<br/>The Walkman Team</p>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; font-size: 12px; color: #888; padding: 20px;">
                <p>If you didn't request a password reset, no action is required.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `,
};



    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "If an account with that email exists, we've sent a password reset link." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}