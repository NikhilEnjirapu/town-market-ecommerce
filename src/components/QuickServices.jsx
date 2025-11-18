import { Clock, Calendar, Shield, Users, CheckCircle } from 'lucide-react';

const services = [
  {
    title: '11-Min Delivery',
    description: 'Lightning-fast delivery across major neighborhoods',
    icon: Clock,
    color: 'blue',
    stat: '11min'
  },
  {
    title: 'Schedule & Repeat',
    description: 'Plan weekly deliveries and set recurring orders',
    icon: Calendar,
    color: 'green',
    stat: '24/7'
  },
  {
    title: 'Freshness Guarantee',
    description: 'Refund instantly if you are not 100% satisfied',
    icon: Shield,
    color: 'orange',
    stat: '100%'
  },
  {
    title: 'Local Partnerships',
    description: 'Supporting 120+ trusted local stores & brands',
    icon: Users,
    color: 'purple',
    stat: '120+'
  },
];

export default function QuickServices() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Why Choose TownMarket
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Service That Exceeds Expectations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience grocery shopping reimagined with our premium services designed for your convenience and peace of mind
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative"
              >
                {/* Background Card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${
                  service.color === 'blue' ? 'from-blue-50 to-blue-100' :
                  service.color === 'green' ? 'from-green-50 to-green-100' :
                  service.color === 'orange' ? 'from-orange-50 to-orange-100' :
                  'from-purple-50 to-purple-100'
                } rounded-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl`} />
                
                {/* Content */}
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/50 h-full">
                  {/* Icon with Badge */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                      service.color === 'blue' ? 'bg-blue-600' :
                      service.color === 'green' ? 'bg-green-600' :
                      service.color === 'orange' ? 'bg-orange-600' :
                      'bg-purple-600'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Stat Badge */}
                    <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {service.stat}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-full">
            <span className="text-sm font-medium">Join 50,000+ happy customers</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
