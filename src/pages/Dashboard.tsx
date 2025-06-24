
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { 
  Coins, 
  Vote, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Award,
  Target,
  Calendar,
  ArrowRight,
  Star,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const userStats = [
    { label: "Ertha Coins", value: "2,450", icon: Coins, color: "text-yellow-600", change: "+125 this week" },
    { label: "Votes Cast", value: "47", icon: Vote, color: "text-blue-600", change: "+3 this week" },
    { label: "Proposals", value: "8", icon: FileText, color: "text-green-600", change: "+2 this month" },
    { label: "Tasks Done", value: "23", icon: CheckCircle, color: "text-purple-600", change: "+5 this week" },
  ];

  const stakingData = {
    staked: 1200,
    rewards: 58,
    pools: 3
  };

  const recentActivity = [
    { action: "Voted on", item: "Tree Planting Initiative", time: "2 hours ago", icon: Vote, color: "text-blue-600" },
    { action: "Completed", item: "Sustainability Course #3", time: "1 day ago", icon: Award, color: "text-purple-600" },
    { action: "Joined", item: "Clean Energy Pool", time: "3 days ago", icon: Users, color: "text-green-600" },
    { action: "Staked", item: "500 Ertha Coins", time: "1 week ago", icon: TrendingUp, color: "text-yellow-600" },
  ];

  const achievements = [
    { title: "Early Adopter", description: "Joined in the first month", icon: Star, unlocked: true },
    { title: "Active Voter", description: "Cast 50+ votes", icon: Vote, unlocked: true },
    { title: "Sustainability Scholar", description: "Complete 10 courses", icon: Award, unlocked: false, progress: 70 },
    { title: "Community Builder", description: "Refer 5 members", icon: Users, unlocked: false, progress: 40 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Alex</span>! 🌱
              </h1>
              <p className="text-gray-600">Here's your regenerative impact dashboard</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="coin-shine w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">2,450</div>
                <div className="text-sm text-gray-600">Ertha Coins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-green-100 hover:bg-white transition-all duration-300 hover:scale-105 eco-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-green-600">{stat.change}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Staking Overview */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Staking Overview
                </CardTitle>
                <CardDescription>Your staked coins and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{stakingData.staked}</div>
                    <div className="text-sm text-gray-600">Coins Staked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stakingData.rewards}</div>
                    <div className="text-sm text-gray-600">Rewards Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{stakingData.pools}</div>
                    <div className="text-sm text-gray-600">Active Pools</div>
                  </div>
                </div>
                <div className="mt-6 flex justify-center">
                  <Link to="/stake">
                    <Button className="earth-gradient hover:scale-105 transition-transform duration-300">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Manage Staking
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest contributions to the DAO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50/80 hover:bg-white transition-colors">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center`}>
                          <Icon className={`w-5 h-5 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.action} <span className="text-green-600">{activity.item}</span>
                          </div>
                          <div className="text-xs text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/governance">
                  <Button variant="outline" className="w-full justify-start border-green-200 text-green-700 hover:bg-green-50">
                    <Vote className="w-4 h-4 mr-2" />
                    Vote on Proposals
                  </Button>
                </Link>
                <Link to="/pool">
                  <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-700 hover:bg-blue-50">
                    <Users className="w-4 h-4 mr-2" />
                    Join a Pool
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Award className="w-4 h-4 mr-2" />
                    Learn & Earn
                  </Button>
                </Link>
                <Link to="/treasury">
                  <Button variant="outline" className="w-full justify-start border-yellow-200 text-yellow-700 hover:bg-yellow-50">
                    <Coins className="w-4 h-4 mr-2" />
                    Treasury Request
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
                <CardDescription>Your impact milestones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${achievement.unlocked ? 'bg-green-50' : 'bg-gray-50'}`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.unlocked ? 'bg-green-200' : 'bg-gray-200'}`}>
                        <Icon className={`w-5 h-5 ${achievement.unlocked ? 'text-green-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${achievement.unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </div>
                        <div className="text-xs text-gray-500">{achievement.description}</div>
                        {!achievement.unlocked && achievement.progress && (
                          <Progress value={achievement.progress} className="mt-1 h-1" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
