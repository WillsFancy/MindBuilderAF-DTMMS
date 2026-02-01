// User roles
export type UserRole = 'admin' | 'trainer' | 'mentor' | 'trainee';

export interface User {
  id: string;
  email: string;
  password: string; // In real app, this would be hashed
  role: UserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

// Training Programme
export interface Programme {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  trainerId: string;
  maxParticipants: number;
  enrolledCount: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  createdAt: string;
}

// Training Session
export interface Session {
  id: string;
  programmeId: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  trainerId: string;
}

// Enrollment
export interface Enrollment {
  id: string;
  traineeId: string;
  programmeId: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'dropped';
}

// Attendance Record
export interface AttendanceRecord {
  id: string;
  sessionId: string;
  traineeId: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  markedAt: string;
  markedBy: string;
  notes?: string;
}

// Mentorship Assignment
export interface MentorshipAssignment {
  id: string;
  mentorId: string;
  traineeId: string;
  programmeId: string;
  assignedAt: string;
  status: 'active' | 'completed' | 'paused';
}

// Mentorship Note/Feedback
export interface MentorshipNote {
  id: string;
  assignmentId: string;
  mentorId: string;
  traineeId: string;
  content: string;
  type: 'progress' | 'feedback' | 'meeting' | 'concern';
  createdAt: string;
}

// Performance Evaluation
export interface PerformanceEvaluation {
  id: string;
  traineeId: string;
  programmeId: string;
  evaluatorId: string;
  evaluatorRole: 'trainer' | 'mentor';
  scores: {
    participation: number; // 1-5
    understanding: number;
    application: number;
    teamwork: number;
    punctuality: number;
  };
  overallScore: number;
  comments: string;
  createdAt: string;
}

// Training Material
export interface TrainingMaterial {
  id: string;
  programmeId: string;
  sessionId?: string;
  title: string;
  description?: string;
  type: 'pdf' | 'video' | 'link' | 'slides' | 'document';
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

// Message/Communication
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// Notification
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// Report types
export interface AttendanceReport {
  programmeId: string;
  programmeName: string;
  totalSessions: number;
  averageAttendance: number;
  traineeStats: {
    traineeId: string;
    traineeName: string;
    present: number;
    absent: number;
    late: number;
    attendanceRate: number;
  }[];
}

export interface PerformanceReport {
  traineeId: string;
  traineeName: string;
  programmes: {
    programmeId: string;
    programmeName: string;
    averageScore: number;
    evaluations: PerformanceEvaluation[];
  }[];
  overallAverage: number;
}

// Dashboard Stats
export interface AdminStats {
  totalUsers: number;
  totalTrainees: number;
  totalTrainers: number;
  totalMentors: number;
  activeProgrammes: number;
  completedProgrammes: number;
  upcomingProgrammes: number;
  averageAttendance: number;
}

export interface TrainerStats {
  assignedProgrammes: number;
  totalTrainees: number;
  upcomingSessions: number;
  materialsUploaded: number;
}

export interface MentorStats {
  assignedMentees: number;
  activeMentorships: number;
  notesSubmitted: number;
  averageMenteeProgress: number;
}

export interface TraineeStats {
  enrolledProgrammes: number;
  completedProgrammes: number;
  attendanceRate: number;
  averagePerformance: number;
  assignedMentor?: string;
}

// Auth Context
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
