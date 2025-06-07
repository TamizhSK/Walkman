'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: "",
  });

  useEffect(() => {
    if (!token) {
      setIsTokenValid(false);
      return;
    }

    // Verify token validity
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/auth/verify-reset-token?token=${token}`);
        const data = await response.json();
        setIsTokenValid(response.ok && data.valid);
      } catch {
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = { password: "", confirmPassword: "", general: "" };
    let isValid = true;

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:,.?]{8,}$/;
    if (!passwordPattern.test(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include letters, numbers, and special characters.";
      isValid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors(prev => ({ ...prev, general: data.error || "Failed to reset password." }));
        } else {
          setIsPasswordReset(true);
        }
      } catch {
        setErrors(prev => ({ ...prev, general: "Something went wrong. Please try again." }));
      }
    }

    setIsLoading(false);
  };

  // Success state
  if (isPasswordReset) {
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
                <CardTitle className="text-2xl font-bold">Password reset successful</CardTitle>
                <p className="text-muted-foreground text-sm">
                  Your password has been successfully reset. You can now login with your new password.
                </p>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-amber-500 hover:bg-amber-400"
                >
                  Continue to login
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Background Image for Desktop */}
        <div className="relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg"
            alt="Reset password background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    );
  }

  // Invalid token state
  if (isTokenValid === false) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Mobile background image */}
        <div
          className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')" }}
        >
          <div className="absolute inset-0 bg-brown/50" />
        </div>

        {/* Error section */}
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
                  <AlertCircle className="h-12 w-12 text-red-500" />
                </div>
                <CardTitle className="text-2xl font-bold">Invalid or expired link</CardTitle>
                <p className="text-muted-foreground text-sm">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={() => router.push("/forgot-password")}
                  className="w-full bg-amber-500 hover:bg-amber-400"
                >
                  Request new link
                </Button>
                <div className="text-center">
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                  >
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
            alt="Reset password background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    );
  }

  // Loading state
  if (isTokenValid === null) {
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 md:bg-neutral-950">
          <div className="mx-auto w-full max-w-sm">
            <div className="text-center text-white">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p>Verifying reset link...</p>
            </div>
          </div>
        </div>
        <div className="relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg"
            alt="Reset password background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    );
  }

  // Reset password form
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
              <CardTitle className="text-2xl font-bold">Set new password</CardTitle>
              <p className="text-muted-foreground text-sm">
                Enter your new password below. Make sure it's strong and secure.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={isLoading}
                    required
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset password"}
                </Button>
              </form>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
                >
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