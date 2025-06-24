
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  TrendingUp, 
  Coins, 
  Calendar, 
  Target,
  ArrowUp,
  ArrowDown,
  Clock,
  Award,
  Zap
} from "lucide-react";

const Stake = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const { toast } = useToast();

  const stakingData = {
    totalStaked: 1200,
    availableToStake: 1250,
    estimatedRewards: 58,
    apr: 5.5,
    lockPeriod: 30
  };

  const stakingHistory = [
    { id: 1, action: "Stake", amount: 500, date: "2024-06-15", status: "Active", rewards: 12.5 },
    { id: 2, action: "Stake", amount: 700, date: "2024-06-10", status: "Active", rewards: 17.5 },
    { id: 3, action: "Unstake", amount: -300, date: "2024-06-05", status: "Completed", rewards: 7.2 },
    { id: 4, action: "Stake", amount: 800, date: "2024-06-01", status: "Active", rewards: 20.0 },
  ];

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeAmount && parseInt(stakeAmount) > 0) {
      toast({
        title: "Coins Staked Successfully!",
        description: `${stakeAmount} Ertha Coins have been staked. Rewards will be calculated starting tomorrow.`,
      });
      setStakeAmount("");
    }
  };

  const handleUnstake = (e: React.FormEvent) => {
    e.preventDefault();
    if (unstakeAmount && parseInt(unstakeAmount) > 0) {
      toast({
        title: "Unstaking Initiated!",
        description: `${unstakeAmount} Ertha Coins will be available in your wallet within 24 hours.`,
      });
      setUnstakeAmount("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Staking Dashboard
          </h1>
          <p className="text-gray-600">Stake your Ertha Coins and earn rewards while supporting the ecosystem</p>
        </div>

        {/* Staking Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stakingData.totalStaked}</div>
              <div className="text-sm text-gray-600">Total Staked</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 coin-shine">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">{stakingData.estimatedRewards}</div>
              <div className="text-sm text-gray-600">Est. Rewards</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{stakingData.apr}%</div>
              <div className="text-sm text-gray-600">Annual APR</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{stakingData.lockPeriod}</div>
              <div className="text-sm text-gray-600">Days Lock Period</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Staking Actions */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Stake Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <ArrowUp className="w-5 h-5 mr-2" />
                    Stake Coins
                  </CardTitle>
                  <CardDescription>Lock your coins and earn rewards</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStake} className="space-y-4">
                    <div>
                      <Label htmlFor="stakeAmount">Amount to Stake</Label>
                      <div className="relative">
                        <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="stakeAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="pl-10"
                          max={stakingData.availableToStake}
                        />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Available: {stakingData.availableToStake} Ertha Coins
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-700 mb-2">Estimated Returns</div>
                      <div className="text-lg font-semibold text-green-800">
                        +{stakeAmount ? ((parseInt(stakeAmount) * stakingData.apr) / 100 / 12).toFixed(2) : "0"} coins/month
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      <Zap className="w-4 h-4 mr-2" />
                      Stake Now
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Unstake Form */}
              <Card className="bg-white/80 backdrop-blur-sm border-red-100 eco-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-red-700">
                    <ArrowDown className="w-5 h-5 mr-2" />
                    Unstake Coins
                  </CardTitle>
                  <CardDescription>Withdraw your staked coins</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUnstake} className="space-y-4">
                    <div>
                      <Label htmlFor="unstakeAmount">Amount to Unstake</Label>
                      <div className="relative">
                        <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="unstakeAmount"
                          type="number"
                          placeholder="Enter amount"
                          value={unstakeAmount}
                          onChange={(e) => setUnstakeAmount(e.target.value)}
                          className="pl-10"
                          max={stakingData.totalStaked}
                        />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Staked: {stakingData.totalStaked} Ertha Coins
                      </div>
                    </div>
                    
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-red-700 mb-2">⚠️ Unstaking Notice</div>
                      <div className="text-sm text-red-600">
                        Unstaking will forfeit pending rewards for the current period.
                      </div>
                    </div>
                    
                    <Button type="submit" variant="outline" className="w-full border-red-200 text-red-700 hover:bg-red-50">
                      <ArrowDown className="w-4 h-4 mr-2" />
                      Unstake
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Staking History */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Staking History
                </CardTitle>
                <CardDescription>Your staking activity and rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stakingHistory.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.action === "Stake" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {transaction.action === "Stake" ? (
                            <ArrowUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowDown className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.action}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          transaction.action === "Stake" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.action === "Stake" ? "+" : ""}{transaction.amount} coins
                        </div>
                        <div className="text-sm text-gray-500">
                          Rewards: +{transaction.rewards} coins
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          transaction.status === "Active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Staking Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
                  Staking Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Earn Rewards</span>
                  </div>
                  <div className="text-sm text-green-700">
                    Earn {stakingData.apr}% annual returns on your staked coins
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Target className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Support Ecosystem</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    Your stake helps secure and grow the DAO ecosystem
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Zap className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="font-medium text-purple-800">Flexible Terms</span>
                  </div>
                  <div className="text-sm text-purple-700">
                    Unstake anytime with just a {stakingData.lockPeriod}-day notice period
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle>Your Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Earned</span>
                  <span className="text-lg font-semibold text-green-600">+{stakingData.estimatedRewards} coins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Effective APR</span>
                  <span className="text-lg font-semibold text-blue-600">{stakingData.apr}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Days Staking</span>
                  <span className="text-lg font-semibold text-purple-600">45 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rank</span>
                  <span className="text-lg font-semibold text-orange-600">Top 15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
