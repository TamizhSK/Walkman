"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Premium() {
  const premiumPlans = [
    {
      id: 1,
      title: 'Premium Individual',
      icon: 'fas fa-headphones-alt',
      features: ['Automatic Playlists', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 2,
      title: 'Premium Duo',
      icon: 'fas fa-user-group',
      features: ['2 Premium accounts*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-purple-600 to-pink-600',
    },
    {
      id: 3,
      title: 'Premium Student',
      icon: 'fas fa-graduation-cap',
      features: ['Student Discount*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-green-600 to-teal-600',
    },
    {
      id: 4,
      title: 'Premium Family',
      icon: 'fas fa-users',
      features: ['Up to 6 Premium accounts*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      {/* Hero section with Cloudinary background image */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/v1747025734/img7_mxog0b.jpg')`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent z-0" />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience the True Rhythm</h1>
          <p className="text-xl text-gray-300">Subscription plans made just for you</p>
        </div>
      </div>

      {/* Spacing between hero and cards */}
      <div className="py-4" />

      {/* Premium Plans Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {premiumPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`
                bg-gradient-to-br ${plan.color} text-white border-none 
                shadow-md hover:shadow-2xl hover:scale-[1.03]
                transform transition-all duration-300 ease-in-out
                cursor-pointer h-full
              `}
            >
              <CardHeader className="text-center">
                <div className="inline-block p-4 rounded-full bg-white/20 mb-4">
                  <i className={`${plan.icon} text-3xl`} />
                </div>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription className="text-white/80">Enjoy exclusive benefits</CardDescription>
              </CardHeader>
              <CardContent className="mt-4 space-y-2">
                {plan.features.map((feature, idx) => (
                  <p key={idx} className="text-center">{feature}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
