import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { StatusBadge } from '@/components/StatusBadge';
import { ClipboardList, Check, X, Clock, AlertCircle, Save } from 'lucide-react';
import { 
  getSessions, 
  getProgrammes, 
  getEnrollmentsByProgramme, 
  getUsers,
  getAttendanceBySession,
  addAttendance,
  updateAttendance
} from '@/lib/localStorage';
import { AttendanceRecord } from '@/types';

const AttendancePage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // Get sessions based on role
  const allSessions = getSessions();
  const allProgrammes = getProgrammes();
  const allUsers = getUsers();
  
  const sessions = user?.role === 'trainer' 
    ? allSessions.filter(s => s.trainerId === user.id)
    : allSessions;

  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceRecord['status']>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  const selectedSession = sessions.find(s => s.id === selectedSessionId);
  const selectedProgramme = selectedSession ? allProgrammes.find(p => p.id === selectedSession.programmeId) : null;
  
  // Get trainees enrolled in the programme
  const enrollments = selectedProgramme ? getEnrollmentsByProgramme(selectedProgramme.id) : [];
  const trainees = enrollments
    .filter(e => e.status === 'active')
    .map(e => allUsers.find(u => u.id === e.traineeId))
    .filter(Boolean);

  // Load existing attendance when session changes
  React.useEffect(() => {
    if (selectedSessionId) {
      const existingAttendance = getAttendanceBySession(selectedSessionId);
      const attendanceMap: Record<string, AttendanceRecord['status']> = {};
      const notesMap: Record<string, string> = {};
      
      existingAttendance.forEach(a => {
        attendanceMap[a.traineeId] = a.status;
        if (a.notes) notesMap[a.traineeId] = a.notes;
      });
      
      setAttendanceData(attendanceMap);
      setNotes(notesMap);
    }
  }, [selectedSessionId]);

  const handleStatusChange = (traineeId: string, status: AttendanceRecord['status']) => {
    setAttendanceData(prev => ({
      ...prev,
      [traineeId]: status
    }));
  };

  const handleSaveAttendance = () => {
    if (!selectedSessionId || !user) return;

    const existingAttendance = getAttendanceBySession(selectedSessionId);
    
    Object.entries(attendanceData).forEach(([traineeId, status]) => {
      const existing = existingAttendance.find(a => a.traineeId === traineeId);
      
      if (existing) {
        updateAttendance(existing.id, { 
          status, 
          notes: notes[traineeId] || undefined 
        });
      } else {
        addAttendance({
          sessionId: selectedSessionId,
          traineeId,
          status,
          markedBy: user.id,
          notes: notes[traineeId] || undefined
        });
      }
    });

    toast({ title: 'Attendance saved successfully!' });
  };

  const statusButtons = [
    { value: 'present', label: 'Present', icon: Check, color: 'text-success hover:bg-success/10' },
    { value: 'absent', label: 'Absent', icon: X, color: 'text-destructive hover:bg-destructive/10' },
    { value: 'late', label: 'Late', icon: Clock, color: 'text-warning hover:bg-warning/10' },
    { value: 'excused', label: 'Excused', icon: AlertCircle, color: 'text-info hover:bg-info/10' },
  ] as const;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold">Attendance Tracking</h1>
            <p className="text-muted-foreground">Record and manage trainee attendance</p>
          </div>
        </div>

        {/* Session Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-primary" />
              Select Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedSessionId} onValueChange={setSelectedSessionId}>
              <SelectTrigger className="w-full md:w-96">
                <SelectValue placeholder="Choose a session to record attendance" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map(session => {
                  const programme = allProgrammes.find(p => p.id === session.programmeId);
                  return (
                    <SelectItem key={session.id} value={session.id}>
                      {session.title} - {programme?.title} ({session.date})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {selectedSession && selectedProgramme && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Session</p>
                    <p className="font-medium">{selectedSession.title}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Programme</p>
                    <p className="font-medium">{selectedProgramme.title}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(selectedSession.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="font-medium">{selectedSession.startTime} - {selectedSession.endTime}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Attendance List */}
        {selectedSessionId && trainees.length > 0 && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-lg">
                Trainees ({trainees.length})
              </CardTitle>
              <Button onClick={handleSaveAttendance} className="gap-2">
                <Save className="h-4 w-4" /> Save Attendance
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainees.map((trainee) => {
                  if (!trainee) return null;
                  const currentStatus = attendanceData[trainee.id];
                  
                  return (
                    <div 
                      key={trainee.id}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {trainee.firstName.charAt(0)}{trainee.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{trainee.firstName} {trainee.lastName}</p>
                          <p className="text-sm text-muted-foreground">{trainee.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {statusButtons.map((btn) => (
                          <Button
                            key={btn.value}
                            variant={currentStatus === btn.value ? 'default' : 'ghost'}
                            size="sm"
                            className={currentStatus === btn.value ? '' : btn.color}
                            onClick={() => handleStatusChange(trainee.id, btn.value)}
                          >
                            <btn.icon className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">{btn.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedSessionId && trainees.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No trainees enrolled in this programme yet.
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default AttendancePage;
