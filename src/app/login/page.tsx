'use client';

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "", general: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (status === "authenticated" && session) {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    }
  }, [session, status, router, searchParams]);

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setErrors({ username: "", password: "", general: "" });
    
    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      const result = await signIn(provider, {
        callbackUrl,
        redirect: false,
      });

      if (result?.error) {
        setErrors(prev => ({ 
          ...prev, 
          general: `${provider} authentication failed. Please try again.` 
        }));
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Social login error:", error);
      setErrors(prev => ({ 
        ...prev, 
        general: "Something went wrong. Please try again." 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ username: "", password: "", general: "" });

    const newErrors = { username: "", password: "", general: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username or email is required.";
      isValid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      const result = await signIn("credentials", {
        username: username.trim(),
        password: password.trim(),
        redirect: false,
      });

      if (result?.error) {
        setErrors(prev => ({ 
          ...prev, 
          general: "Invalid username/email or password." 
        }));
      } else if (result?.ok) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors(prev => ({ 
        ...prev, 
        general: "Something went wrong. Please try again." 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading if checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Mobile background image */}
      <div
        className="absolute inset-0 lg:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
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
              <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
              <p className="text-muted-foreground text-sm">
                Enter your credentials or continue with social login.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Social Login Buttons */}
              <div className="space-y-3">
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

              {/* Separator */}
              <div className="relative text-center text-sm">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or login with email
                </span>
                <div className="absolute left-0 right-0 top-1/2 border-t" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}
                <div className="space-y-1">
                  <Label htmlFor="username">Username or Email</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="username@example.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isLoading}
                  />
                  {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Login"}
                </Button>
              </form>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="underline underline-offset-4 text-amber-500 hover:text-orange-500"
                >
                  Sign up
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
          alt="Login background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        {/* Gradient blend overlay */}
        <div className="absolute left-0 top-0 h-full w-92 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
      </div>
    </div>
  );
}