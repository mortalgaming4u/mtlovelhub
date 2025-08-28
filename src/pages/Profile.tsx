import { Link } from "react-router-dom";
import { User, Star, BookOpen, Award, FileText, LogOut, Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Profile = () => {
  // Mock user data
  const userData = {
    username: "BookLover2024",
    email: "user@example.com",
    joinDate: "January 2024",
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    weeklyQuota: { used: 1, total: 3 },
    tickets: 850,
    stats: {
      novelsRead: 42,
      chaptersRead: 1247,
      hoursRead: 156,
      reviewsWritten: 18,
      requestsSubmitted: 8,
    },
    recentActivity: [
      { type: "read", novel: "Cultivation Chat Group", chapter: 3201, time: "2 hours ago" },
      { type: "review", novel: "Library of Heaven's Path", rating: 5, time: "1 day ago" },
      { type: "request", novel: "New Fantasy Novel", status: "pending", time: "3 days ago" },
    ],
    achievements: [
      { name: "First Steps", description: "Read your first novel", icon: BookOpen, unlocked: true },
      { name: "Reviewer", description: "Write 10 reviews", icon: Star, unlocked: true },
      { name: "Dedicated Reader", description: "Read 50 novels", icon: Award, unlocked: false, progress: 42 },
      { name: "Community Helper", description: "Submit 10 requests", icon: FileText, unlocked: false, progress: 8 },
    ]
  };

  const xpProgress = (userData.xp / userData.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <User className="h-10 w-10 text-primary" />
            Profile Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your account and track your reading journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 bg-gradient-card border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{userData.username}</h3>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <nav className="space-y-2">
                  <Button variant="default" size="sm" asChild className="w-full justify-start bg-gradient-primary">
                    <Link to="/profile">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                    <Link to="/profile/perks">
                      <Crown className="h-4 w-4 mr-2" />
                      Perks & Levels
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                    <Link to="/profile/request-serie">
                      <FileText className="h-4 w-4 mr-2" />
                      My Novel Requests
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                    <Link to="/profile/reports">
                      <Settings className="h-4 w-4 mr-2" />
                      My Reports
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild className="w-full justify-start">
                    <Link to="/profile/contributions">
                      <Award className="h-4 w-4 mr-2" />
                      Contributions
                    </Link>
                  </Button>
                </nav>
                
                <Separator />
                
                <Button variant="outline" size="sm" className="w-full justify-start text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-2 space-y-8">
            {/* Level & XP Card */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-accent" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-primary">Level {userData.level}</div>
                    <div className="text-sm text-muted-foreground">Member since {userData.joinDate}</div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground px-3 py-2 text-lg font-bold">
                    {userData.tickets} Tickets
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>XP Progress</span>
                    <span>{userData.xp} / {userData.nextLevelXp}</span>
                  </div>
                  <Progress value={xpProgress} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    {userData.nextLevelXp - userData.xp} XP until level {userData.level + 1}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Quota */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Weekly Request Quota</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold">
                      {userData.weeklyQuota.used} / {userData.weeklyQuota.total} Used
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Resets every Sunday. Additional requests cost tickets.
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/profile/request-serie">
                      Request Novel
                    </Link>
                  </Button>
                </div>
                <Progress 
                  value={(userData.weeklyQuota.used / userData.weeklyQuota.total) * 100} 
                  className="h-2" 
                />
              </CardContent>
            </Card>

            {/* Reading Stats */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Reading Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.novelsRead}</div>
                    <div className="text-sm text-muted-foreground">Novels Read</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.chaptersRead.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Chapters</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.hoursRead}</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{userData.stats.reviewsWritten}</div>
                    <div className="text-sm text-muted-foreground">Reviews</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {userData.achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-smooth ${
                        achievement.unlocked 
                          ? "bg-emerald-50 border-emerald-200" 
                          : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className={`p-3 rounded-full ${
                        achievement.unlocked 
                          ? "bg-emerald-100 text-emerald-600" 
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{achievement.name}</h4>
                          {achievement.unlocked && (
                            <Badge className="bg-emerald-100 text-emerald-800">Unlocked</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        {!achievement.unlocked && achievement.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{achievement.progress} / 50</span>
                            </div>
                            <Progress value={(achievement.progress / 50) * 100} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gradient-card border-0 shadow-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {activity.type === "read" && <BookOpen className="h-4 w-4 text-primary" />}
                        {activity.type === "review" && <Star className="h-4 w-4 text-primary" />}
                        {activity.type === "request" && <FileText className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        {activity.type === "read" && (
                          <p className="text-sm">
                            Read chapter {activity.chapter} of <strong>{activity.novel}</strong>
                          </p>
                        )}
                        {activity.type === "review" && (
                          <p className="text-sm">
                            Gave {activity.rating} stars to <strong>{activity.novel}</strong>
                          </p>
                        )}
                        {activity.type === "request" && (
                          <p className="text-sm">
                            Requested <strong>{activity.novel}</strong> - Status: {activity.status}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;