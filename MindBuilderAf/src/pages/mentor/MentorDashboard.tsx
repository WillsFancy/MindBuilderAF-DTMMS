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
import { 
  Users, 
  Heart,
  FileText,
  TrendingUp,
  MessageSquare,
  Plus
} from 'lucide-react';
import { getMentorStats, getMentorshipsByMentor, getMentorshipNotesByMentor, getUsers, getProgrammes } from '@/lib/localStorage';

const MentorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  if (!user) return null;

  const stats = getMentorStats(user.id);
  const mentorships = getMentorshipsByMentor(user.id);
  const notes = getMentorshipNotesByMentor(user.id);
  const users = getUsers();
  const programmes = getProgrammes();

  // Get trainee data for mentorships
  const menteesData = mentorships.map(m => {
    const trainee = users.find(u => u.id === m.traineeId);
    const programme = programmes.find(p => p.id === m.programmeId);
    return {
      ...m,
      traineeName: trainee ? `${trainee.firstName} ${trainee.lastName}` : 'Unknown',
      traineeEmail: trainee?.email || '',
      programmeName: programme?.title || 'Unknown',
      traineeInitials: trainee ? `${trainee.firstName.charAt(0)}${trainee.lastName.charAt(0)}` : 'UN'
    };
  });

  // Recent notes
  const recentNotes = notes
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const getTraineeName = (traineeId: string) => {
    const trainee = users.find(u => u.id === traineeId);
    return trainee ? `${trainee.firstName} ${trainee.lastName}` : 'Unknown';
  };

  const noteTypeColors: Record<string, string> = {
    progress: 'bg-success/10 text-success',
    feedback: 'bg-info/10 text-info',
    meeting: 'bg-primary/10 text-primary',
    concern: 'bg-warning/10 text-warning',
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Mentor Dashboard</h1>
            <p className="text-muted-foreground">Support and guide your assigned mentees</p>
          </div>
          <Button onClick={() => navigate('/mentor/notes')} className="gap-2">
            <Plus className="h-4 w-4" /> Add Note
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Assigned Mentees"
            value={stats.assignedMentees}
            icon={Users}
            variant="primary"
          />
          <StatCard
            title="Active Mentorships"
            value={stats.activeMentorships}
            icon={Heart}
            variant="secondary"
          />
          <StatCard
            title="Notes Submitted"
            value={stats.notesSubmitted}
            icon={FileText}
            variant="accent"
          />
          <StatCard
            title="Avg. Progress"
            value={`${stats.averageMenteeProgress}%`}
            subtitle="Mentee performance"
            icon={TrendingUp}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mentees List */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                My Mentees
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/mentor/mentees')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menteesData.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No mentees assigned yet</p>
                ) : (
                  menteesData.map((mentee) => (
                    <div 
                      key={mentee.id} 
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`/mentor/mentees/${mentee.traineeId}`)}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {mentee.traineeInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mentee.traineeName}</p>
                          <p className="text-sm text-muted-foreground">{mentee.programmeName}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={mentee.status} />
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/mentor/messages');
                          }}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-secondary" />
                Recent Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentNotes.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No notes yet</p>
                ) : (
                  recentNotes.map((note) => (
                    <div key={note.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{getTraineeName(note.traineeId)}</span>
                        <span className={`text-xs px-2 py-1 rounded-full capitalize ${noteTypeColors[note.type]}`}>
                          {note.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{note.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('/mentor/notes')}
              >
                View All Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;
