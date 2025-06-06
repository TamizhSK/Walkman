"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
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
        redirect: false 
      });
      
      if (result?.error) {
        setErrors(prev => ({ ...prev, general: "Authentication failed. Please try again." }));
      } else {
        router.push("/");
      }
    } catch (error) {
      setErrors(prev => ({ ...prev, general: "Something went wrong. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    let isValid = true;
    const newErrors = {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernamePattern.test(formData.username)) {
      newErrors.username = "Username must be 4-20 characters long and can only contain letters, numbers, and underscores.";
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:,.?]{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long and include letters, numbers, and special characters.";
      isValid = false;
    }

    // Confirm password validation
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
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setErrors(prev => ({ ...prev, general: data.error }));
        } else {
          // Auto-login after successful signup
          const result = await signIn("credentials", {
            username: formData.username,
            password: formData.password,
            redirect: false,
          });

          if (result?.error) {
            // If auto-login fails, redirect to login page
            router.push("/login");
          } else {
            router.push("/");
          }
        }
      } catch (error) {
        setErrors(prev => ({ ...prev, general: "Something went wrong. Please try again." }));
      }
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black/90 border-gray-800 text-white">
        <CardHeader className="text-center">
          <div className="mb-2">
            <span className="text-2xl font-bold">
              Walkman<span className="inline-block w-2 h-2 ml-1 bg-orange-500 rounded-full"></span>
            </span>
            <p className="text-gray-400 mt-1">Endless Music, Endless Fun!</p>
          </div>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
        </CardHeader>

        <div className="px-6">
          <Separator className="bg-gray-700" />
        </div>

        <CardContent className="pt-6">
          {/* Error Message */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-900/20 border border-red-800 rounded-md">
              <p className="text-sm text-red-400">{errors.general}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-blue-900/20 text-white"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <i className="fab fa-facebook-f"></i>
              Continue with Facebook
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-gray-800/60 text-white"
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
            >
              <i className="fab fa-apple"></i>
              Continue with Apple
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-red-900/20 text-white"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <i className="fab fa-google"></i>
              Continue with Google
            </Button>
          </div>

          {/* OR Separator */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="bg-gray-700 w-full" />
            </div>
            <div className="relative flex items-center justify-center">
              <span className="bg-gray-900 px-2 text-gray-400">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
                disabled={isLoading}
              />
              {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
                disabled={isLoading}
              />
              {errors.username && <p className="mt-2 text-sm text-red-400">{errors.username}</p>}
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
                disabled={isLoading}
              />
              {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
                disabled={isLoading}
              />
              {errors.password && <p className="mt-2 text-sm text-red-400">{errors.password}</p>}
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="mt-2 text-sm text-red-400">{errors.confirmPassword}</p>}
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 hover:text-orange-400">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}