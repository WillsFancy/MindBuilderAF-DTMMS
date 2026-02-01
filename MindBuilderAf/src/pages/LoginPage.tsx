import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Get user role from localStorage to redirect to correct dashboard
      const userData = localStorage.getItem('dtmms_current_user');
      if (userData) {
        const user = JSON.parse(userData);
        navigate(`/${user.role}`);
      }
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  const demoAccounts = [
    { role: 'Administrator', email: 'admin@mindbuilders.org', password: 'admin123' },
    { role: 'Trainer', email: 'trainer@mindbuilders.org', password: 'trainer123' },
    { role: 'Mentor', email: 'mentor@mindbuilders.org', password: 'mentor123' },
    { role: 'Trainee', email: 'trainee@mindbuilders.org', password: 'trainee123' },
  ];

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
    setIsLoading(true);

    const result = await login(demoEmail, demoPassword);
    
    if (result.success) {
      const userData = localStorage.getItem('dtmms_current_user');
      if (userData) {
        const user = JSON.parse(userData);
        navigate(`/${user.role}`);
      }
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap className="h-7 w-7 text-white" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-white">Mind Builders</h1>
            <p className="text-white/80 text-sm">Africa</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="font-heading text-4xl font-bold text-white leading-tight">
            Empowering Youth Through<br />
            <span className="text-accent">Training & Mentorship</span>
          </h2>
          <p className="text-white/80 text-lg max-w-md">
            Digital Training and Mentorship Management System - 
            Building tomorrow's leaders today.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-white">500+</p>
            <p className="text-white/70 text-sm">Trainees</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-white">50+</p>
            <p className="text-white/70 text-sm">Programmes</p>
          </div>
          <div className="text-center">
            <p className="font-heading text-3xl font-bold text-white">95%</p>
            <p className="text-white/70 text-sm">Success Rate</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-xl gradient-primary flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-xl">Mind Builders Africa</h1>
              <p className="text-muted-foreground text-sm">DTMMS</p>
            </div>
          </div>

          <Card className="border-border shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to access your dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="bg-destructive/10 border-destructive/20">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@mindbuilders.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 font-semibold gradient-primary hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Accounts */}
          <Card className="border-border bg-muted/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Demo Accounts (Click to login)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((account) => (
                  <Button
                    key={account.role}
                    variant="outline"
                    size="sm"
                    className="justify-start h-auto py-2 px-3 text-left"
                    onClick={() => handleDemoLogin(account.email, account.password)}
                    disabled={isLoading}
                  >
                    <div>
                      <p className="font-medium text-xs">{account.role}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{account.email}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
