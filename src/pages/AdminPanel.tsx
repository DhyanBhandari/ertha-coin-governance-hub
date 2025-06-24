
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Coins, 
  FileText, 
  Settings, 
  Eye, 
  Check, 
  X,
  Plus,
  Edit,
  Trash2,
  Crown,
  Lock,
  UserPlus,
  LogIn
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [selectedTab, setSelectedTab] = useState("overview");
  const { toast } = useToast();

  // Admin credentials (in real app, this would be handled by backend)
  const ADMIN_CREDENTIALS = {
    email: "admin@erthaloka.dao",
    password: "ErthalokAdmin2024!"
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLoginMode) {
      // Login
      if (credentials.email === ADMIN_CREDENTIALS.email && credentials.password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        toast({
          title: "Admin Access Granted",
          description: "Welcome to the Erthaloka DAO Admin Panel",
        });
      } else {
        toast({
          title: "Access Denied",
          description: "Invalid admin credentials",
          variant: "destructive",
        });
      }
    } else {
      // Signup (only allow if using admin credentials)
      if (credentials.email === ADMIN_CREDENTIALS.email && credentials.password === ADMIN_CREDENTIALS.password) {
        setIsAuthenticated(true);
        toast({
          title: "Admin Account Created",
          description: "Admin access has been granted",
        });
      } else {
        toast({
          title: "Signup Restricted",
          description: "Only authorized admin credentials can create accounts",
          variant: "destructive",
        });
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="leaf-pattern absolute inset-0 opacity-30"></div>
        
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-red-200 relative z-10">
          <CardHeader className="text-center space-y-4">
            <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
              ← Back to Home
            </Link>
            
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin Panel Access
            </CardTitle>
            <CardDescription>
              {isLoginMode ? "Sign in with admin credentials" : "Create admin account (restricted)"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Lock className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-red-800">Restricted Access</div>
                  <div className="text-red-700">Only authorized admin credentials can access this panel.</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@erthaloka.dao"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="border-red-200 focus:border-red-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter admin password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="border-red-200 focus:border-red-500"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                {isLoginMode ? (
                  <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin Login
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Admin Account
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLoginMode(!isLoginMode)}
                className="text-red-600 hover:text-red-700"
              >
                {isLoginMode ? "Need to create admin account?" : "Already have admin access?"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "users", label: "Users", icon: Users },
    { id: "proposals", label: "Proposals", icon: FileText },
    { id: "treasury", label: "Treasury", icon: Coins },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const users = [
    { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "Citizen", coins: 2450, status: "Active" },
    { id: 2, name: "Sarah Chen", email: "sarah@example.com", role: "Guardian", coins: 5230, status: "Active" },
    { id: 3, name: "Mike Torres", email: "mike@example.com", role: "Contributor", coins: 1890, status: "Pending" },
  ];

  const proposals = [
    { id: 1, title: "Tree Planting Initiative", author: "Alex Johnson", status: "Active", votes: 234, coins: 5000 },
    { id: 2, title: "Solar Panel Installation", author: "Sarah Chen", status: "Pending", votes: 89, coins: 12000 },
    { id: 3, title: "Education Program", author: "Mike Torres", status: "Completed", votes: 456, coins: 3000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Erthaloka DAO Admin Panel</h1>
              <p className="text-red-100">System Administration & Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="secondary" size="sm">
                Back to DAO
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-red-100">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedTab === tab.id
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "text-gray-600 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">2,847</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-green-100">
              <CardContent className="p-6 text-center">
                <FileText className="w-8 h-8 mx-auto mb-3 text-green-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
                <div className="text-sm text-gray-600">Total Proposals</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-yellow-100">
              <CardContent className="p-6 text-center">
                <Coins className="w-8 h-8 mx-auto mb-3 text-yellow-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">1.2M</div>
                <div className="text-sm text-gray-600">Circulating Coins</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6 text-center">
                <Settings className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <div className="text-3xl font-bold text-gray-900 mb-1">24</div>
                <div className="text-sm text-gray-600">Active Pools</div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "users" && (
          <Card className="bg-white/80 backdrop-blur-sm border-red-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <Button size="sm" className="bg-gradient-to-r from-red-600 to-orange-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{user.role}</Badge>
                      <div className="text-sm">
                        <div className="font-medium">{user.coins} coins</div>
                        <div className="text-gray-600">{user.status}</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "proposals" && (
          <Card className="bg-white/80 backdrop-blur-sm border-red-100">
            <CardHeader>
              <CardTitle>Proposal Management</CardTitle>
              <CardDescription>Review and moderate community proposals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{proposal.title}</div>
                      <div className="text-sm text-gray-600">by {proposal.author}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge 
                        variant={proposal.status === "Active" ? "default" : proposal.status === "Pending" ? "secondary" : "outline"}
                      >
                        {proposal.status}
                      </Badge>
                      <div className="text-sm text-center">
                        <div className="font-medium">{proposal.votes} votes</div>
                        <div className="text-gray-600">{proposal.coins} coins</div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="text-green-600">
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "treasury" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-red-100">
              <CardHeader>
                <CardTitle>Treasury Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">1,234,567</div>
                  <div className="text-gray-600">Total Ertha Coins</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">890,123</div>
                    <div className="text-sm text-gray-600">Available</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">344,444</div>
                    <div className="text-sm text-gray-600">Locked</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-red-100">
              <CardHeader>
                <CardTitle>Coin Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="recipient">Recipient Address</Label>
                    <Input id="recipient" placeholder="user@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="1000" />
                  </div>
                  <div>
                    <Label htmlFor="reason">Reason</Label>
                    <Input id="reason" placeholder="Reward for contribution" />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-orange-600">
                    Allocate Coins
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "settings" && (
          <Card className="bg-white/80 backdrop-blur-sm border-red-100">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure DAO parameters and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="votingPeriod">Default Voting Period (days)</Label>
                  <Input id="votingPeriod" type="number" defaultValue="7" />
                </div>
                <div>
                  <Label htmlFor="minProposalStake">Minimum Proposal Stake</Label>
                  <Input id="minProposalStake" type="number" defaultValue="100" />
                </div>
                <div>
                  <Label htmlFor="rewardRate">Staking Reward Rate (%)</Label>
                  <Input id="rewardRate" type="number" step="0.1" defaultValue="5.5" />
                </div>
                <div>
                  <Label htmlFor="maxProposalAmount">Max Proposal Amount</Label>
                  <Input id="maxProposalAmount" type="number" defaultValue="50000" />
                </div>
              </div>
              <Button className="bg-gradient-to-r from-red-600 to-orange-600">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
