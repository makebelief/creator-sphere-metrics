
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Eye, EyeOff, AlertCircle, CheckCircle, Wifi } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [attemptCount, setAttemptCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password strength
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Real-time validation
  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email && value.trim()) {
      if (validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: undefined }));
      }
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password && value.length >= 6) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {email?: string; password?: string} = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isOnline) {
      toast({
        title: "No Internet Connection",
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Rate limiting - prevent spam attempts
    if (attemptCount >= 5) {
      toast({
        title: "Too Many Attempts",
        description: "Please wait a few minutes before trying again.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    setAttemptCount(prev => prev + 1);

    try {
      const { error } = await signIn(email.trim().toLowerCase(), password);
      
      if (error) {
        let errorMessage = "Login failed. Please try again.";
        
        // Handle specific error cases
        if (error.message?.includes('Invalid login credentials')) {
          errorMessage = "Invalid email or password. Please check your credentials.";
        } else if (error.message?.includes('Email not confirmed')) {
          errorMessage = "Please check your email and confirm your account before signing in.";
        } else if (error.message?.includes('Too many requests')) {
          errorMessage = "Too many login attempts. Please wait a few minutes.";
        } else if (error.message?.includes('network')) {
          errorMessage = "Network error. Please check your internet connection.";
        }

        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Redirecting to your dashboard...",
        });
        
        // Small delay to show success message
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset attempt count after 5 minutes
  useEffect(() => {
    if (attemptCount >= 5) {
      const timer = setTimeout(() => {
        setAttemptCount(0);
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearTimeout(timer);
    }
  }, [attemptCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            CreatorLink
          </h1>
        </div>

        {/* Offline Alert */}
        {!isOnline && (
          <Alert className="mb-6 border-orange-200 bg-orange-50">
            <Wifi className="h-4 w-4" />
            <AlertDescription>
              You're currently offline. Please check your internet connection.
            </AlertDescription>
          </Alert>
        )}

        {/* Rate Limit Warning */}
        {attemptCount >= 3 && attemptCount < 5 && (
          <Alert className="mb-6 border-yellow-200 bg-yellow-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {5 - attemptCount} login attempts remaining before temporary lockout.
            </AlertDescription>
          </Alert>
        )}

        {/* Lockout Warning */}
        {attemptCount >= 5 && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Too many failed attempts. Please wait 5 minutes before trying again.
            </AlertDescription>
          </Alert>
        )}

        <Card className="bg-white/80 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to access your creative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading || !isOnline || attemptCount >= 5}
                  className={errors.email ? "border-red-500 focus:border-red-500" : ""}
                  autoComplete="email"
                  autoCapitalize="none"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Your password"
                    required
                    disabled={loading || !isOnline || attemptCount >= 5}
                    className={`pr-10 ${errors.password ? "border-red-500 focus:border-red-500" : ""}`}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading || !password}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600"
                disabled={loading || !isOnline || attemptCount >= 5 || !email.trim() || !password}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-purple-600 hover:text-purple-700 font-medium"
                  tabIndex={loading ? -1 : 0}
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  Your data is protected with enterprise-grade security and encryption.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
