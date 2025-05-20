
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const newErrors = { username: "", password: "" };

    // Username validation
    const usernamePattern = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernamePattern.test(username)) {
      newErrors.username = "Username must be 4-20 characters long and can only contain letters, numbers, and underscores.";
      isValid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{}|;:,.?])[A-Za-z\d!@#$%^&*()_+\-=[\]{}|;:,.?]{8,}$/;
    if (!passwordPattern.test(password)) {
      newErrors.password = "Password must be at least 8 characters long and include letters, numbers, and special characters.";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // In a real app, you would perform authentication here
      router.push("/");
    }
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
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>

        <div className="px-6">
          <Separator className="bg-gray-700" />
        </div>

        <CardContent className="pt-6">
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-blue-900/20 text-white">
              <i className="fab fa-facebook-f"></i>
              Continue with Facebook
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-gray-800/60 text-white">
              <i className="fab fa-apple"></i>
              Continue with Apple
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-red-900/20 text-white">
              <i className="fab fa-google"></i>
              Continue with Google
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-gray-700 hover:bg-gray-800/60 text-white">
              <i className="fas fa-envelope"></i>
              Continue with Email
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
              <Label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
              />
              {errors.username && <p className="mt-2 text-sm text-red-600">{errors.username}</p>}
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-gray-800 border-gray-700 text-white"
              />
              {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}