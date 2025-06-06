"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/",
        redirect: false,
      });

      if (result?.error) {
        setErrors((prev) => ({
          ...prev,
          general: "Authentication failed. Please try again.",
        }));
      } else {
        router.push("/");
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        general: "Something went wrong. Please try again.",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };
    let isValid = true;

    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernamePattern.test(formData.username)) {
      newErrors.username =
        "Username must be 4–20 characters and only contain letters, numbers, and underscores.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:,.?]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include letters, numbers, and special characters.";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors((prev) => ({ ...prev, general: data.error }));
        } else {
          const result = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
          });

          if (result?.error) {
            router.push("/login");
          } else {
            router.push("/");
          }
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          general: "Something went wrong. Please try again.",
        }));
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-brown/50" />
      </div>
      {/* Form section */}
      <div className="relative z-10 flex flex-col justify-center p-6 md:p-10 bg-brown/50 lg:bg-transparent">
        <div className="mx-auto w-full max-w-sm space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center gap-2 font-medium text-white">
              <span className="text-2xl font-bold">
                Walkman<span className="inline-block w-2 h-2 ml-1 bg-amber-400 rounded-full" />
              </span>
            </Link>
          </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Card className="bg-white/95 lg:bg-background border-0 lg:border shadow-2xl lg:shadow-sm">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Enter your details or continue with social
                </p>
              </CardHeader>

              <CardContent className="flex flex-col gap-6">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                {/* Social Auth */}
                <div className="grid gap-3">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                    type="button"
                  >
                    <FcGoogle size={20} /> Continue with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                    onClick={() => handleSocialLogin("apple")}
                    disabled={isLoading}
                    type="button"
                  >
                    <FaApple size={20} /> Continue with Apple
                  </Button>
                </div>

                <div className="relative text-center text-sm">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or sign up with email
                  </span>
                  <div className="absolute left-0 right-0 top-1/2 border-t" />
                </div>

                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      required
                      value={formData.username}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Sign Up"}
                  </Button>

                  <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4 text-orange-500 hover:text-orange-400"
                    >
                      Log in
                    </Link>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Background image for larger screens */}

      <div className="relative hidden lg:block">
        <img
          src="https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg"
          alt="Signup background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}