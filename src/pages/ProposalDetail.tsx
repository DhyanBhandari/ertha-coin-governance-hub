
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Vote, 
  Coins, 
  Calendar, 
  User, 
  MessageCircle,
  Clock,
  Send,
  Heart,
  Share2,
  DollarSign,
  TrendingUp
} from "lucide-react";

const ProposalDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState("");
  const { toast } = useToast();

  // Mock data - in real app, fetch by ID
  const proposal = {
    id: 1,
    title: "Community Tree Planting Initiative",
    description: `This comprehensive proposal aims to establish a large-scale tree planting initiative across deforested areas in our region. The project will focus on native species restoration to maximize carbon sequestration potential and enhance local biodiversity.

## Project Goals
- Plant 10,000 native trees across 50 hectares
- Create wildlife corridors to connect fragmented habitats
- Engage 500+ community volunteers in the planting process
- Monitor and maintain plantings for 3 years post-installation

## Environmental Impact
- Sequester approximately 2,500 tons of CO2 over 20 years
- Restore habitat for local wildlife species
- Improve soil health and prevent erosion
- Enhance local air and water quality

## Implementation Timeline
- Phase 1 (Months 1-2): Site preparation and seedling procurement
- Phase 2 (Months 3-4): Community volunteer training and planting events
- Phase 3 (Months 5-36): Monitoring, maintenance, and growth tracking

## Budget Breakdown
- Seedlings and planting supplies: 3,000 Ertha Coins
- Site preparation and tools: 1,000 Ertha Coins
- Community engagement events: 500 Ertha Coins
- Monitoring and maintenance: 500 Ertha Coins

This initiative represents a significant step toward our regenerative goals and will serve as a model for future environmental restoration projects.`,
    author: "Alex Johnson",
    authorRole: "Environmental Scientist",
    requestedCoins: 5000,
    raisedCoins: 1250,
    deadline: "2024-07-15",
    status: "active",
    votes: { yes: 234, no: 56, total: 290 },
    timeLeft: "5 days",
    createdAt: "2024-06-15",
    investments: 8,
    comments: [
      {
        id: 1,
        author: "Sarah Chen",
        role: "Guardian",
        content: "This is exactly the kind of initiative we need! The detailed planning and focus on native species shows real environmental expertise.",
        timestamp: "2 hours ago",
        likes: 12
      },
      {
        id: 2,
        author: "Mike Torres",
        role: "Contributor",
        content: "I love the community engagement aspect. Have you considered partnering with local schools for educational opportunities?",
        timestamp: "1 day ago",
        likes: 8
      },
      {
        id: 3,
        author: "Emma Wilson",
        role: "Citizen",
        content: "The monitoring plan is thorough. Will there be regular progress reports shared with the community?",
        timestamp: "2 days ago",
        likes: 5
      }
    ]
  };

  const handleVote = (vote: "yes" | "no") => {
    toast({
      title: "Vote Recorded!",
      description: `Your ${vote} vote has been recorded for this proposal.`,
    });
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      toast({
        title: "Comment Added!",
        description: "Your comment has been posted.",
      });
      setComment("");
    }
  };

  const handleInvestment = () => {
    const amount = parseInt(investmentAmount);
    if (amount > 0) {
      toast({
        title: "Investment Successful!",
        description: `You've invested ${amount} Ertha Coins in this proposal.`,
      });
      setShowInvestmentForm(false);
      setInvestmentAmount("");
    }
  };

  const yesPercentage = (proposal.votes.yes / proposal.votes.total) * 100;
  const noPercentage = (proposal.votes.no / proposal.votes.total) * 100;
  const fundingPercentage = (proposal.raisedCoins / proposal.requestedCoins) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/governance" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Governance
        </Link>

        {/* Proposal Header */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-green-100 text-green-800">
                    {proposal.status}
                  </Badge>
                  <span className="text-sm text-gray-500">Proposal #{proposal.id}</span>
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-4">{proposal.title}</CardTitle>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {proposal.author} ({proposal.authorRole})
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Created {proposal.createdAt}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {proposal.timeLeft} remaining
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {proposal.investments} investors
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200 min-w-[200px] text-center">
                <div className="flex items-center justify-center mb-2">
                  <Coins className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-sm text-yellow-700">Requested</span>
                </div>
                <div className="text-2xl font-bold text-yellow-800">{proposal.requestedCoins.toLocaleString()}</div>
                <div className="text-sm text-yellow-600">Ertha Coins</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Proposal Description */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle>Proposal Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-green max-w-none">
                  {proposal.description.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{paragraph.slice(3)}</h2>;
                    }
                    if (paragraph.startsWith('- ')) {
                      return <li key={index} className="text-gray-700 mb-1">{paragraph.slice(2)}</li>;
                    }
                    if (paragraph.trim()) {
                      return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{paragraph}</p>;
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Discussion ({proposal.comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <form onSubmit={handleComment} className="space-y-4">
                  <Textarea
                    placeholder="Share your thoughts on this proposal..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border-green-200"
                    rows={3}
                  />
                  <Button type="submit" disabled={!comment.trim()} className="earth-gradient">
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {proposal.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {comment.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{comment.author}</div>
                            <div className="text-sm text-gray-600">{comment.role} • {comment.timestamp}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                          <Heart className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Funding Progress */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="w-5 h-5 mr-2 text-yellow-600" />
                  Funding Progress
                </CardTitle>
                <CardDescription>{proposal.raisedCoins} / {proposal.requestedCoins} coins raised</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={fundingPercentage} className="h-4 bg-gray-200">
                  <div className="h-full bg-yellow-500 rounded-full transition-all duration-300" />
                </Progress>
                <div className="text-center text-lg font-bold text-yellow-600">
                  {fundingPercentage.toFixed(1)}% funded
                </div>
                
                {proposal.status === "active" && (
                  <>
                    {showInvestmentForm ? (
                      <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Label className="text-blue-800 font-medium">Invest in this proposal</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-4 h-4" />
                          <Input
                            type="number"
                            placeholder="Amount of coins"
                            value={investmentAmount}
                            onChange={(e) => setInvestmentAmount(e.target.value)}
                            className="pl-10 border-blue-200"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={handleInvestment}
                            disabled={!investmentAmount || parseInt(investmentAmount) <= 0}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Coins className="w-4 h-4 mr-2" />
                            Invest
                          </Button>
                          <Button
                            onClick={() => setShowInvestmentForm(false)}
                            variant="outline"
                            className="border-blue-200 text-blue-700"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setShowInvestmentForm(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Invest Coins
                      </Button>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Voting Results */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Vote className="w-5 h-5 mr-2 text-green-600" />
                  Voting Results
                </CardTitle>
                <CardDescription>{proposal.votes.total} total votes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">Yes ({proposal.votes.yes})</span>
                    <span className="text-green-600 font-bold">{yesPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={yesPercentage} className="h-3 bg-gray-200">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-300" />
                  </Progress>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600 font-medium">No ({proposal.votes.no})</span>
                    <span className="text-red-600 font-bold">{noPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={noPercentage} className="h-3 bg-gray-200">
                    <div className="h-full bg-red-500 rounded-full transition-all duration-300" />
                  </Progress>
                </div>

                {proposal.status === "active" && (
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <Button
                      onClick={() => handleVote("yes")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Vote className="w-4 h-4 mr-2" />
                      Vote Yes
                    </Button>
                    <Button
                      onClick={() => handleVote("no")}
                      variant="outline"
                      className="w-full border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <Vote className="w-4 h-4 mr-2" />
                      Vote No
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Share */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-blue-600" />
                  Share Proposal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalDetail;
