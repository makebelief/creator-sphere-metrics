
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin,
  ExternalLink,
  Settings,
  Share2
} from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { RateCard } from "@/components/RateCard";
import { SocialPlatforms } from "@/components/SocialPlatforms";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  // Mock data - in real app this would come from your Go backend
  const stats = {
    totalFollowers: 125430,
    engagementRate: 4.8,
    monthlyReach: 890000,
    estimatedEarnings: 2840
  };

  const socialAccounts = [
    { platform: "Instagram", handle: "@creativeuser", followers: 45200, engagement: 5.2, icon: Instagram, color: "text-pink-600" },
    { platform: "YouTube", handle: "Creative Channel", followers: 38900, engagement: 4.1, icon: Youtube, color: "text-red-600" },
    { platform: "Twitter", handle: "@creativeuser", followers: 28100, engagement: 3.8, icon: Twitter, color: "text-blue-500" },
    { platform: "LinkedIn", handle: "Creative User", followers: 13230, engagement: 6.2, icon: Linkedin, color: "text-blue-700" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CreatorLink
            </Link>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Pro</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/portfolio/preview">
                <Share2 className="h-4 w-4 mr-2" />
                Share Portfolio
              </Link>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Creative User! 👋</h1>
          <p className="text-gray-600">Here's how your content is performing across all platforms.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalFollowers.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.engagementRate}%</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Reach</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats.monthlyReach / 1000).toFixed(0)}K</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Est. Monthly Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.estimatedEarnings.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="platforms">Platforms</TabsTrigger>
            <TabsTrigger value="rate-card">Rate Card</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Growth Analytics</CardTitle>
                  <CardDescription>Your follower growth across all platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsChart />
                </CardContent>
              </Card>
            </div>

            {/* Platform Performance */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Engagement metrics by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialAccounts.map((account) => (
                    <div key={account.platform} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <account.icon className={`h-8 w-8 ${account.color}`} />
                        <div>
                          <h3 className="font-medium">{account.platform}</h3>
                          <p className="text-sm text-gray-600">{account.handle}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{account.followers.toLocaleString()} followers</p>
                        <p className="text-sm text-gray-600">{account.engagement}% engagement</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <SocialPlatforms platforms={socialAccounts} />
          </TabsContent>

          <TabsContent value="rate-card">
            <RateCard 
              followers={stats.totalFollowers}
              engagementRate={stats.engagementRate}
              platforms={socialAccounts}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
