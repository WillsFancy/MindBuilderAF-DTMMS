import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { DataTable } from '@/components/DataTable';
import { StatusBadge } from '@/components/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Calendar,
  Upload,
  Users,
  ClipboardList,
  FileText
} from 'lucide-react';
import { getTrainerStats, getProgrammes, getSessions, getUsers, getEnrollmentsByProgramme } from '@/lib/localStorage';

const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!user) return null;

  const stats = getTrainerStats(user.id);
  const allProgrammes = getProgrammes();
  const myProgrammes = allProgrammes.filter(p => p.trainerId === user.id);
  const allSessions = getSessions();
  const mySessions = allSessions.filter(s => s.trainerId === user.id);
  const users = getUsers();

  // Today's date for upcoming sessions
  const today = new Date().toISOString().split('T')[0];
  const upcomingSessions = mySessions
    .filter(s => s.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  // Get programme names
  const getProgrammeName = (programmeId: string) => {
    const programme = allProgrammes.find(p => p.id === programmeId);
    return programme?.title || 'Unknown';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Trainer Dashboard</h1>
            <p className="text-muted-foreground">Manage your programmes and sessions</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/trainer/attendance')} className="gap-2">
              <ClipboardList className="h-4 w-4" /> Mark Attendance
            </Button>
            <Button variant="outline" onClick={() => navigate('/trainer/materials')} className="gap-2">
              <Upload className="h-4 w-4" /> Upload Materials
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assigned Programmes"
            value={stats.assignedProgrammes}
            icon={GraduationCap}
            variant="primary"
          />
          <StatCard
            title="Total Trainees"
            value={stats.totalTrainees}
            subtitle="Across all programmes"
            icon={Users}
            variant="secondary"
          />
          <StatCard
            title="Upcoming Sessions"
            value={stats.upcomingSessions}
            subtitle="To be conducted"
            icon={Calendar}
            variant="accent"
          />
          <StatCard
            title="Materials Uploaded"
            value={stats.materialsUploaded}
            icon={FileText}
          />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Programmes */}
          <DataTable
            title="My Programmes"
            data={myProgrammes}
            columns={[
              { key: 'title', header: 'Programme' },
              { 
                key: 'status', 
                header: 'Status',
                render: (item) => <StatusBadge status={item.status} />
              },
              { 
                key: 'enrolledCount', 
                header: 'Trainees',
                render: (item) => `${item.enrolledCount}/${item.maxParticipants}`
              },
            ]}
            onViewAll={() => navigate('/trainer/programmes')}
            onRowClick={(item) => navigate(`/trainer/programmes/${item.id}`)}
            emptyMessage="No programmes assigned yet"
          />

          {/* Upcoming Sessions */}
          <DataTable
            title="Upcoming Sessions"
            data={upcomingSessions}
            columns={[
              { key: 'title', header: 'Session' },
              { 
                key: 'programmeId', 
                header: 'Programme',
                render: (item) => getProgrammeName(item.programmeId)
              },
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
            ]}
            onViewAll={() => navigate('/trainer/sessions')}
            emptyMessage="No upcoming sessions"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                onClick={() => navigate('/trainer/attendance')}
              >
                <ClipboardList className="h-6 w-6 text-primary" />
                <span>Record Attendance</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                onClick={() => navigate('/trainer/materials')}
              >
                <Upload className="h-6 w-6 text-secondary" />
                <span>Upload Materials</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                onClick={() => navigate('/trainer/evaluations')}
              >
                <FileText className="h-6 w-6 text-accent" />
                <span>Add Evaluation</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-24 flex-col gap-2"
                onClick={() => navigate('/trainer/messages')}
              >
                <Users className="h-6 w-6 text-info" />
                <span>Message Trainees</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;
