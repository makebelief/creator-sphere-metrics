
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Linkedin, 
  ExternalLink, 
  ArrowLeft,
  MapPin,
  Calendar,
  Users,
  TrendingUp
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Demo = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchUserPortfolio();
    } else {
      // Show demo data if no user ID
      setLoading(false);
    }
  }, [userId]);

  const fetchUserPortfolio = async () => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      // Fetch social accounts
      const { data: accountsData } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', userId);

      setProfile(profileData);
      setSocialAccounts(accountsData || []);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    );
  };

  // Use real data if available, otherwise show demo
  const displayName = profile?.full_name || "Creative User";
  const displayBio = profile?.bio || "Passionate about lifestyle, technology, and creative content. Helping brands connect with audiences through authentic storytelling and engaging visual content across multiple platforms.";
  const displayLocation = profile?.location || "Los Angeles, CA";
  const totalFollowers = socialAccounts.reduce((sum, account) => sum + (account.followers_count || 0), 0) || 125000;

  const platformIcons = {
    instagram: Instagram,
    youtube: Youtube,
    twitter: Twitter,
    linkedin: Linkedin,
  };

  const platformColors = {
    instagram: "text-pink-600 border-pink-200 hover:border-pink-300 hover:bg-pink-50",
    youtube: "text-red-600 border-red-200 hover:border-red-300 hover:bg-red-50",
    twitter: "text-blue-500 border-blue-200 hover:border-blue-300 hover:bg-blue-50",
    linkedin: "text-blue-700 border-blue-200 hover:border-blue-300 hover:bg-blue-50",
  };

  // Demo data fallback with placeholder URLs
  const demoSocialAccounts = [
    { platform: "instagram", handle: "@creativeuser", followers: 45200, url: "https://instagram.com/creativeuser" },
    { platform: "youtube", handle: "Creative Channel", followers: 38900, url: "https://youtube.com/@creativechannel" },
    { platform: "twitter", handle: "@creativeuser", followers: 28100, url: "https://twitter.com/creativeuser" },
    { platform: "linkedin", handle: "Creative User", followers: 13200, url: "https://linkedin.com/in/creativeuser" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          {!userId && <Badge className="mb-4 bg-green-100 text-green-800">Live Demo Portfolio</Badge>}
        </div>

        {/* Portfolio Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {displayName.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{displayName}</h1>
            <p className="text-purple-100 mb-4">Digital Creator & Influencer</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-purple-100">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {displayLocation}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Creator since 2020
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Bio Section */}
            <div className="text-center mb-8">
              <p className="text-gray-600 leading-relaxed">
                {displayBio}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-purple-600 mr-1" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{totalFollowers.toLocaleString()}+</p>
                <p className="text-sm text-gray-600">Total Followers</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-1" />
                </div>
                <p className="text-2xl font-bold text-gray-800">4.8%</p>
                <p className="text-sm text-gray-600">Avg Engagement</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <ExternalLink className="h-5 w-5 text-cyan-600 mr-1" />
                </div>
                <p className="text-2xl font-bold text-gray-800">{socialAccounts.length || 4}</p>
                <p className="text-sm text-gray-600">Platforms</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-center mb-6">Connect With Me</h3>
              
              {socialAccounts.length > 0 ? (
                socialAccounts.map((account) => {
                  const Icon = platformIcons[account.platform as keyof typeof platformIcons] || ExternalLink;
                  const colorClass = platformColors[account.platform as keyof typeof platformColors] || "text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                  
                  return (
                    <Button 
                      key={account.id}
                      variant="outline" 
                      className={`w-full justify-between h-16 ${colorClass}`}
                      asChild
                    >
                      <a href={account.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                          <Icon className="h-6 w-6 mr-3" />
                          <div className="text-left">
                            <p className="font-medium capitalize">{account.platform}</p>
                            <p className="text-sm text-gray-600">{(account.followers_count || 0).toLocaleString()} followers</p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </a>
                    </Button>
                  );
                })
              ) : (
                // Demo data fallback
                demoSocialAccounts.map((account) => {
                  const Icon = platformIcons[account.platform as keyof typeof platformIcons] || ExternalLink;
                  const colorClass = platformColors[account.platform as keyof typeof platformColors] || "text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                  
                  return (
                    <Button 
                      key={account.platform}
                      variant="outline" 
                      className={`w-full justify-between h-16 ${colorClass}`}
                      asChild
                    >
                      <a href={account.url} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center">
                          <Icon className="h-6 w-6 mr-3" />
                          <div className="text-left">
                            <p className="font-medium capitalize">{account.platform}</p>
                            <p className="text-sm text-gray-600">{account.followers.toLocaleString()} followers</p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </a>
                    </Button>
                  );
                })
              )}
            </div>

            {/* Collaboration CTA */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Let's Collaborate!</h3>
              <p className="text-purple-100 mb-4">
                Looking for authentic partnerships with brands that align with my values.
              </p>
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Get In Touch
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Powered by */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            Powered by{" "}
            <Link to="/" className="text-purple-600 hover:text-purple-700 font-medium">
              CreatorLink
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;
