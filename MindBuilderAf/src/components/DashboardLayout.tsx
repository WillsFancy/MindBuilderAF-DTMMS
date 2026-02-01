import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  Calendar, 
  ClipboardList,
  UserCheck,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  BookOpen,
  BarChart3,
  Upload,
  Heart,
  Menu
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getNotificationsByUser } from '@/lib/localStorage';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const roleNavItems = {
  admin: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { title: 'Users', icon: Users, path: '/admin/users' },
    { title: 'Programmes', icon: GraduationCap, path: '/admin/programmes' },
    { title: 'Sessions', icon: Calendar, path: '/admin/sessions' },
    { title: 'Attendance', icon: ClipboardList, path: '/admin/attendance' },
    { title: 'Mentorships', icon: Heart, path: '/admin/mentorships' },
    { title: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { title: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { title: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
  trainer: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/trainer' },
    { title: 'My Programmes', icon: GraduationCap, path: '/trainer/programmes' },
    { title: 'Sessions', icon: Calendar, path: '/trainer/sessions' },
    { title: 'Attendance', icon: ClipboardList, path: '/trainer/attendance' },
    { title: 'Materials', icon: Upload, path: '/trainer/materials' },
    { title: 'Evaluations', icon: FileText, path: '/trainer/evaluations' },
    { title: 'Messages', icon: MessageSquare, path: '/trainer/messages' },
  ],
  mentor: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/mentor' },
    { title: 'My Mentees', icon: Users, path: '/mentor/mentees' },
    { title: 'Progress Tracking', icon: BarChart3, path: '/mentor/progress' },
    { title: 'Notes & Feedback', icon: FileText, path: '/mentor/notes' },
    { title: 'Messages', icon: MessageSquare, path: '/mentor/messages' },
  ],
  trainee: [
    { title: 'Dashboard', icon: LayoutDashboard, path: '/trainee' },
    { title: 'My Programmes', icon: GraduationCap, path: '/trainee/programmes' },
    { title: 'Schedule', icon: Calendar, path: '/trainee/schedule' },
    { title: 'Materials', icon: BookOpen, path: '/trainee/materials' },
    { title: 'My Attendance', icon: ClipboardList, path: '/trainee/attendance' },
    { title: 'Performance', icon: BarChart3, path: '/trainee/performance' },
    { title: 'My Mentor', icon: UserCheck, path: '/trainee/mentor' },
    { title: 'Messages', icon: MessageSquare, path: '/trainee/messages' },
  ],
};

const roleTitles = {
  admin: 'Administrator',
  trainer: 'Trainer',
  mentor: 'Mentor',
  trainee: 'Trainee',
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  if (!user) return null;

  const navItems = roleNavItems[user.role];
  const roleTitle = roleTitles[user.role];
  const notifications = getNotificationsByUser(user.id);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar className="border-r border-sidebar-border">
          <SidebarHeader className="p-4 border-b border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-sidebar-foreground text-sm">Mind Builders</span>
                <span className="text-xs text-sidebar-foreground/70">Africa</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-sidebar-foreground/60 text-xs uppercase tracking-wider px-3 mb-2">
                {roleTitle} Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.path)}
                          className={cn(
                            'w-full justify-start gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                            isActive 
                              ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium' 
                              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 border-2 border-sidebar-primary/30">
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground font-medium">
                  {getInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">{user.email}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start gap-2 text-sidebar-foreground/80 hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col min-h-screen">
          {/* Top Header */}
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="lg:hidden">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <h1 className="font-heading font-semibold text-lg text-foreground">
                Welcome back, {user.firstName}!
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => navigate(`/${user.role}/notifications`)}
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {unreadCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};
