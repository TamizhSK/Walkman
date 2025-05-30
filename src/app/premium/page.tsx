"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Premium() {
  const premiumPlans = [
    {
      id: 1,
      title: 'Premium Individual',
      icon: 'fas fa-headphones-alt',
      features: ['Automatic Playlists', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-indigo-600 via-purple-600 to-blue-700',
      price: '$9.99',
      billing: 'Billed monthly',
      description: 'For one person',
      isPremium: true
    },
    {
      id: 2,
      title: 'Premium Duo',
      icon: 'fas fa-user-group',
      features: ['2 Premium accounts', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-rose-500 via-pink-600 to-purple-700',
      price: '$12.99',
      billing: 'Billed monthly',
      description: 'For two people',
      isPremium: false
    },
    {
      id: 3,
      title: 'Premium Student',
      icon: 'fas fa-graduation-cap',
      features: ['Student Discount', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-emerald-500 via-teal-600 to-cyan-700',
      price: '$4.99',
      billing: 'Billed monthly',
      description: 'For eligible students',
      isPremium: false
    },
    {
      id: 4,
      title: 'Premium Family',
      icon: 'fas fa-users',
      features: ['Up to 6 Premium accounts', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-amber-500 via-orange-600 to-red-700',
      price: '$15.99',
      billing: 'Billed monthly',
      description: 'For families',
      isPremium: false
    },
  ];

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      {/* Optimized Hero section */}
      <section 
        aria-label="Premium music subscription plans"
        className="relative w-full h-[400px]"
      >
        {/* Background image with optimized loading */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/f_auto,q_auto,w_1920/v1747025734/img7_mxog0b.jpg')`,
          }}
          role="img"
          aria-label="Music festival background"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
        
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Experience the True Rhythm
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Subscription plans made just for you
          </p>
        </div>
      </section>

      {/* Premium Plans Section */}
      <section 
        aria-label="Premium subscription plans"
        className="container mx-auto px-4 sm:px-6 py-10 md:py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {premiumPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`
                relative group overflow-hidden rounded-2xl border border-white/10
                transform transition-all duration-500 ease-out
                hover:shadow-2xl hover:scale-[1.02] hover:border-white/20
                bg-gradient-to-br ${plan.color} text-white
                h-full flex flex-col
                shadow-lg
              `}
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />                    
              {/* Card ribbon for premium badge */}
              {plan.isPremium && (
                <div className="absolute -right-8 top-6 w-32 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-1 px-4 transform rotate-45 text-center text-xs">
                  POPULAR
                </div>
              )}
              
              <CardHeader className="p-4 md:p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 md:w-18 md:h-18 rounded-full bg-gradient-to-br from-white/10 to-white/0 border border-white/20 mb-4">
                    <i className={`${plan.icon} text-2xl md:text-3xl`} />
                  </div>
                  <CardTitle className="text-xl md:text-2xl font-bold mb-2">
                    {plan.title}
                  </CardTitle>
                  <CardDescription className="text-white/80 mb-4">
                    {plan.description}
                  </CardDescription>
                  
                  <div className="mb-4">
                    <div className="flex justify-center items-baseline">
                      <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                      <span className="ml-2 text-lg text-white/70">/month</span>
                    </div>
                    <p className="text-sm text-white/60 mt-1">{plan.billing}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 pb-6 px-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1 mr-3 w-5 h-5 rounded-full bg-slate-900/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}