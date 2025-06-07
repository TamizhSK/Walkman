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
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Walkman Password Reset</title>
  <style>
    /* Reset styles for consistent rendering */
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f5f5f5;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    
    /* Main container */
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    
    /* Logo section - keeping original alignment */
    .logo-container {
      background-color: #000;
      padding: 24px 0;
      text-align: center;
    }
    .logo {
      font-size: 36px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: -0.5px;
      line-height: 1.2;
    }
    .logo-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #f59e0b;
      border-radius: 70%;
      margin-left: 1px;
    }
    
    /* Content area */
    .content {
      padding: 40px;
      background-color: #ffffff;
      color: #333333;
    }
    
    /* Typography improvements */
    .content h1 {
      font-size: 24px;
      margin-top: 0;
      margin-bottom: 20px;
      color: #333333;
      line-height: 1.3;
    }
    
    .content p {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 20px;
      color: #555555;
    }
    
    /* Button styling with better accessibility */
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    
    .reset-button {
      display: inline-block;
      padding: 16px 32px;
      background-color: #f59e0b;
      color: #000000 !important;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
      min-width: 160px;
    }
    
    .reset-button:hover {
      background-color: #d97706;
    }
    
    /* URL styling */
    .url-section {
      margin: 24px 0;
      padding: 16px;
      background-color: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #e9ecef;
    }
    
    .url-label {
      font-size: 14px;
      margin-bottom: 8px;
      color: #666666;
      font-weight: 500;
    }
    
    .url {
      word-break: break-all;
      font-size: 14px;
      color: #f59e0b;
      text-decoration: none;
      font-family: Monaco, Consolas, 'Courier New', monospace;
      display: block;
      padding: 8px;
      background-color: #ffffff;
      border: 1px solid #dee2e6;
      border-radius: 4px;
    }
    
    .disclaimer {
      font-size: 14px;
      color: #999999;
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #e9ecef;
    }
    
    /* Footer */
    .footer {
      padding: 24px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      background-color: #f8f9fa;
      border-top: 1px solid #e9ecef;
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #121212;
      }
      .container {
        background-color: #1e1e1e;
      }
      .logo-container {
        background-color: #000000;
      }
      .content {
        background-color: #1e1e1e;
        color: #ffffff;
      }
      .content h1 {
        color: #ffffff;
      }
      .content p {
        color: #cccccc;
      }
      .url-section {
        background-color: #2a2a2a;
        border-color: #404040;
      }
      .url {
        background-color: #1a1a1a;
        border-color: #404040;
        color: #f59e0b;
      }
      .disclaimer {
        border-top-color: #404040;
      }
      .footer {
        background-color: #1a1a1a;
        border-top-color: #404040;
      }
    }
    
    /* Mobile responsiveness */
    @media (max-width: 600px) {
      .container {
        margin: 0;
        width: 100%;
      }
      .content {
        padding: 30px 20px;
      }
      .logo {
        font-size: 32px;
      }
      .content h1 {
        font-size: 22px;
      }
      .content p {
        font-size: 15px;
      }
      .reset-button {
        padding: 14px 24px;
        font-size: 15px;
        min-width: 140px;
      }
      .url {
        font-size: 12px;
        padding: 6px;
      }
    }
    
    /* Extra small screens */
    @media (max-width: 400px) {
      .content {
        padding: 24px 16px;
      }
      .logo {
        font-size: 28px;
      }
      .reset-button {
        padding: 12px 20px;
        font-size: 14px;
        width: 100%;
        max-width: 280px;
      }
    }
    
    /* High DPI displays */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      .logo-dot {
        width: 6px;
        height: 6px;
      }
    }
    
    /* Email client specific fixes */
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Logo Header -->
    <div class="logo-container">
      <div class="logo">
        Walkman<span class="logo-dot"></span>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content">
      <h1>Password Reset</h1>
      <p>
        You requested to reset your Walkman password. Click the button below to set a new password. This link will expire in 1 hour.
      </p>
      
      <div class="button-container">
        <a href="${resetUrl}" class="reset-button">Reset Password</a>
      </div>
      
      <div class="url-section">
        <div class="url-label">Or copy and paste this URL:</div>
        <a href="${resetUrl}" class="url">${resetUrl}</a>
      </div>
      
      <p class="disclaimer">
        If you didn't request this password reset, please ignore this email. Your account remains secure.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      © ${new Date().getFullYear()} Walkman. All rights reserved.
    </div>
  </div>
</body>
</html>`
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