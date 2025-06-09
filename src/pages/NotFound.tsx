
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would search through available content
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const suggestedLinks = [
    { href: "/", label: "Home", description: "Return to the main page" },
    { href: "/demo", label: "Demo Portfolio", description: "View a sample creator portfolio" },
    { href: "/login", label: "Sign In", description: "Access your account" },
    { href: "/signup", label: "Sign Up", description: "Create a new account" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8 text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold text-purple-600 mb-4">404</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
              <p className="text-gray-600 text-lg">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Current Path Info */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">You tried to visit:</p>
              <code className="text-sm font-mono text-gray-800 bg-white px-2 py-1 rounded">
                {location.pathname}
              </code>
            </div>

            {/* Search */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for content..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <Button type="submit" variant="outline">
                  Search
                </Button>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <Home className="h-4 w-4 mr-2" />
                    Go to Homepage
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
            </div>

            {/* Suggested Links */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggested Pages</h3>
              <div className="grid gap-3 text-left">
                {suggestedLinks.map((link) => (
                  <Link 
                    key={link.href}
                    to={link.href}
                    className="block p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
                  >
                    <div className="font-medium text-purple-600">{link.label}</div>
                    <div className="text-sm text-gray-600">{link.description}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Text */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Still having trouble? Try refreshing the page or{" "}
                <a href="mailto:support@creatorlink.com" className="text-purple-600 hover:text-purple-700">
                  contact support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
