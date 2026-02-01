import { 
  User, 
  Programme, 
  Session, 
  Enrollment, 
  AttendanceRecord,
  MentorshipAssignment,
  MentorshipNote,
  PerformanceEvaluation,
  TrainingMaterial,
  Message,
  Notification
} from '@/types';

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// Sample Users
export const mockUsers: User[] = [
  {
    id: 'admin-1',
    email: 'admin@mindbuilders.org',
    password: 'admin123',
    role: 'admin',
    firstName: 'Amara',
    lastName: 'Okonkwo',
    phone: '+234 801 234 5678',
    avatar: '',
    createdAt: '2024-01-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainer-1',
    email: 'trainer@mindbuilders.org',
    password: 'trainer123',
    role: 'trainer',
    firstName: 'Kwame',
    lastName: 'Asante',
    phone: '+233 20 123 4567',
    createdAt: '2024-01-15T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainer-2',
    email: 'fatima@mindbuilders.org',
    password: 'trainer123',
    role: 'trainer',
    firstName: 'Fatima',
    lastName: 'Ibrahim',
    phone: '+234 802 345 6789',
    createdAt: '2024-02-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'mentor-1',
    email: 'mentor@mindbuilders.org',
    password: 'mentor123',
    role: 'mentor',
    firstName: 'Chidi',
    lastName: 'Nwosu',
    phone: '+234 803 456 7890',
    createdAt: '2024-01-20T00:00:00Z',
    isActive: true
  },
  {
    id: 'mentor-2',
    email: 'grace@mindbuilders.org',
    password: 'mentor123',
    role: 'mentor',
    firstName: 'Grace',
    lastName: 'Adeyemi',
    phone: '+234 804 567 8901',
    createdAt: '2024-02-10T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainee-1',
    email: 'trainee@mindbuilders.org',
    password: 'trainee123',
    role: 'trainee',
    firstName: 'Oluwaseun',
    lastName: 'Adebayo',
    phone: '+234 805 678 9012',
    createdAt: '2024-03-01T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainee-2',
    email: 'zainab@mindbuilders.org',
    password: 'trainee123',
    role: 'trainee',
    firstName: 'Zainab',
    lastName: 'Mohammed',
    phone: '+234 806 789 0123',
    createdAt: '2024-03-05T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainee-3',
    email: 'kofi@mindbuilders.org',
    password: 'trainee123',
    role: 'trainee',
    firstName: 'Kofi',
    lastName: 'Mensah',
    phone: '+233 24 234 5678',
    createdAt: '2024-03-10T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainee-4',
    email: 'amina@mindbuilders.org',
    password: 'trainee123',
    role: 'trainee',
    firstName: 'Amina',
    lastName: 'Bello',
    phone: '+234 807 890 1234',
    createdAt: '2024-03-15T00:00:00Z',
    isActive: true
  },
  {
    id: 'trainee-5',
    email: 'david@mindbuilders.org',
    password: 'trainee123',
    role: 'trainee',
    firstName: 'David',
    lastName: 'Obi',
    phone: '+234 808 901 2345',
    createdAt: '2024-03-20T00:00:00Z',
    isActive: true
  }
];

// Sample Programmes
export const mockProgrammes: Programme[] = [
  {
    id: 'prog-1',
    title: 'Digital Skills Bootcamp',
    description: 'Comprehensive training on essential digital skills including MS Office, internet literacy, and basic coding.',
    category: 'Technology',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    trainerId: 'trainer-1',
    maxParticipants: 30,
    enrolledCount: 24,
    status: 'ongoing',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prog-2',
    title: 'Leadership & Entrepreneurship',
    description: 'Developing future leaders with skills in leadership, business planning, and entrepreneurship.',
    category: 'Business',
    startDate: '2024-03-01',
    endDate: '2024-05-31',
    trainerId: 'trainer-2',
    maxParticipants: 25,
    enrolledCount: 20,
    status: 'ongoing',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 'prog-3',
    title: 'Financial Literacy Workshop',
    description: 'Understanding personal finance, budgeting, savings, and investment basics.',
    category: 'Finance',
    startDate: '2024-04-15',
    endDate: '2024-06-15',
    trainerId: 'trainer-1',
    maxParticipants: 40,
    enrolledCount: 15,
    status: 'upcoming',
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 'prog-4',
    title: 'Communication Skills Mastery',
    description: 'Enhancing verbal and written communication, public speaking, and presentation skills.',
    category: 'Soft Skills',
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    trainerId: 'trainer-2',
    maxParticipants: 35,
    enrolledCount: 35,
    status: 'completed',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'prog-5',
    title: 'Web Development Fundamentals',
    description: 'Introduction to HTML, CSS, JavaScript, and building responsive websites.',
    category: 'Technology',
    startDate: '2024-05-01',
    endDate: '2024-07-31',
    trainerId: 'trainer-1',
    maxParticipants: 20,
    enrolledCount: 8,
    status: 'upcoming',
    createdAt: '2024-04-01T00:00:00Z'
  }
];

// Sample Sessions
export const mockSessions: Session[] = [
  {
    id: 'session-1',
    programmeId: 'prog-1',
    title: 'Introduction to Digital Literacy',
    description: 'Overview of digital tools and their importance',
    date: '2024-02-05',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Training Room A',
    trainerId: 'trainer-1'
  },
  {
    id: 'session-2',
    programmeId: 'prog-1',
    title: 'Microsoft Word Essentials',
    description: 'Document creation and formatting',
    date: '2024-02-12',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Computer Lab 1',
    trainerId: 'trainer-1'
  },
  {
    id: 'session-3',
    programmeId: 'prog-1',
    title: 'Excel Fundamentals',
    description: 'Spreadsheet basics and data management',
    date: '2024-02-19',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Computer Lab 1',
    trainerId: 'trainer-1'
  },
  {
    id: 'session-4',
    programmeId: 'prog-2',
    title: 'Leadership Foundations',
    description: 'Understanding leadership styles and principles',
    date: '2024-03-05',
    startTime: '14:00',
    endTime: '17:00',
    venue: 'Conference Room B',
    trainerId: 'trainer-2'
  },
  {
    id: 'session-5',
    programmeId: 'prog-2',
    title: 'Business Model Canvas',
    description: 'Creating and validating business ideas',
    date: '2024-03-12',
    startTime: '14:00',
    endTime: '17:00',
    venue: 'Conference Room B',
    trainerId: 'trainer-2'
  }
];

// Sample Enrollments
export const mockEnrollments: Enrollment[] = [
  { id: 'enroll-1', traineeId: 'trainee-1', programmeId: 'prog-1', enrolledAt: '2024-02-01T00:00:00Z', status: 'active' },
  { id: 'enroll-2', traineeId: 'trainee-2', programmeId: 'prog-1', enrolledAt: '2024-02-01T00:00:00Z', status: 'active' },
  { id: 'enroll-3', traineeId: 'trainee-3', programmeId: 'prog-1', enrolledAt: '2024-02-02T00:00:00Z', status: 'active' },
  { id: 'enroll-4', traineeId: 'trainee-4', programmeId: 'prog-2', enrolledAt: '2024-03-01T00:00:00Z', status: 'active' },
  { id: 'enroll-5', traineeId: 'trainee-5', programmeId: 'prog-2', enrolledAt: '2024-03-01T00:00:00Z', status: 'active' },
  { id: 'enroll-6', traineeId: 'trainee-1', programmeId: 'prog-2', enrolledAt: '2024-03-02T00:00:00Z', status: 'active' },
  { id: 'enroll-7', traineeId: 'trainee-2', programmeId: 'prog-4', enrolledAt: '2024-01-15T00:00:00Z', status: 'completed' },
  { id: 'enroll-8', traineeId: 'trainee-3', programmeId: 'prog-4', enrolledAt: '2024-01-15T00:00:00Z', status: 'completed' }
];

// Sample Attendance Records
export const mockAttendance: AttendanceRecord[] = [
  { id: 'att-1', sessionId: 'session-1', traineeId: 'trainee-1', status: 'present', markedAt: '2024-02-05T09:00:00Z', markedBy: 'trainer-1' },
  { id: 'att-2', sessionId: 'session-1', traineeId: 'trainee-2', status: 'present', markedAt: '2024-02-05T09:00:00Z', markedBy: 'trainer-1' },
  { id: 'att-3', sessionId: 'session-1', traineeId: 'trainee-3', status: 'late', markedAt: '2024-02-05T09:30:00Z', markedBy: 'trainer-1', notes: 'Arrived 30 minutes late' },
  { id: 'att-4', sessionId: 'session-2', traineeId: 'trainee-1', status: 'present', markedAt: '2024-02-12T09:00:00Z', markedBy: 'trainer-1' },
  { id: 'att-5', sessionId: 'session-2', traineeId: 'trainee-2', status: 'absent', markedAt: '2024-02-12T09:00:00Z', markedBy: 'trainer-1', notes: 'No prior notice' },
  { id: 'att-6', sessionId: 'session-2', traineeId: 'trainee-3', status: 'present', markedAt: '2024-02-12T09:00:00Z', markedBy: 'trainer-1' },
  { id: 'att-7', sessionId: 'session-4', traineeId: 'trainee-4', status: 'present', markedAt: '2024-03-05T14:00:00Z', markedBy: 'trainer-2' },
  { id: 'att-8', sessionId: 'session-4', traineeId: 'trainee-5', status: 'present', markedAt: '2024-03-05T14:00:00Z', markedBy: 'trainer-2' },
  { id: 'att-9', sessionId: 'session-4', traineeId: 'trainee-1', status: 'excused', markedAt: '2024-03-05T14:00:00Z', markedBy: 'trainer-2', notes: 'Medical appointment' }
];

// Sample Mentorship Assignments
export const mockMentorships: MentorshipAssignment[] = [
  { id: 'mentor-assign-1', mentorId: 'mentor-1', traineeId: 'trainee-1', programmeId: 'prog-1', assignedAt: '2024-02-05T00:00:00Z', status: 'active' },
  { id: 'mentor-assign-2', mentorId: 'mentor-1', traineeId: 'trainee-2', programmeId: 'prog-1', assignedAt: '2024-02-05T00:00:00Z', status: 'active' },
  { id: 'mentor-assign-3', mentorId: 'mentor-2', traineeId: 'trainee-3', programmeId: 'prog-1', assignedAt: '2024-02-05T00:00:00Z', status: 'active' },
  { id: 'mentor-assign-4', mentorId: 'mentor-2', traineeId: 'trainee-4', programmeId: 'prog-2', assignedAt: '2024-03-05T00:00:00Z', status: 'active' },
  { id: 'mentor-assign-5', mentorId: 'mentor-1', traineeId: 'trainee-5', programmeId: 'prog-2', assignedAt: '2024-03-05T00:00:00Z', status: 'active' }
];

// Sample Mentorship Notes
export const mockMentorshipNotes: MentorshipNote[] = [
  {
    id: 'note-1',
    assignmentId: 'mentor-assign-1',
    mentorId: 'mentor-1',
    traineeId: 'trainee-1',
    content: 'Oluwaseun is showing great progress in digital skills. Very enthusiastic learner.',
    type: 'progress',
    createdAt: '2024-02-10T00:00:00Z'
  },
  {
    id: 'note-2',
    assignmentId: 'mentor-assign-1',
    mentorId: 'mentor-1',
    traineeId: 'trainee-1',
    content: 'Had a productive 1-on-1 session. Discussed career goals and set learning milestones.',
    type: 'meeting',
    createdAt: '2024-02-17T00:00:00Z'
  },
  {
    id: 'note-3',
    assignmentId: 'mentor-assign-2',
    mentorId: 'mentor-1',
    traineeId: 'trainee-2',
    content: 'Zainab needs additional support with Excel formulas. Scheduled extra practice session.',
    type: 'concern',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 'note-4',
    assignmentId: 'mentor-assign-4',
    mentorId: 'mentor-2',
    traineeId: 'trainee-4',
    content: 'Amina presented excellent business idea during session. Very promising entrepreneur.',
    type: 'feedback',
    createdAt: '2024-03-10T00:00:00Z'
  }
];

// Sample Performance Evaluations
export const mockEvaluations: PerformanceEvaluation[] = [
  {
    id: 'eval-1',
    traineeId: 'trainee-1',
    programmeId: 'prog-1',
    evaluatorId: 'trainer-1',
    evaluatorRole: 'trainer',
    scores: { participation: 5, understanding: 4, application: 4, teamwork: 5, punctuality: 5 },
    overallScore: 4.6,
    comments: 'Excellent participation and teamwork. Shows strong understanding of concepts.',
    createdAt: '2024-02-28T00:00:00Z'
  },
  {
    id: 'eval-2',
    traineeId: 'trainee-2',
    programmeId: 'prog-1',
    evaluatorId: 'trainer-1',
    evaluatorRole: 'trainer',
    scores: { participation: 4, understanding: 3, application: 3, teamwork: 4, punctuality: 4 },
    overallScore: 3.6,
    comments: 'Good effort overall. Needs more practice with practical applications.',
    createdAt: '2024-02-28T00:00:00Z'
  },
  {
    id: 'eval-3',
    traineeId: 'trainee-4',
    programmeId: 'prog-2',
    evaluatorId: 'trainer-2',
    evaluatorRole: 'trainer',
    scores: { participation: 5, understanding: 5, application: 5, teamwork: 4, punctuality: 5 },
    overallScore: 4.8,
    comments: 'Outstanding performance. Natural leader with excellent business acumen.',
    createdAt: '2024-03-20T00:00:00Z'
  }
];

// Sample Training Materials
export const mockMaterials: TrainingMaterial[] = [
  {
    id: 'mat-1',
    programmeId: 'prog-1',
    sessionId: 'session-1',
    title: 'Introduction to Digital Literacy - Slides',
    description: 'Overview presentation for the first session',
    type: 'slides',
    url: '/materials/digital-literacy-intro.pdf',
    uploadedBy: 'trainer-1',
    uploadedAt: '2024-02-04T00:00:00Z'
  },
  {
    id: 'mat-2',
    programmeId: 'prog-1',
    sessionId: 'session-2',
    title: 'Microsoft Word Tutorial',
    description: 'Step-by-step guide for Word essentials',
    type: 'pdf',
    url: '/materials/word-tutorial.pdf',
    uploadedBy: 'trainer-1',
    uploadedAt: '2024-02-11T00:00:00Z'
  },
  {
    id: 'mat-3',
    programmeId: 'prog-2',
    title: 'Leadership Styles Video',
    description: 'Video lecture on different leadership approaches',
    type: 'video',
    url: 'https://example.com/leadership-video',
    uploadedBy: 'trainer-2',
    uploadedAt: '2024-03-04T00:00:00Z'
  },
  {
    id: 'mat-4',
    programmeId: 'prog-2',
    sessionId: 'session-5',
    title: 'Business Model Canvas Template',
    description: 'Downloadable template for business planning',
    type: 'document',
    url: '/materials/bmc-template.xlsx',
    uploadedBy: 'trainer-2',
    uploadedAt: '2024-03-11T00:00:00Z'
  }
];

// Sample Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'trainer-1',
    receiverId: 'trainee-1',
    subject: 'Great Progress!',
    content: 'Hi Oluwaseun, I wanted to commend you on your excellent participation in the Digital Skills Bootcamp. Keep up the great work!',
    isRead: true,
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'msg-2',
    senderId: 'trainee-1',
    receiverId: 'trainer-1',
    subject: 'Re: Great Progress!',
    content: 'Thank you so much! I am really enjoying the programme and learning a lot.',
    isRead: true,
    createdAt: '2024-02-15T14:30:00Z'
  },
  {
    id: 'msg-3',
    senderId: 'mentor-1',
    receiverId: 'trainee-2',
    subject: 'Mentorship Meeting Reminder',
    content: 'Hi Zainab, just a reminder that we have our mentorship session scheduled for tomorrow at 2pm. Looking forward to seeing you!',
    isRead: false,
    createdAt: '2024-02-20T09:00:00Z'
  }
];

// Sample Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'trainee-1',
    title: 'New Session Scheduled',
    message: 'A new session "Excel Advanced Functions" has been scheduled for March 5th.',
    type: 'info',
    isRead: false,
    link: '/trainee/schedule',
    createdAt: '2024-02-28T00:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'trainee-1',
    title: 'Performance Evaluation Available',
    message: 'Your performance evaluation for Digital Skills Bootcamp is now available.',
    type: 'success',
    isRead: false,
    link: '/trainee/performance',
    createdAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 'notif-3',
    userId: 'trainer-1',
    title: 'New Trainee Enrolled',
    message: '3 new trainees have enrolled in Digital Skills Bootcamp.',
    type: 'info',
    isRead: true,
    link: '/trainer/programmes',
    createdAt: '2024-02-25T00:00:00Z'
  },
  {
    id: 'notif-4',
    userId: 'admin-1',
    title: 'Monthly Report Ready',
    message: 'The February attendance and performance report is ready for review.',
    type: 'success',
    isRead: false,
    link: '/admin/reports',
    createdAt: '2024-03-01T00:00:00Z'
  }
];

export { generateId };
