
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  Vote, 
  Plus, 
  Clock, 
  Users, 
  Coins,
  ArrowRight,
  Filter,
  Search,
  Calendar,
  MessageCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Governance = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  const proposals = [
    {
      id: 1,
      title: "Community Tree Planting Initiative",
      description: "Fund a large-scale tree planting project in deforested areas to increase carbon sequestration and biodiversity.",
      author: "Alex Johnson",
      requestedCoins: 5000,
      deadline: "2024-07-15",
      status: "active",
      votes: { yes: 234, no: 56, total: 290 },
      comments: 23,
      timeLeft: "5 days"
    },
    {
      id: 2,
      title: "Solar Panel Installation Program",
      description: "Install solar panels in community centers to reduce carbon footprint and energy costs.",
      author: "Sarah Chen",
      requestedCoins: 12000,
      deadline: "2024-07-20",
      status: "active",
      votes: { yes: 189, no: 34, total: 223 },
      comments: 15,
      timeLeft: "10 days"
    },
    {
      id: 3,
      title: "Sustainable Education Workshop Series",
      description: "Create educational workshops to teach sustainable living practices to community members.",
      author: "Mike Torres",
      requestedCoins: 3000,
      deadline: "2024-06-30",
      status: "completed",
      votes: { yes: 456, no: 89, total: 545 },
      comments: 31,
      timeLeft: "Completed"
    }
  ];

  const handleCreateProposal = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Proposal Created!",
      description: "Your proposal has been submitted for community voting.",
    });
    setShowCreateForm(false);
  };

  const handleVote = (proposalId: number, vote: "yes" | "no") => {
    toast({
      title: "Vote Recorded!",
      description: `Your ${vote} vote has been recorded for proposal #${proposalId}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                DAO Governance
              </h1>
              <p className="text-gray-600">Participate in democratic decision-making for our regenerative ecosystem</p>
            </div>
            <Button 
              onClick={() => setShowCreateForm(true)}
              className="earth-gradient hover:scale-105 transition-transform duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search proposals..." className="pl-10 border-green-200" />
          </div>
          <div className="flex gap-2">
            {["all", "active", "pending", "completed"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(status)}
                className={filter === status ? "earth-gradient" : "border-green-200 text-green-700 hover:bg-green-50"}
              >
                <Filter className="w-4 h-4 mr-2" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Create Proposal Form */}
        {showCreateForm && (
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2 text-green-600" />
                Create New Proposal
              </CardTitle>
              <CardDescription>Submit a proposal for community voting</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProposal} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Proposal Title</Label>
                    <Input id="title" placeholder="Enter proposal title" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coins">Requested Coins</Label>
                    <div className="relative">
                      <Coins className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input id="coins" type="number" placeholder="5000" className="pl-10" required />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide a detailed description of your proposal..."
                    rows={4}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Voting Deadline</Label>
                  <Input id="deadline" type="date" required />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" className="earth-gradient">
                    Submit Proposal
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Proposals Grid */}
        <div className="space-y-6">
          {proposals.map((proposal) => {
            const yesPercentage = (proposal.votes.yes / proposal.votes.total) * 100;
            const noPercentage = (proposal.votes.no / proposal.votes.total) * 100;
            
            return (
              <Card key={proposal.id} className="bg-white/80 backdrop-blur-sm border-green-100 hover:bg-white transition-all duration-300 hover:scale-[1.02] eco-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{proposal.title}</h3>
                          <p className="text-gray-600 mb-4">{proposal.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>by {proposal.author}</span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {proposal.timeLeft}
                            </span>
                            <span className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {proposal.comments} comments
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(proposal.status)}>
                          {proposal.status}
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Voting Results</span>
                          <span className="text-gray-900 font-medium">{proposal.votes.total} votes</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-green-600">Yes ({proposal.votes.yes})</span>
                            <span className="text-green-600">{yesPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={yesPercentage} className="h-2 bg-gray-200">
                            <div className="h-full bg-green-500 rounded-full transition-all duration-300" />
                          </Progress>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-red-600">No ({proposal.votes.no})</span>
                            <span className="text-red-600">{noPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={noPercentage} className="h-2 bg-gray-200">
                            <div className="h-full bg-red-500 rounded-full transition-all duration-300" />
                          </Progress>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-yellow-700">Requested</span>
                          <Coins className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div className="text-2xl font-bold text-yellow-800">{proposal.requestedCoins.toLocaleString()}</div>
                        <div className="text-sm text-yellow-600">Ertha Coins</div>
                      </div>

                      {proposal.status === "active" && (
                        <div className="space-y-2">
                          <Button
                            onClick={() => handleVote(proposal.id, "yes")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Vote Yes
                          </Button>
                          <Button
                            onClick={() => handleVote(proposal.id, "no")}
                            variant="outline"
                            className="w-full border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <Vote className="w-4 h-4 mr-2" />
                            Vote No
                          </Button>
                        </div>
                      )}

                      <Link to={`/proposals/${proposal.id}`}>
                        <Button variant="outline" className="w-full border-green-200 text-green-700 hover:bg-green-50">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Governance;
