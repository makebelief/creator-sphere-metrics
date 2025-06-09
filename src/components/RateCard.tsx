
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Star } from "lucide-react";

interface RateCardProps {
  followers: number;
  engagementRate: number;
  platforms: Array<{
    platform: string;
    followers: number;
    engagement: number;
  }>;
}

export const RateCard = ({ followers, engagementRate, platforms }: RateCardProps) => {
  // Calculate suggested rates based on followers and engagement
  const calculateRate = (followers: number, engagement: number, type: string) => {
    const baseRate = followers * 0.01; // $0.01 per follower as base
    const engagementMultiplier = engagement / 100;
    
    switch (type) {
      case 'story':
        return Math.round(baseRate * 0.5 * engagementMultiplier);
      case 'post':
        return Math.round(baseRate * engagementMultiplier);
      case 'reel':
        return Math.round(baseRate * 1.5 * engagementMultiplier);
      case 'campaign':
        return Math.round(baseRate * 2 * engagementMultiplier);
      default:
        return Math.round(baseRate * engagementMultiplier);
    }
  };

  const totalRate = platforms.reduce((sum, platform) => {
    return sum + calculateRate(platform.followers, platform.engagement, 'post');
  }, 0);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Professional Rate Card</CardTitle>
              <CardDescription className="text-purple-100">
                AI-generated pricing based on your metrics
              </CardDescription>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              <Star className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold">{followers.toLocaleString()}</p>
              <p className="text-purple-100">Total Reach</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{engagementRate}%</p>
              <p className="text-purple-100">Avg. Engagement</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{platforms.length}</p>
              <p className="text-purple-100">Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">${totalRate}</p>
              <p className="text-purple-100">Starting Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Content Rates</CardTitle>
            <CardDescription>Suggested pricing for different content types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Instagram Story</h4>
                <p className="text-sm text-gray-600">24-hour visibility</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${calculateRate(45200, 5.2, 'story')}</p>
                <p className="text-xs text-gray-600">per story</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Feed Post</h4>
                <p className="text-sm text-gray-600">Permanent placement</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${calculateRate(45200, 5.2, 'post')}</p>
                <p className="text-xs text-gray-600">per post</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Reel/Video</h4>
                <p className="text-sm text-gray-600">High engagement content</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${calculateRate(45200, 5.2, 'reel')}</p>
                <p className="text-xs text-gray-600">per video</p>
              </div>
            </div>

            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Campaign Package</h4>
                <p className="text-sm text-gray-600">Multi-platform campaign</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">${calculateRate(followers, engagementRate, 'campaign')}</p>
                <p className="text-xs text-gray-600">starting from</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Platform Breakdown</CardTitle>
            <CardDescription>Individual platform rates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {platforms.map((platform) => (
              <div key={platform.platform} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{platform.platform}</h4>
                  <p className="text-sm text-gray-600">
                    {platform.followers.toLocaleString()} followers • {platform.engagement}% engagement
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${calculateRate(platform.followers, platform.engagement, 'post')}</p>
                  <p className="text-xs text-gray-600">per post</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
          <Download className="h-4 w-4 mr-2" />
          Download Rate Card PDF
        </Button>
      </div>
    </div>
  );
};
