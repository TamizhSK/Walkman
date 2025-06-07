'use client';

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      setIsLoading(false);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else {
        setIsEmailSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Mobile background image */}
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')" }}
        >
          <div className="absolute inset-0 bg-brown/50" />
        </div>

        {/* Success section */}
        <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 md:bg-neutral-950">
          <div className="mx-auto w-full max-w-sm space-y-2">
            {/* Logo */}
            <div className="flex justify-center">
              <Link href="/" className="flex items-center gap-2 font-medium text-white">
                <span className="text-4xl font-extrabold">
                  Walkman<span className="inline-block w-2 h-2 ml-1 bg-amber-400 rounded-full" />
                </span>
              </Link>
            </div>

            {/* Card */}
            <Card className="md:bg-zinc-100 shadow-xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                <p className="text-muted-foreground text-sm">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>Didn't receive the email?</p>
                <p>
                  Check your spam folder or{" "}
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className="text-amber-500 hover:text-orange-500 underline underline-offset-4"
                  >
                    try again
                  </button>
                </p>
              </div>


                <div className="text-center">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Background Image for Desktop */}
        <div className="relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg"
            alt="Forgot password background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Mobile background image */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')" }}
      >
        <div className="absolute inset-0 bg-brown/50" />
      </div>

      {/* Form section */}
      <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 md:bg-neutral-950">
        <div className="mx-auto w-full max-w-sm space-y-2">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 font-medium text-white">
              <span className="text-4xl font-extrabold">
                Walkman<span className="inline-block w-2 h-2 ml-1 bg-amber-400 rounded-full" />
              </span>
            </Link>
          </div>

          {/* Card */}
          <Card className="md:bg-zinc-100 shadow-xl border-0">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-2xl font-bold">Forgot your password?</CardTitle>
              <p className="text-muted-foreground text-sm">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your-email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Image for Desktop */}
      <div className="relative hidden lg:block">
        <img
          src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg"
          alt="Forgot password background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* Gradient blend overlay */}
        <div className="absolute left-0 top-0 h-full w-92 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      </div>
    </div>
  );
}