
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  Landmark, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Send,
  PieChart,
  Target
} from "lucide-react";

const Treasury = () => {
  const { toast } = useToast();

  const treasuryStats = {
    totalCoins: 1234567,
    availableCoins: 890123,
    lockedCoins: 344444,
    monthlyInflow: 125000,
    monthlyOutflow: 87000
  };

  const recentTransactions = [
    { id: 1, type: "inflow", amount: 5000, description: "Proposal funding approved", date: "2024-06-20", status: "completed" },
    { id: 2, type: "outflow", amount: -3000, description: "Education workshop payment", date: "2024-06-19", status: "completed" },
    { id: 3, type: "inflow", amount: 12000, description: "Staking rewards distributed", date: "2024-06-18", status: "completed" },
    { id: 4, type: "outflow", amount: -8000, description: "Tree planting initiative", date: "2024-06-17", status: "pending" },
  ];

  const handleFundingRequest = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Funding Request Submitted!",
      description: "Your request has been submitted for treasury review.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Treasury Dashboard
          </h1>
          <p className="text-gray-600">Transparent management of DAO resources and funding</p>
        </div>

        {/* Treasury Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 coin-shine">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{treasuryStats.totalCoins.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Treasury</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{treasuryStats.availableCoins.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Available Funds</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-orange-600 mb-1">{treasuryStats.lockedCoins.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Locked in Proposals</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cash Flow */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Monthly Cash Flow
                </CardTitle>
                <CardDescription>Treasury inflows and outflows this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-green-700 font-medium">Inflows</span>
                      <ArrowUpRight className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-800">{treasuryStats.monthlyInflow.toLocaleString()}</div>
                    <div className="text-sm text-green-600">+12% from last month</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-700 font-medium">Outflows</span>
                      <ArrowDownRight className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-red-800">{treasuryStats.monthlyOutflow.toLocaleString()}</div>
                    <div className="text-sm text-red-600">-8% from last month</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest treasury activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "inflow" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {transaction.type === "inflow" ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          transaction.type === "inflow" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "inflow" ? "+" : ""}{transaction.amount.toLocaleString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
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
            {/* Funding Request */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-purple-600" />
                  Request Funding
                </CardTitle>
                <CardDescription>Submit a funding proposal to the treasury</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFundingRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Amount Requested</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input id="amount" type="number" placeholder="5000" className="pl-10" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason/Purpose</Label>
                    <Textarea 
                      id="reason" 
                      placeholder="Describe how the funds will be used..."
                      rows={3}
                      required 
                    />
                  </div>
                  <div>
                    <Label htmlFor="projectLink">Project Details Link</Label>
                    <Input id="projectLink" type="url" placeholder="https://..." />
                  </div>
                  <Button type="submit" className="w-full earth-gradient">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Treasury Health */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Landmark className="w-5 h-5 mr-2 text-indigo-600" />
                  Treasury Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Utilization Rate</span>
                  <span className="text-sm font-medium text-gray-900">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "28%" }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Monthly Burn Rate</span>
                  <span className="text-sm font-medium text-gray-900">7.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "71%" }}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reserve Ratio</span>
                  <span className="text-sm font-medium text-green-600">Healthy</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
