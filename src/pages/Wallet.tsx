
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  Wallet, 
  Send, 
  QrCode, 
  History, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Coins,
  ArrowUpRight,
  ArrowDownLeft,
  Copy,
  Download
} from "lucide-react";

const WalletPage = () => {
  const [sendAmount, setSendAmount] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const { toast } = useToast();

  const walletData = {
    balance: 2450,
    address: "erthaloka_alex_johnson_2024",
    totalEarned: 3890,
    totalSpent: 1440
  };

  const transactions = [
    {
      id: 1,
      type: "earn",
      amount: 25,
      description: "Course completion: Sustainable Living",
      date: "2024-06-20",
      time: "14:30",
      status: "completed"
    },
    {
      id: 2,
      type: "send",
      amount: -50,
      description: "Sent to sarah@example.com",
      date: "2024-06-19",
      time: "09:15",
      status: "completed"
    },
    {
      id: 3,
      type: "earn",
      amount: 75,
      description: "Proposal voting reward",
      date: "2024-06-18",
      time: "16:45",
      status: "completed"
    },
    {
      id: 4,
      type: "earn",
      amount: 100,
      description: "Pool participation bonus",
      date: "2024-06-17",
      time: "11:20",
      status: "completed"
    },
    {
      id: 5,
      type: "send",
      amount: -30,
      description: "Sent to mike@example.com",
      date: "2024-06-16",
      time: "13:10",
      status: "pending"
    },
    {
      id: 6,
      type: "earn",
      amount: 45,
      description: "Staking rewards",
      date: "2024-06-15",
      time: "08:00",
      status: "completed"
    }
  ];

  const handleSendCoins = (e: React.FormEvent) => {
    e.preventDefault();
    if (sendAmount && recipientEmail && parseInt(sendAmount) > 0) {
      toast({
        title: "Coins Sent Successfully!",
        description: `${sendAmount} Ertha Coins sent to ${recipientEmail}`,
      });
      setSendAmount("");
      setRecipientEmail("");
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.address);
    toast({
      title: "Address Copied!",
      description: "Your wallet address has been copied to clipboard.",
    });
  };

  const downloadStatement = () => {
    toast({
      title: "Statement Downloaded!",
      description: "Your transaction statement has been downloaded.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ertha Wallet
          </h1>
          <p className="text-gray-600">Manage your Ertha Coins and track your transactions</p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 coin-shine">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{walletData.balance.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Current Balance</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{walletData.totalEarned.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-red-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">{walletData.totalSpent.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Transaction History */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <History className="w-5 h-5 mr-2 text-blue-600" />
                    Transaction History
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={downloadStatement}>
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
                <CardDescription>Your recent Ertha Coin transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-white transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === "earn" ? "bg-green-100" : "bg-red-100"
                        }`}>
                          {transaction.type === "earn" ? (
                            <ArrowDownLeft className="w-5 h-5 text-green-600" />
                          ) : (
                            <ArrowUpRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {transaction.date} at {transaction.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-semibold ${
                          transaction.type === "earn" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "earn" ? "+" : ""}{transaction.amount} EC
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
            {/* Send Coins */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-2 text-purple-600" />
                  Send Coins
                </CardTitle>
                <CardDescription>Transfer Ertha Coins to another user</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendCoins} className="space-y-4">
                  <div>
                    <Label htmlFor="recipientEmail">Recipient Email</Label>
                    <Input
                      id="recipientEmail"
                      type="email"
                      placeholder="recipient@example.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sendAmount">Amount</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="sendAmount"
                        type="number"
                        placeholder="100"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        className="pl-10"
                        max={walletData.balance}
                        required
                      />
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Available: {walletData.balance} EC
                    </div>
                  </div>
                  <Button type="submit" className="w-full earth-gradient">
                    <Send className="w-4 h-4 mr-2" />
                    Send Coins
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Wallet Address */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wallet className="w-5 h-5 mr-2 text-indigo-600" />
                  Your Wallet
                </CardTitle>
                <CardDescription>Your unique wallet address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Wallet Address</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Input 
                      value={walletData.address} 
                      readOnly 
                      className="font-mono text-sm"
                    />
                    <Button size="sm" variant="outline" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg text-center">
                  <QrCode className="w-16 h-16 mx-auto mb-3 text-gray-400" />
                  <div className="text-sm text-gray-600 mb-2">QR Code for In-Person Transfers</div>
                  <Button size="sm" variant="outline">
                    Generate QR Code
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coins Earned</span>
                  <span className="text-lg font-semibold text-green-600">+245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Coins Spent</span>
                  <span className="text-lg font-semibold text-red-600">-80</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Net Change</span>
                  <span className="text-lg font-semibold text-blue-600">+165</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Transactions</span>
                  <span className="text-lg font-semibold text-purple-600">23</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
