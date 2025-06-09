
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Plus, Settings, TrendingUp } from "lucide-react";

interface Platform {
  platform: string;
  handle: string;
  followers: number;
  engagement: number;
  icon: React.ComponentType<any>;
  color: string;
}

interface SocialPlatformsProps {
  platforms: Platform[];
}

export const SocialPlatforms = ({ platforms }: SocialPlatformsProps) => {
  return (
    <div className="space-y-6">
      {/* Add New Platform */}
      <Card className="bg-white/80 backdrop-blur-sm border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Plus className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Add New Platform</h3>
          <p className="text-gray-600 text-center mb-6">
            Connect more social media accounts to grow your portfolio
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            Connect Platform
          </Button>
        </CardContent>
      </Card>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.platform} className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <platform.icon className={`h-8 w-8 ${platform.color}`} />
                  <div>
                    <CardTitle className="text-lg">{platform.platform}</CardTitle>
                    <CardDescription>{platform.handle}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Followers */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Followers</span>
                  <span className="text-2xl font-bold">{platform.followers.toLocaleString()}</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12.5% this month
                </p>
              </div>

              {/* Engagement */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Engagement Rate</span>
                  <span className="text-lg font-semibold">{platform.engagement}%</span>
                </div>
                <Progress value={platform.engagement * 10} className="h-2" />
                <div className="flex justify-between mt-2">
                  <Badge variant={platform.engagement > 5 ? "default" : platform.engagement > 3 ? "secondary" : "destructive"}>
                    {platform.engagement > 5 ? "Excellent" : platform.engagement > 3 ? "Good" : "Needs Work"}
                  </Badge>
                  <span className="text-xs text-gray-600">Industry avg: 3.2%</span>
                </div>
              </div>

              {/* Recent Performance */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Recent Performance</h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-lg font-semibold">847</p>
                    <p className="text-xs text-gray-600">Avg Likes</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">23</p>
                    <p className="text-xs text-gray-600">Avg Comments</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">12.4K</p>
                    <p className="text-xs text-gray-600">Avg Reach</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
