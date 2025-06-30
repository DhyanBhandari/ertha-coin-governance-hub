
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { 
  ArrowRight, 
  Users, 
  Vote, 
  Coins, 
  TreePine, 
  Leaf, 
  Globe, 
  Shield,
  TrendingUp,
  Heart,
  Zap,
  Award,
  BookOpen
} from "lucide-react";

const Index = () => {
  const stats = [
    { label: "Active Members", value: "2,847", icon: Users, color: "text-blue-600" },
    { label: "Proposals", value: "156", icon: Vote, color: "text-green-600" },
    { label: "Ertha Coins", value: "1.2M", icon: Coins, color: "text-yellow-600" },
    { label: "Trees Planted", value: "8,432", icon: TreePine, color: "text-emerald-600" },
  ];

  const features = [
    {
      icon: Vote,
      title: "Decentralized Governance",
      description: "Participate in democratic decision-making and shape the future of our regenerative ecosystem.",
      color: "text-blue-600"
    },
    {
      icon: Coins,
      title: "Ertha Coin Economy",
      description: "Earn and use our virtual currency through meaningful contributions to sustainability projects.",
      color: "text-yellow-600"
    },
    {
      icon: TrendingUp,
      title: "Staking & Rewards",
      description: "Stake your coins and earn rewards while supporting long-term ecosystem growth.",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "Community Pools",
      description: "Join collaborative initiatives and pool resources for maximum environmental impact.",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Learn & Earn",
      description: "Complete sustainability courses and earn coins while expanding your knowledge.",
      color: "text-indigo-600"
    },
    {
      icon: Shield,
      title: "Transparent Treasury",
      description: "Track every coin allocation with complete transparency and community oversight.",
      color: "text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="leaf-pattern absolute inset-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
               
               
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Erthaloka DAO
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A regenerative ecosystem governance platform powered by community collaboration and sustainable innovation
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link to="/login">
                <Button size="lg" className="earth-gradient hover:scale-105 transition-transform duration-300 text-lg px-8 py-6 eco-shadow">
                  <Heart className="w-5 h-5 mr-2" />
                  Join the DAO
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link to="/learn">
                <Button variant="outline" size="lg" className="border-green-300 text-green-700 hover:bg-green-500 text-lg px-8 py-6">
                  <Zap className="w-5 h-5 mr-2" />
                  Learn More
                </Button>
              </Link>
              
              <Link to="/governance">
                <Button variant="outline" size="lg" className="border-green-300 text-green-700 hover:bg-green-500 text-lg px-8 py-6">
                  <Vote className="w-5 h-5 mr-2" />
                  Vote Now
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="bg-white/60 backdrop-blur-sm border-green-100 hover:bg-white/80 transition-all duration-300 hover:scale-105 eco-shadow">
                    <CardContent className="p-6 text-center">
                      <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Regenerative Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the tools and features that make Erthaloka DAO a powerful platform for sustainable collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-green-100 hover:bg-white transition-all duration-300 hover:scale-105 eco-shadow group">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cmVjdCB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjIpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Award className="w-16 h-16 text-white mx-auto mb-6 animate-bounce" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of changemakers building a regenerative economy. Start earning Ertha Coins and making an impact today.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-green-700 hover:scale-105 transition-transform duration-300 text-lg px-8 py-6">
              <Leaf className="w-5 h-5 mr-2" />
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 earth-gradient rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Erthaloka DAO</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Building a regenerative future through decentralized governance and community-driven sustainability initiatives.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2">
                <Link to="/governance" className="block text-gray-400 hover:text-white transition-colors">Governance</Link>
                <Link to="/treasury" className="block text-gray-400 hover:text-white transition-colors">Treasury</Link>
                <Link to="/learn" className="block text-gray-400 hover:text-white transition-colors">Learn</Link>
                <Link to="/stake" className="block text-gray-400 hover:text-white transition-colors">Staking</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">FAQs</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Erthaloka DAO. Building a regenerative future together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
