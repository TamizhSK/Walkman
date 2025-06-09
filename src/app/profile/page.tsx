'use client';

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Settings, 
  LogOut, 
  ArrowLeft,
  Shield,
  Clock
} from "lucide-react";

// Loading component
function ProfileLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-400"></div>
    </div>
  );
}

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    }
  }, [status, router]);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ 
        callbackUrl: "/",
        redirect: true 
      });
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getUserDisplayName = (): string => {
    if (session?.user?.name) return session.user.name;
    if (session?.user?.username) return session.user.username;
    if (session?.user?.email) return session.user.email.split("@")[0];
    return "User";
  };

  const getAccountType = (): string => {
    // You can customize this logic based on your app's needs
    if (session?.user?.email?.includes("admin")) return "Admin";
    return "Standard";
  };

  const getJoinDate = (): string => {
    // Since NextAuth doesn't provide createdAt by default, we'll show a generic message
    // You can extend this by adding custom fields to your user model
    return "Recently joined";
  };

  // Show loading if checking session
  if (status === "loading") {
    return <ProfileLoading />;
  }

  // Don't render if not authenticated (redirect will handle this)
  if (status === "unauthenticated" || !session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: "url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025733/img4_pczl7x.jpg')" }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Profile Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">My Profile</h1>
            <p className="text-gray-400">Manage your account information and preferences</p>
          </div>

          {/* Profile Card */}
          <Card className="bg-zinc-900/50 border-zinc-700 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-amber-400">
                  <AvatarImage 
                    src={session.user.image || ""} 
                    alt={getUserDisplayName()} 
                  />
                  <AvatarFallback className="bg-amber-400 text-black font-bold text-2xl">
                    {getInitials(getUserDisplayName())}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-2xl text-white">{getUserDisplayName()}</CardTitle>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="secondary" className="bg-amber-400/20 text-amber-400 border-amber-400/30">
                      <Shield className="h-3 w-3 mr-1" />
                      {getAccountType()}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <User className="h-5 w-5 text-amber-400" />
                  Account Information
                </h3>
                
                <div className="grid gap-4">
                  {/* Name */}
                  {session.user.name && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Full Name</p>
                          <p className="text-white">{session.user.name}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {session.user.email && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Email Address</p>
                          <p className="text-white">{session.user.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Username */}
                  {session.user.username && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-400">Username</p>
                          <p className="text-white">@{session.user.username}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User ID */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">User ID</p>
                        <p className="text-white font-mono text-sm">{session.user.id}</p>
                      </div>
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-400">Member Since</p>
                        <p className="text-white">{getJoinDate()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-700" />

              {/* Action Buttons */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-amber-400" />
                  Account Actions
                </h3>
                
                <div className="grid gap-3">
                  {/* Edit Profile Button */}
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-slate-900 border-zinc-600 hover:bg-zinc-00 text-white"
                    onClick={() => {
                      // You can implement edit profile functionality here
                      alert("Edit profile functionality coming soon!");
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>

                  {/* Change Password Button (for credentials users) */}
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-slate-900 border-zinc-600 hover:bg-zinc-00 text-white"
                    onClick={() => {
                      // You can implement change password functionality here
                      alert("Change password functionality coming soon!");
                    }}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>

                  {/* Logout Button */}
                  <Button
                    variant="destructive"
                    className="w-half justify-start bg-red-600 hover:bg-red-700"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoading ? "Signing out..." : "Sign Out"}
                  </Button>
                </div>
              </div>

              {/* Premium Section (if applicable) */}
              <Separator className="bg-zinc-700" />
              
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Subscription</h3>
                <div className="p-4 rounded-lg bg-gradient-to-r from-amber-400/10 to-orange-400/10 border border-amber-400/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Free Plan</p>
                      <p className="text-sm text-gray-400">Basic features included</p>
                    </div>
                    <Link href="/premium">
                      <Button className="bg-amber-400 hover:bg-amber-300 text-black">
                        Upgrade
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}