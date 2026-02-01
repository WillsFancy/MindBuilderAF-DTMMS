import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  Calendar,
  ClipboardList,
  BarChart3,
  UserCheck,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { 
  getTraineeStats, 
  getEnrollmentsByTrainee, 
  getProgrammes,
  getSessions,
  getAttendanceByTrainee,
  getMentorshipsByTrainee,
  getUsers,
  getMaterials
} from '@/lib/localStorage';

const TraineeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!user) return null;

  const stats = getTraineeStats(user.id);
  const enrollments = getEnrollmentsByTrainee(user.id);
  const programmes = getProgrammes();
  const sessions = getSessions();
  const attendance = getAttendanceByTrainee(user.id);
  const mentorships = getMentorshipsByTrainee(user.id);
  const users = getUsers();

  // Get enrolled programmes
  const enrolledProgrammes = enrollments
    .filter(e => e.status === 'active')
    .map(e => {
      const programme = programmes.find(p => p.id === e.programmeId);
      return {
        ...e,
        programmeName: programme?.title || 'Unknown',
        programmeStatus: programme?.status || 'unknown',
        category: programme?.category || ''
      };
    });

  // Get upcoming sessions for enrolled programmes
  const today = new Date().toISOString().split('T')[0];
  const enrolledProgrammeIds = enrollments.filter(e => e.status === 'active').map(e => e.programmeId);
  const upcomingSessions = sessions
    .filter(s => enrolledProgrammeIds.includes(s.programmeId) && s.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)
    .map(s => ({
      ...s,
      programmeName: programmes.find(p => p.id === s.programmeId)?.title || 'Unknown'
    }));

  // Get mentor info
  const activeMentorship = mentorships.find(m => m.status === 'active');
  const mentor = activeMentorship ? users.find(u => u.id === activeMentorship.mentorId) : null;

  // Recent attendance
  const recentAttendance = attendance
    .sort((a, b) => new Date(b.markedAt).getTime() - new Date(a.markedAt).getTime())
    .slice(0, 5)
    .map(a => {
      const session = sessions.find(s => s.id === a.sessionId);
      const programme = session ? programmes.find(p => p.id === session.programmeId) : null;
      return {
        ...a,
        sessionName: session?.title || 'Unknown',
        programmeName: programme?.title || '',
        date: session?.date || ''
      };
    });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground">Track your learning progress and activities</p>
          </div>
          <Button onClick={() => navigate('/trainee/programmes')} className="gap-2">
            <GraduationCap className="h-4 w-4" /> Browse Programmes
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Enrolled Programmes"
            value={stats.enrolledProgrammes}
            subtitle={`${stats.completedProgrammes} completed`}
            icon={GraduationCap}
            variant="primary"
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon={ClipboardList}
            variant="secondary"
          />
          <StatCard
            title="Performance Score"
            value={`${stats.averagePerformance}%`}
            icon={BarChart3}
            variant="accent"
          />
          <StatCard
            title="My Mentor"
            value={stats.assignedMentor || 'Not Assigned'}
            icon={UserCheck}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enrolled Programmes */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  My Programmes
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/trainee/programmes')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {enrolledProgrammes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't enrolled in any programmes yet</p>
                    <Button onClick={() => navigate('/trainee/programmes')}>
                      Browse Available Programmes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrolledProgrammes.map((prog) => (
                      <div 
                        key={prog.id}
                        className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/trainee/programmes/${prog.programmeId}`)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{prog.programmeName}</h4>
                          <StatusBadge status={prog.programmeStatus} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{prog.category}</p>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">65% complete</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <DataTable
              title="Upcoming Sessions"
              data={upcomingSessions}
              columns={[
                { key: 'title', header: 'Session' },
                { key: 'programmeName', header: 'Programme' },
                { 
                  key: 'date', 
                  header: 'Date',
                  render: (item) => new Date(item.date).toLocaleDateString()
                },
                { 
                  key: 'startTime', 
                  header: 'Time',
                  render: (item) => `${item.startTime} - ${item.endTime}`
                },
                { key: 'venue', header: 'Venue' },
              ]}
              onViewAll={() => navigate('/trainee/schedule')}
              emptyMessage="No upcoming sessions"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Mentor Card */}
            {mentor && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-lg flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-secondary" />
                    My Mentor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-secondary/10 text-secondary text-lg font-medium">
                        {mentor.firstName.charAt(0)}{mentor.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg">{mentor.firstName} {mentor.lastName}</p>
                      <p className="text-sm text-muted-foreground">{mentor.email}</p>
                    </div>
                  </div>
                  <Button 
                    className="w-full gap-2"
                    onClick={() => navigate('/trainee/messages')}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Recent Attendance */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-accent" />
                  Recent Attendance
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => navigate('/trainee/attendance')}>
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                {recentAttendance.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No attendance records yet</p>
                ) : (
                  <div className="space-y-3">
                    {recentAttendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-sm font-medium">{record.sessionName}</p>
                          <p className="text-xs text-muted-foreground">{record.date}</p>
                        </div>
                        <StatusBadge status={record.status} />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/trainee/materials')}
                >
                  <BookOpen className="h-4 w-4" />
                  Training Materials
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/trainee/performance')}
                >
                  <BarChart3 className="h-4 w-4" />
                  View Performance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => navigate('/trainee/schedule')}
                >
                  <Calendar className="h-4 w-4" />
                  My Schedule
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TraineeDashboard;
