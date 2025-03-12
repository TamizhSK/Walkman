// app/premium/page.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function Premium() {
  const premiumPlans = [
    {
      id: 1,
      title: 'Premium Individual',
      icon: 'fas fa-headphones-alt',
      features: ['Automatic Playlists', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-blue-600 to-indigo-600'
    },
    {
      id: 2,
      title: 'Premium Duo',
      icon: 'fas fa-user-group',
      features: ['2 Premium accounts*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 3,
      title: 'Premium Student',
      icon: 'fas fa-graduation-cap',
      features: ['Student Discount*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 4,
      title: 'Premium Family',
      icon: 'fas fa-users',
      features: ['Up to 6 Premium accounts*', 'Ad-free music listening', 'Download to listen offline'],
      color: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white min-h-screen">
      <header className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience the True Rhythm</h1>
        <p className="text-xl text-gray-300">Subscription plans made just for you</p>
      </header>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {premiumPlans.map((plan) => (
            <div key={plan.id} className="h-full">
              <Card className={`bg-gradient-to-br ${plan.color} text-white h-full border-none shadow-lg hover:shadow-xl transition-all duration-300`}>
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 rounded-full bg-white/20 mb-4">
                      <i className={`${plan.icon} text-3xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold">{plan.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <p key={index} className="text-center">{feature}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}