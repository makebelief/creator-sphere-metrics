
import { useState, useEffect } from "react";
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
  Share2,
  LogOut
} from "lucide-react";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { RateCard } from "@/components/RateCard";
import { SocialPlatforms } from "@/components/SocialPlatforms";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useSocialAccounts } from "@/hooks/useSocialAccounts";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const { accounts, loading: accountsLoading } = useSocialAccounts();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      navigate("/");
    }
  };

  if (!user || profileLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate stats from real data
  const totalFollowers = accounts.reduce((sum, account) => sum + (account.followers_count || 0), 0);
  const avgEngagement = accounts.length > 0 
    ? accounts.reduce((sum, account) => sum + (account.engagement_rate || 0), 0) / accounts.length 
    : 0;

  // Map social accounts to the format expected by components
  const socialPlatformsData = accounts.map(account => ({
    platform: account.platform,
    handle: `@${account.username}`,
    followers: account.followers_count || 0,
    engagement: account.engagement_rate || 0,
    icon: account.platform === 'instagram' ? Instagram :
          account.platform === 'youtube' ? Youtube :
          account.platform === 'twitter' ? Twitter : Linkedin,
    color: account.platform === 'instagram' ? "text-pink-600" :
           account.platform === 'youtube' ? "text-red-600" :
           account.platform === 'twitter' ? "text-blue-500" : "text-blue-700"
  }));

  // Map for RateCard component
  const rateCardPlatforms = accounts.map(account => ({
    platform: account.platform,
    followers: account.followers_count || 0,
    engagement: account.engagement_rate || 0
  }));

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
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {profile?.full_name || 'Creator'}! 👋
          </h1>
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
              <div className="text-2xl font-bold">{totalFollowers.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                Connect more platforms to track growth
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgEngagement.toFixed(1)}%</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                {accounts.length} platforms connected
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Connected Platforms</CardTitle>
              <TrendingUp className="h-4 w-4 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.length}</div>
              <p className="text-xs text-gray-600 flex items-center mt-1">
                Add more to increase reach
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Views</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">-</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                Share your portfolio to track views
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
            {accounts.length > 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Platform Performance</CardTitle>
                  <CardDescription>Engagement metrics by platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {socialPlatformsData.map((account, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center space-x-4">
                          <account.icon className={`h-8 w-8 ${account.color}`} />
                          <div>
                            <h3 className="font-medium capitalize">{account.platform}</h3>
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
            ) : (
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">No platforms connected yet</h3>
                  <p className="text-gray-600 mb-4">Connect your social media accounts to see analytics</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
                    Connect Platform
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="platforms">
            <SocialPlatforms platforms={socialPlatformsData} />
          </TabsContent>

          <TabsContent value="rate-card">
            <RateCard 
              followers={totalFollowers}
              engagementRate={avgEngagement}
              platforms={rateCardPlatforms}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
