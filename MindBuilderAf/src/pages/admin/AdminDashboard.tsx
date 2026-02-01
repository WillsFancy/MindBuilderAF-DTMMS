import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  UserCheck, 
  ClipboardList,
  TrendingUp,
  Calendar,
  Plus
} from 'lucide-react';
import { getAdminStats, getProgrammes, getUsers, getEnrollments } from '@/lib/localStorage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = getAdminStats();
  const programmes = getProgrammes();
  const users = getUsers();
  const enrollments = getEnrollments();

  // Recent programmes
  const recentProgrammes = programmes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  // Chart data for programme distribution
  const programmeChartData = [
    { name: 'Ongoing', value: stats.activeProgrammes, color: 'hsl(var(--success))' },
    { name: 'Upcoming', value: stats.upcomingProgrammes, color: 'hsl(var(--info))' },
    { name: 'Completed', value: stats.completedProgrammes, color: 'hsl(var(--muted-foreground))' },
  ];

  // Monthly enrollment data (mock)
  const enrollmentData = [
    { month: 'Jan', enrollments: 15 },
    { month: 'Feb', enrollments: 22 },
    { month: 'Mar', enrollments: 28 },
    { month: 'Apr', enrollments: 18 },
    { month: 'May', enrollments: 25 },
    { month: 'Jun', enrollments: 30 },
  ];

  // Recent users
  const recentUsers = users
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground">Monitor all activities and manage the system</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/admin/users')} className="gap-2">
              <Plus className="h-4 w-4" /> Add User
            </Button>
            <Button variant="outline" onClick={() => navigate('/admin/programmes')} className="gap-2">
              <Plus className="h-4 w-4" /> New Programme
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            subtitle={`${stats.totalTrainers} trainers, ${stats.totalMentors} mentors`}
            icon={Users}
            variant="primary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Trainees"
            value={stats.totalTrainees}
            subtitle="Currently enrolled"
            icon={GraduationCap}
            variant="secondary"
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Active Programmes"
            value={stats.activeProgrammes}
            subtitle={`${stats.upcomingProgrammes} upcoming`}
            icon={Calendar}
            variant="accent"
          />
          <StatCard
            title="Avg. Attendance"
            value={`${stats.averageAttendance}%`}
            subtitle="Across all sessions"
            icon={ClipboardList}
            trend={{ value: 3, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enrollment Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Enrollment Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="enrollments" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Programme Status */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                Programme Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={programmeChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {programmeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {programmeChartData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Programmes */}
          <DataTable
            title="Recent Programmes"
            data={recentProgrammes}
            columns={[
              { key: 'title', header: 'Programme' },
              { key: 'category', header: 'Category' },
              { 
                key: 'status', 
                header: 'Status',
                render: (item) => <StatusBadge status={item.status} />
              },
              { 
                key: 'enrolledCount', 
                header: 'Enrolled',
                render: (item) => `${item.enrolledCount}/${item.maxParticipants}`
              },
            ]}
            onViewAll={() => navigate('/admin/programmes')}
            onRowClick={(item) => navigate(`/admin/programmes/${item.id}`)}
          />

          {/* Recent Users */}
          <DataTable
            title="Recent Users"
            data={recentUsers}
            columns={[
              { 
                key: 'name', 
                header: 'Name',
                render: (item) => `${item.firstName} ${item.lastName}`
              },
              { key: 'email', header: 'Email' },
              { 
                key: 'role', 
                header: 'Role',
                render: (item) => (
                  <span className="capitalize font-medium">{item.role}</span>
                )
              },
              { 
                key: 'isActive', 
                header: 'Status',
                render: (item) => <StatusBadge status={String(item.isActive)} />
              },
            ]}
            onViewAll={() => navigate('/admin/users')}
            onRowClick={(item) => navigate(`/admin/users/${item.id}`)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
