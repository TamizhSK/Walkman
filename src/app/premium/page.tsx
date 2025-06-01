"use client";

import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function Premium() {
  const premiumPlans = [
    {
      id: 1,
      title: 'Premium Individual',
      icon: 'fas fa-headphones-alt',
      features: ['Automatic Playlists', 'Ad-free music listening', 'Download to listen offline'],
      price: '$9.99',
      billing: 'Billed monthly',
      description: 'For one person',
      neonColors: { firstColor: "#8b5cf6", secondColor: "#3b82f6" }
    },
    {
      id: 2,
      title: 'Premium Duo',
      icon: 'fas fa-user-group',
      features: ['2 Premium accounts', 'Ad-free music listening', 'Download to listen offline'],
      price: '$12.99',
      billing: 'Billed monthly',
      description: 'For two people',
      neonColors: { firstColor: "#ec4899", secondColor: "#8b5cf6" }
    },
    {
      id: 3,
      title: 'Premium Student',
      icon: 'fas fa-graduation-cap',
      features: ['Student Discount', 'Ad-free music listening', 'Download to listen offline'],
      price: '$4.99',
      billing: 'Billed monthly',
      description: 'For eligible students',
      neonColors: { firstColor: "#10b981", secondColor: "#06b6d4" }
    },
    {
      id: 4,
      title: 'Premium Family',
      icon: 'fas fa-users',
      features: ['Up to 6 Premium accounts', 'Ad-free music listening', 'Download to listen offline'],
      price: '$15.99',
      billing: 'Billed monthly',
      description: 'For families',
      neonColors: { firstColor: "#f59e0b", secondColor: "#ef4444" }
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-black to-gray-900 text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] lg:h-screen ">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dqcf0a6dk/image/upload/f_auto,q_auto,w_1920/v1747025734/img7_mxog0b.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-2/3" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
            Experience the True Rhythm
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl">
            Subscription plans made just for you
          </p>
        </div>
      </section>

      {/* Premium Plans Container */}
      <div className="relative bg-black">
        <section className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {premiumPlans.map((plan) => (
              <div key={plan.id} className="relative">
                <NeonGradientCard
                  className="w-full h-full"
                  neonColors={plan.neonColors}
                >
                  <div className="h-full flex flex-col justify-between p-4 sm:p-5 md:p-6">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 border border-white/20 mb-3">
                        <i className={`${plan.icon} text-xl`} />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-1">{plan.title}</h3>
                      <p className="text-white/70 text-sm mb-3">{plan.description}</p>
                      <div className="mb-4">
                        <div className="flex justify-center items-baseline">
                          <span className="text-2xl font-bold">{plan.price}</span>
                          <span className="ml-1 text-sm text-white/70">/mo</span>
                        </div>
                        <p className="text-xs text-white/50">{plan.billing}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm">
                          <div className="flex-shrink-0 mt-0.5 mr-2 w-4 h-4 rounded-full bg-white/10 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-white/90 leading-tight">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </NeonGradientCard>
              </div>
            ))}
          </div>
        </section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 text-center">
          <p className="text-white/60 text-sm sm:text-base">
            Choose your perfect plan and start your premium music journey today
          </p>
        </div>
      </div>


      {/* Footer Section */}
      <footer className="relative z-20 bg-black border-t border-white/10">
      </footer>
    </div>
  );
}
