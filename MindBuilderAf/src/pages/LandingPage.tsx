import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Heart, BookOpen, BarChart3, Shield, ArrowRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive management of trainees, trainers, mentors, and administrators with role-based access control.'
    },
    {
      icon: GraduationCap,
      title: 'Training Programmes',
      description: 'Create, manage, and track training programmes with detailed session scheduling and material uploads.'
    },
    {
      icon: Heart,
      title: 'Mentorship System',
      description: 'Assign mentors to trainees, track progress, and facilitate meaningful mentorship relationships.'
    },
    {
      icon: BookOpen,
      title: 'Learning Materials',
      description: 'Upload and organize training materials, slides, PDFs, and video links for easy access.'
    },
    {
      icon: BarChart3,
      title: 'Performance Tracking',
      description: 'Evaluate trainee performance, track attendance, and generate comprehensive reports.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Role-based authentication ensures secure access while maintaining system reliability.'
    }
  ];

  const stats = [
    { value: '500+', label: 'Trainees' },
    { value: '50+', label: 'Programmes' },
    { value: '30+', label: 'Mentors' },
    { value: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading font-bold text-lg">Mind Builders Africa</h1>
              <p className="text-xs text-muted-foreground">DTMMS</p>
            </div>
          </div>
          <Button onClick={() => navigate('/login')} className="gap-2">
            Sign In <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="container mx-auto px-6 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="animate-pulse-ring relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Digital Training & Mentorship Platform
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight">
              Empowering Africa's Youth Through
              <span className="text-gradient-primary block mt-2">Training & Mentorship</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A comprehensive management system for training programmes, mentorship activities, 
              attendance tracking, performance monitoring, and reporting.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')} 
                className="gap-2 h-12 px-8 text-lg gradient-primary hover:opacity-90"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8 text-lg"
                onClick={() => navigate('/login')}
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Manage Training
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools designed for the Training & Youth Development Department
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-border hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Tailored for Every Role
            </h2>
            <p className="text-muted-foreground text-lg">
              Customized dashboards and features for each user type
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: 'Administrator', desc: 'Full system control and analytics', color: 'bg-primary' },
              { role: 'Trainer', desc: 'Manage programmes and sessions', color: 'bg-secondary' },
              { role: 'Mentor', desc: 'Guide and support mentees', color: 'bg-accent' },
              { role: 'Trainee', desc: 'Learn and track progress', color: 'bg-info' },
            ].map((item) => (
              <Card key={item.role} className="text-center">
                <CardContent className="pt-6">
                  <div className={`h-16 w-16 rounded-full ${item.color} mx-auto mb-4 flex items-center justify-center`}>
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{item.role}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <Card className="gradient-hero text-white overflow-hidden">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Join Mind Builders Africa in transforming youth development through 
                structured training and mentorship programmes.
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate('/login')}
                className="h-12 px-8 text-lg bg-white text-primary hover:bg-white/90"
              >
                Access the Platform
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground">
          <p>© 2024 Mind Builders Africa. Digital Training & Mentorship Management System.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
