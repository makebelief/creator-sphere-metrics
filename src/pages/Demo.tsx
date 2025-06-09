
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
  TrendingUp,
  AlertCircle,
  Wifi,
  RefreshCw
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Demo = () => {
  const { userId } = useParams();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [socialAccounts, setSocialAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (userId && error) {
        fetchUserPortfolio();
      }
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [userId, error]);

  useEffect(() => {
    if (userId) {
      fetchUserPortfolio();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchUserPortfolio = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(userId)) {
        throw new Error('Invalid user ID format');
      }

      // Add timeout to prevent hanging requests
      const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      // Fetch profile with error handling
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      // Fetch social accounts with error handling
      const accountsPromise = supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', userId);

      const [profileResult, accountsResult] = await Promise.race([
        Promise.all([profilePromise, accountsPromise]),
        timeout
      ]) as any;

      // Handle profile data
      if (profileResult.error) {
        console.error('Profile fetch error:', profileResult.error);
        throw new Error('Failed to load profile data');
      }

      // Handle social accounts data
      if (accountsResult.error) {
        console.error('Social accounts fetch error:', accountsResult.error);
        throw new Error('Failed to load social accounts');
      }

      const profileData = profileResult.data;
      const accountsData = accountsResult.data || [];

      // Validate and sanitize data
      if (profileData) {
        // Sanitize profile data
        const sanitizedProfile = {
          ...profileData,
          full_name: profileData.full_name?.trim() || null,
          bio: profileData.bio?.trim() || null,
          location: profileData.location?.trim() || null
        };
        setProfile(sanitizedProfile);
      }

      // Validate and sanitize social accounts
      const validAccounts = accountsData.filter(account => {
        return account.platform && 
               account.url && 
               account.url.startsWith('http') &&
               account.followers_count >= 0;
      }).map(account => ({
        ...account,
        followers_count: Math.max(0, account.followers_count || 0),
        engagement_rate: Math.max(0, Math.min(100, account.engagement_rate || 0))
      }));

      setSocialAccounts(validAccounts);
      setRetryCount(0);

      // Show success message if this was a retry
      if (retryCount > 0) {
        toast({
          title: "Portfolio loaded successfully",
          description: "Data has been refreshed."
        });
      }

    } catch (error: any) {
      console.error('Error fetching portfolio:', error);
      
      let errorMessage = 'Failed to load portfolio';
      
      if (!isOnline) {
        errorMessage = 'No internet connection';
      } else if (error.message === 'Request timeout') {
        errorMessage = 'Request timed out - please try again';
      } else if (error.message === 'Invalid user ID format') {
        errorMessage = 'Invalid portfolio ID';
      } else if (error.message?.includes('JSON')) {
        errorMessage = 'Server response error';
      }
      
      setError(errorMessage);
      
      toast({
        title: "Error loading portfolio",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchUserPortfolio();
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
          {retryCount > 0 && (
            <p className="text-sm text-gray-500 mt-2">Retry attempt {retryCount}</p>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error && userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="mb-4">
                {!isOnline ? (
                  <Wifi className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
                )}
              </div>
              
              <h2 className="text-xl font-semibold mb-2">
                {!isOnline ? 'No Internet Connection' : 'Portfolio Not Found'}
              </h2>
              
              <p className="text-gray-600 mb-6">
                {!isOnline 
                  ? 'Please check your internet connection and try again.'
                  : error === 'Invalid portfolio ID'
                    ? 'The portfolio you\'re looking for doesn\'t exist or has been removed.'
                    : 'We couldn\'t load this portfolio. This might be a temporary issue.'
                }
              </p>
              
              {isOnline && (
                <div className="space-y-3">
                  <Button 
                    onClick={handleRetry} 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Try Again
                  </Button>
                  
                  <Link to="/" className="block">
                    <Button variant="outline" className="w-full">
                      Go to Homepage
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Use real data if available, otherwise show demo
  const displayName = profile?.full_name?.trim() || "Creative User";
  const displayBio = profile?.bio?.trim() || "Passionate about lifestyle, technology, and creative content. Helping brands connect with audiences through authentic storytelling and engaging visual content across multiple platforms.";
  const displayLocation = profile?.location?.trim() || "Los Angeles, CA";
  
  // Calculate total followers safely
  const totalFollowers = socialAccounts.length > 0 
    ? socialAccounts.reduce((sum, account) => sum + Math.max(0, account.followers_count || 0), 0)
    : 125000;

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

  // Demo data fallback
  const demoSocialAccounts = [
    { platform: "instagram", handle: "@creativeuser", followers: 45200, url: "https://instagram.com/creativeuser" },
    { platform: "youtube", handle: "Creative Channel", followers: 38900, url: "https://youtube.com/@creativechannel" },
    { platform: "twitter", handle: "@creativeuser", followers: 28100, url: "https://twitter.com/creativeuser" },
    { platform: "linkedin", handle: "Creative User", followers: 13200, url: "https://linkedin.com/in/creativeuser" }
  ];

  const socialAccountsToShow = socialAccounts.length > 0 ? socialAccounts : demoSocialAccounts;

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
          {!isOnline && (
            <Alert className="mb-4 border-orange-200 bg-orange-50">
              <Wifi className="h-4 w-4" />
              <AlertDescription>
                You're currently offline. Some features may not work properly.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Portfolio Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
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
                <p className="text-2xl font-bold text-gray-800">{socialAccountsToShow.length}</p>
                <p className="text-sm text-gray-600">Platforms</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-center mb-6">Connect With Me</h3>
              
              {socialAccountsToShow.length > 0 ? (
                socialAccountsToShow.map((account, index) => {
                  const Icon = platformIcons[account.platform as keyof typeof platformIcons] || ExternalLink;
                  const colorClass = platformColors[account.platform as keyof typeof platformColors] || "text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50";
                  
                  // Validate URL before rendering
                  const isValidUrl = account.url && (account.url.startsWith('http://') || account.url.startsWith('https://'));
                  
                  return (
                    <Button 
                      key={account.id || `demo-${index}`}
                      variant="outline" 
                      className={`w-full justify-between h-16 ${colorClass}`}
                      asChild={isValidUrl}
                      disabled={!isValidUrl}
                    >
                      {isValidUrl ? (
                        <a 
                          href={account.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!isOnline) {
                              e.preventDefault();
                              toast({
                                title: "No internet connection",
                                description: "Cannot open external links while offline.",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          <div className="flex items-center">
                            <Icon className="h-6 w-6 mr-3" />
                            <div className="text-left">
                              <p className="font-medium capitalize">{account.platform}</p>
                              <p className="text-sm text-gray-600">
                                {Math.max(0, account.followers || account.followers_count || 0).toLocaleString()} followers
                              </p>
                            </div>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        </a>
                      ) : (
                        <div className="w-full flex justify-between items-center">
                          <div className="flex items-center">
                            <Icon className="h-6 w-6 mr-3" />
                            <div className="text-left">
                              <p className="font-medium capitalize">{account.platform}</p>
                              <p className="text-sm text-gray-600">Link unavailable</p>
                            </div>
                          </div>
                          <AlertCircle className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                    </Button>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No social accounts added yet.</p>
                </div>
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
