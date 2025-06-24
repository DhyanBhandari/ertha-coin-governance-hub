
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Play, 
  Award, 
  Clock, 
  Users, 
  Coins,
  CheckCircle,
  Star,
  Target,
  TrendingUp,
  Leaf,
  Globe,
  Lightbulb
} from "lucide-react";

const Learn = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  const categories = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "dao", label: "DAO Governance", icon: Users },
    { id: "sustainability", label: "Sustainability", icon: Leaf },
    { id: "environment", label: "Environment", icon: Globe },
    { id: "innovation", label: "Innovation", icon: Lightbulb },
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to DAO Governance",
      description: "Learn the fundamentals of decentralized autonomous organizations and participatory decision-making.",
      category: "dao",
      level: "Beginner",
      duration: "45 min",
      reward: 25,
      enrolled: 1247,
      rating: 4.8,
      progress: 0,
      completed: false,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 2,
      title: "Sustainable Living Practices",
      description: "Practical strategies for reducing your environmental footprint and living more sustainably.",
      category: "sustainability",
      level: "Intermediate",
      duration: "60 min",
      reward: 35,
      enrolled: 892,
      rating: 4.9,
      progress: 75,
      completed: false,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 3,
      title: "Climate Change & Carbon Sequestration",
      description: "Understanding climate science and nature-based solutions for carbon capture.",
      category: "environment",
      level: "Advanced",
      duration: "90 min",
      reward: 50,
      enrolled: 634,
      rating: 4.7,
      progress: 100,
      completed: true,
      icon: Globe,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100"
    },
    {
      id: 4,
      title: "Regenerative Agriculture Basics",
      description: "Learn about farming practices that restore soil health and ecosystem biodiversity.",
      category: "sustainability",
      level: "Intermediate",
      duration: "70 min",
      reward: 40,
      enrolled: 456,
      rating: 4.6,
      progress: 30,
      completed: false,
      icon: Leaf,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: 5,
      title: "Green Technology Innovations",
      description: "Explore cutting-edge technologies that are driving the transition to a sustainable future.",
      category: "innovation",
      level: "Advanced",
      duration: "80 min",
      reward: 45,
      enrolled: 789,
      rating: 4.8,
      progress: 0,
      completed: false,
      icon: Lightbulb,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 6,
      title: "Community Building for Sustainability",
      description: "Strategies for engaging and mobilizing communities around environmental initiatives.",
      category: "dao",
      level: "Intermediate",
      duration: "55 min",
      reward: 30,
      enrolled: 567,
      rating: 4.7,
      progress: 0,
      completed: false,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    }
  ];

  const learningStats = {
    coursesCompleted: courses.filter(c => c.completed).length,
    totalRewards: courses.filter(c => c.completed).reduce((sum, c) => sum + c.reward, 0),
    avgRating: 4.8,
    rank: "Top 12%"
  };

  const achievements = [
    { title: "First Course", description: "Complete your first course", unlocked: true, icon: BookOpen },
    { title: "Sustainability Expert", description: "Complete 5 sustainability courses", unlocked: false, progress: 40, icon: Leaf },
    { title: "Top Student", description: "Earn 200+ learning coins", unlocked: false, progress: 65, icon: Star },
    { title: "Community Leader", description: "Share knowledge in 10 discussions", unlocked: false, progress: 20, icon: Users },
  ];

  const filteredCourses = selectedCategory === "all" ? courses : courses.filter(c => c.category === selectedCategory);

  const handleStartCourse = (courseId: number, courseTitle: string) => {
    toast({
      title: "Course Started!",
      description: `You've enrolled in "${courseTitle}". Happy learning!`,
    });
  };

  const handleContinueCourse = (courseId: number, courseTitle: string) => {
    toast({
      title: "Welcome Back!",
      description: `Continue learning "${courseTitle}" where you left off.`,
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
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
            Learning Center
          </h1>
          <p className="text-gray-600">Expand your knowledge and earn Ertha Coins through educational courses</p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{learningStats.coursesCompleted}</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-yellow-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 coin-shine">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-1">{learningStats.totalRewards}</div>
              <div className="text-sm text-gray-600">Coins Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">{learningStats.avgRating}</div>
              <div className="text-sm text-gray-600">Avg. Rating</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-purple-100 eco-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-1">{learningStats.rank}</div>
              <div className="text-sm text-gray-600">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Filter */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCategory === category.id
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{category.label}</span>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-white/80 backdrop-blur-sm border-green-100 eco-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
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

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid gap-6">
              {filteredCourses.map((course) => {
                const Icon = course.icon;
                return (
                  <Card key={course.id} className="bg-white/80 backdrop-blur-sm border-green-100 hover:bg-white transition-all duration-300 hover:scale-[1.02] eco-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4 mb-4">
                            <div className={`w-12 h-12 rounded-lg ${course.bgColor} flex items-center justify-center`}>
                              <Icon className={`w-6 h-6 ${course.color}`} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                                {course.completed && (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 mb-3">
                                <Badge className={getLevelColor(course.level)}>
                                  {course.level}
                                </Badge>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                  {course.rating}
                                </div>
                              </div>
                              <p className="text-gray-600 mb-4">{course.description}</p>
                            </div>
                          </div>

                          {course.progress > 0 && !course.completed && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium text-gray-900">{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                          )}

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2" />
                              {course.duration}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Users className="w-4 h-4 mr-2" />
                              {course.enrolled} enrolled
                            </div>
                            <div className="flex items-center text-yellow-600">
                              <Coins className="w-4 h-4 mr-2" />
                              {course.reward} coins
                            </div>
                            <div className="flex items-center text-green-600">
                              <Target className="w-4 h-4 mr-2" />
                              {course.completed ? "Completed" : "Available"}
                            </div>
                          </div>
                        </div>

                        <div className="lg:w-48">
                          {course.completed ? (
                            <div className="text-center p-4 bg-green-50 rounded-lg">
                              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                              <div className="text-sm font-medium text-green-800 mb-1">Completed!</div>
                              <div className="text-xs text-green-600">+{course.reward} coins earned</div>
                            </div>
                          ) : course.progress > 0 ? (
                            <Button 
                              onClick={() => handleContinueCourse(course.id, course.title)}
                              className="w-full earth-gradient hover:scale-105 transition-transform duration-300"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Continue
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handleStartCourse(course.id, course.title)}
                              className="w-full earth-gradient hover:scale-105 transition-transform duration-300"
                            >
                              <Play className="w-4 h-4 mr-2" />
                              Start Course
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
