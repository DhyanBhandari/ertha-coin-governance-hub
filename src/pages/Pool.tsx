
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  TreePine, 
  BookOpen, 
  Zap, 
  Droplets, 
  Target,
  Calendar,
  Coins,
  UserPlus,
  Award,
  TrendingUp
} from "lucide-react";

const Pool = () => {
  const { toast } = useToast();

  const pools = [
    {
      id: 1,
      title: "Urban Tree Planting",
      description: "Collaborative effort to plant trees in urban areas to improve air quality and create green spaces.",
      category: "Environment",
      icon: TreePine,
      participants: 127,
      maxParticipants: 200,
      reward: 50,
      deadline: "2024-07-30",
      progress: 63,
      status: "active",
      joined: false,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 2,
      title: "Clean Energy Education",
      description: "Pool resources to create educational content about renewable energy and sustainable practices.",
      category: "Education",
      icon: Zap,
      participants: 89,
      maxParticipants: 150,
      reward: 75,
      deadline: "2024-08-15",
      progress: 59,
      status: "active",
      joined: true,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      id: 3,
      title: "Water Conservation Project",
      description: "Community initiative to implement water-saving technologies and educate about conservation.",
      category: "Conservation",
      icon: Droplets,
      participants: 156,
      maxParticipants: 300,
      reward: 100,
      deadline: "2024-08-01",
      progress: 52,
      status: "active",
      joined: false,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 4,
      title: "Sustainable Farming Workshops",
      description: "Organize workshops teaching regenerative farming techniques to local communities.",
      category: "Agriculture",
      icon: BookOpen,
      participants: 78,
      maxParticipants: 100,
      reward: 60,
      deadline: "2024-07-20",
      progress: 78,
      status: "active",
      joined: false,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 5,
      title: "Community Solar Installation",
      description: "Pool resources to install solar panels in community centers and public buildings.",
      category: "Energy",
      icon: Target,
      participants: 203,
      maxParticipants: 250,
      reward: 120,
      deadline: "2024-06-25",
      progress: 100,
      status: "completed",
      joined: true,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const myPools = pools.filter(pool => pool.joined);

  const handleJoinPool = (poolId: number, poolTitle: string) => {
    toast({
      title: "Successfully Joined Pool!",
      description: `You've joined the "${poolTitle}" pool. Start collaborating with the community!`,
    });
  };

  const handleLeavePool = (poolId: number, poolTitle: string) => {
    toast({
      title: "Left Pool",
      description: `You've left the "${poolTitle}" pool.`,
      variant: "destructive",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "upcoming": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Community Action Pools
          </h1>
          <p className="text-gray-600">Join collaborative initiatives and pool resources for maximum environmental impact</p>
        </div>

        {/* My Pools Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{myPools.length}</div>
              <div className="text-sm text-gray-600">Pools Joined</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 coin-shine">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {myPools.reduce((sum, pool) => sum + pool.reward, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Rewards</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">85%</div>
              <div className="text-sm text-gray-600">Avg. Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Pools Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {pools.map((pool) => {
            const Icon = pool.icon;
            return (
              <Card key={pool.id} className="bg-white/80 backdrop-blur-sm border-green-100 hover:bg-white transition-all duration-300 hover:scale-[1.02] eco-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg ${pool.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${pool.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{pool.title}</h3>
                        <Badge variant="outline" className="mt-1">{pool.category}</Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(pool.status)}>
                      {pool.status}
                    </Badge>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{pool.description}</p>

                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Participation Progress</span>
                        <span className="font-medium text-gray-900">{pool.participants}/{pool.maxParticipants}</span>
                      </div>
                      <Progress value={pool.progress} className="h-2" />
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        {pool.participants} members
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {pool.deadline}
                      </div>
                      <div className="flex items-center text-yellow-600">
                        <Coins className="w-4 h-4 mr-2" />
                        {pool.reward} coins reward
                      </div>
                      <div className="flex items-center text-green-600">
                        <Target className="w-4 h-4 mr-2" />
                        {pool.progress}% complete
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-200">
                      {pool.status === "completed" ? (
                        <Button disabled className="w-full bg-gray-100 text-gray-500">
                          Pool Completed
                        </Button>
                      ) : pool.joined ? (
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1 border-green-200 text-green-700 hover:bg-green-50"
                          >
                            View Progress
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleLeavePool(pool.id, pool.title)}
                            className="flex-1 border-red-200 text-red-700 hover:bg-red-50"
                          >
                            Leave Pool
                          </Button>
                        </div>
                      ) : (
                        <Button 
                          onClick={() => handleJoinPool(pool.id, pool.title)}
                          className="w-full earth-gradient hover:scale-105 transition-transform duration-300"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Pool
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Pool Benefits */}
        <Card className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white eco-shadow">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Why Join Community Pools?</h2>
              <p className="text-green-100">Maximize your impact through collaborative action</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Collective Power</h3>
                <p className="text-sm text-green-100">Pool resources with like-minded community members to tackle bigger challenges together.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Bonus Rewards</h3>
                <p className="text-sm text-green-100">Earn bonus Ertha Coins through collaborative participation and milestone achievements.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Greater Impact</h3>
                <p className="text-sm text-green-100">Create meaningful change by combining individual efforts into powerful collective action.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pool;
