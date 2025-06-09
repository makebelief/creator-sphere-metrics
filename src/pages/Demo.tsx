
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
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Badge className="mb-4 bg-green-100 text-green-800">Live Demo Portfolio</Badge>
        </div>

        {/* Portfolio Card */}
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 text-center">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                CU
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Creative User</h1>
            <p className="text-purple-100 mb-4">Digital Creator & Influencer</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-purple-100">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Los Angeles, CA
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
                Passionate about lifestyle, technology, and creative content. 
                Helping brands connect with audiences through authentic storytelling 
                and engaging visual content across multiple platforms.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-5 w-5 text-purple-600 mr-1" />
                </div>
                <p className="text-2xl font-bold text-gray-800">125K+</p>
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
                <p className="text-2xl font-bold text-gray-800">890K</p>
                <p className="text-sm text-gray-600">Monthly Reach</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-semibold text-center mb-6">Connect With Me</h3>
              
              <Button 
                variant="outline" 
                className="w-full justify-between h-16 hover:bg-pink-50 border-pink-200 hover:border-pink-300"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <Instagram className="h-6 w-6 text-pink-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-gray-600">45.2K followers</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-between h-16 hover:bg-red-50 border-red-200 hover:border-red-300"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <Youtube className="h-6 w-6 text-red-600 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">YouTube</p>
                      <p className="text-sm text-gray-600">38.9K subscribers</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-between h-16 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <Twitter className="h-6 w-6 text-blue-500 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-gray-600">28.1K followers</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </Button>

              <Button 
                variant="outline" 
                className="w-full justify-between h-16 hover:bg-blue-50 border-blue-200 hover:border-blue-300"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <Linkedin className="h-6 w-6 text-blue-700 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-600">13.2K connections</p>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </a>
              </Button>
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
