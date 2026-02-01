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
import {
  mockUsers,
  mockProgrammes,
  mockSessions,
  mockEnrollments,
  mockAttendance,
  mockMentorships,
  mockMentorshipNotes,
  mockEvaluations,
  mockMaterials,
  mockMessages,
  mockNotifications,
  generateId
} from './mockData';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'dtmms_users',
  PROGRAMMES: 'dtmms_programmes',
  SESSIONS: 'dtmms_sessions',
  ENROLLMENTS: 'dtmms_enrollments',
  ATTENDANCE: 'dtmms_attendance',
  MENTORSHIPS: 'dtmms_mentorships',
  MENTORSHIP_NOTES: 'dtmms_mentorship_notes',
  EVALUATIONS: 'dtmms_evaluations',
  MATERIALS: 'dtmms_materials',
  MESSAGES: 'dtmms_messages',
  NOTIFICATIONS: 'dtmms_notifications',
  CURRENT_USER: 'dtmms_current_user',
  INITIALIZED: 'dtmms_initialized'
};

// Initialize storage with mock data if not already done
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.INITIALIZED)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(mockUsers));
    localStorage.setItem(STORAGE_KEYS.PROGRAMMES, JSON.stringify(mockProgrammes));
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(mockSessions));
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(mockEnrollments));
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(mockAttendance));
    localStorage.setItem(STORAGE_KEYS.MENTORSHIPS, JSON.stringify(mockMentorships));
    localStorage.setItem(STORAGE_KEYS.MENTORSHIP_NOTES, JSON.stringify(mockMentorshipNotes));
    localStorage.setItem(STORAGE_KEYS.EVALUATIONS, JSON.stringify(mockEvaluations));
    localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(mockMaterials));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(mockMessages));
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }
};

// Generic get function
const getItems = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Generic set function
const setItems = <T>(key: string, items: T[]) => {
  localStorage.setItem(key, JSON.stringify(items));
};

// USER OPERATIONS
export const getUsers = (): User[] => getItems<User>(STORAGE_KEYS.USERS);

export const getUserById = (id: string): User | undefined => {
  return getUsers().find(u => u.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const addUser = (user: Omit<User, 'id' | 'createdAt'>): User => {
  const users = getUsers();
  const newUser: User = {
    ...user,
    id: `${user.role}-${generateId()}`,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  setItems(STORAGE_KEYS.USERS, users);
  return newUser;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates };
  setItems(STORAGE_KEYS.USERS, users);
  return users[index];
};

export const deleteUser = (id: string): boolean => {
  const users = getUsers();
  const filtered = users.filter(u => u.id !== id);
  if (filtered.length === users.length) return false;
  setItems(STORAGE_KEYS.USERS, filtered);
  return true;
};

// AUTH OPERATIONS
export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const loginUser = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password && user.isActive) {
    setCurrentUser(user);
    return user;
  }
  return null;
};

export const logoutUser = () => {
  setCurrentUser(null);
};

// PROGRAMME OPERATIONS
export const getProgrammes = (): Programme[] => getItems<Programme>(STORAGE_KEYS.PROGRAMMES);

export const getProgrammeById = (id: string): Programme | undefined => {
  return getProgrammes().find(p => p.id === id);
};

export const addProgramme = (programme: Omit<Programme, 'id' | 'createdAt' | 'enrolledCount'>): Programme => {
  const programmes = getProgrammes();
  const newProgramme: Programme = {
    ...programme,
    id: `prog-${generateId()}`,
    enrolledCount: 0,
    createdAt: new Date().toISOString()
  };
  programmes.push(newProgramme);
  setItems(STORAGE_KEYS.PROGRAMMES, programmes);
  return newProgramme;
};

export const updateProgramme = (id: string, updates: Partial<Programme>): Programme | null => {
  const programmes = getProgrammes();
  const index = programmes.findIndex(p => p.id === id);
  if (index === -1) return null;
  programmes[index] = { ...programmes[index], ...updates };
  setItems(STORAGE_KEYS.PROGRAMMES, programmes);
  return programmes[index];
};

export const deleteProgramme = (id: string): boolean => {
  const programmes = getProgrammes();
  const filtered = programmes.filter(p => p.id !== id);
  if (filtered.length === programmes.length) return false;
  setItems(STORAGE_KEYS.PROGRAMMES, filtered);
  return true;
};

// SESSION OPERATIONS
export const getSessions = (): Session[] => getItems<Session>(STORAGE_KEYS.SESSIONS);

export const getSessionById = (id: string): Session | undefined => {
  return getSessions().find(s => s.id === id);
};

export const getSessionsByProgramme = (programmeId: string): Session[] => {
  return getSessions().filter(s => s.programmeId === programmeId);
};

export const addSession = (session: Omit<Session, 'id'>): Session => {
  const sessions = getSessions();
  const newSession: Session = {
    ...session,
    id: `session-${generateId()}`
  };
  sessions.push(newSession);
  setItems(STORAGE_KEYS.SESSIONS, sessions);
  return newSession;
};

export const updateSession = (id: string, updates: Partial<Session>): Session | null => {
  const sessions = getSessions();
  const index = sessions.findIndex(s => s.id === id);
  if (index === -1) return null;
  sessions[index] = { ...sessions[index], ...updates };
  setItems(STORAGE_KEYS.SESSIONS, sessions);
  return sessions[index];
};

export const deleteSession = (id: string): boolean => {
  const sessions = getSessions();
  const filtered = sessions.filter(s => s.id !== id);
  if (filtered.length === sessions.length) return false;
  setItems(STORAGE_KEYS.SESSIONS, filtered);
  return true;
};

// ENROLLMENT OPERATIONS
export const getEnrollments = (): Enrollment[] => getItems<Enrollment>(STORAGE_KEYS.ENROLLMENTS);

export const getEnrollmentsByTrainee = (traineeId: string): Enrollment[] => {
  return getEnrollments().filter(e => e.traineeId === traineeId);
};

export const getEnrollmentsByProgramme = (programmeId: string): Enrollment[] => {
  return getEnrollments().filter(e => e.programmeId === programmeId);
};

export const addEnrollment = (enrollment: Omit<Enrollment, 'id' | 'enrolledAt'>): Enrollment => {
  const enrollments = getEnrollments();
  const newEnrollment: Enrollment = {
    ...enrollment,
    id: `enroll-${generateId()}`,
    enrolledAt: new Date().toISOString()
  };
  enrollments.push(newEnrollment);
  setItems(STORAGE_KEYS.ENROLLMENTS, enrollments);
  
  // Update programme enrolled count
  const programme = getProgrammeById(enrollment.programmeId);
  if (programme) {
    updateProgramme(programme.id, { enrolledCount: programme.enrolledCount + 1 });
  }
  
  return newEnrollment;
};

// ATTENDANCE OPERATIONS
export const getAttendance = (): AttendanceRecord[] => getItems<AttendanceRecord>(STORAGE_KEYS.ATTENDANCE);

export const getAttendanceBySession = (sessionId: string): AttendanceRecord[] => {
  return getAttendance().filter(a => a.sessionId === sessionId);
};

export const getAttendanceByTrainee = (traineeId: string): AttendanceRecord[] => {
  return getAttendance().filter(a => a.traineeId === traineeId);
};

export const addAttendance = (record: Omit<AttendanceRecord, 'id' | 'markedAt'>): AttendanceRecord => {
  const attendance = getAttendance();
  const newRecord: AttendanceRecord = {
    ...record,
    id: `att-${generateId()}`,
    markedAt: new Date().toISOString()
  };
  attendance.push(newRecord);
  setItems(STORAGE_KEYS.ATTENDANCE, attendance);
  return newRecord;
};

export const updateAttendance = (id: string, updates: Partial<AttendanceRecord>): AttendanceRecord | null => {
  const attendance = getAttendance();
  const index = attendance.findIndex(a => a.id === id);
  if (index === -1) return null;
  attendance[index] = { ...attendance[index], ...updates };
  setItems(STORAGE_KEYS.ATTENDANCE, attendance);
  return attendance[index];
};

// MENTORSHIP OPERATIONS
export const getMentorships = (): MentorshipAssignment[] => getItems<MentorshipAssignment>(STORAGE_KEYS.MENTORSHIPS);

export const getMentorshipsByMentor = (mentorId: string): MentorshipAssignment[] => {
  return getMentorships().filter(m => m.mentorId === mentorId);
};

export const getMentorshipsByTrainee = (traineeId: string): MentorshipAssignment[] => {
  return getMentorships().filter(m => m.traineeId === traineeId);
};

export const addMentorship = (assignment: Omit<MentorshipAssignment, 'id' | 'assignedAt'>): MentorshipAssignment => {
  const mentorships = getMentorships();
  const newAssignment: MentorshipAssignment = {
    ...assignment,
    id: `mentor-assign-${generateId()}`,
    assignedAt: new Date().toISOString()
  };
  mentorships.push(newAssignment);
  setItems(STORAGE_KEYS.MENTORSHIPS, mentorships);
  return newAssignment;
};

// MENTORSHIP NOTES OPERATIONS
export const getMentorshipNotes = (): MentorshipNote[] => getItems<MentorshipNote>(STORAGE_KEYS.MENTORSHIP_NOTES);

export const getMentorshipNotesByAssignment = (assignmentId: string): MentorshipNote[] => {
  return getMentorshipNotes().filter(n => n.assignmentId === assignmentId);
};

export const getMentorshipNotesByMentor = (mentorId: string): MentorshipNote[] => {
  return getMentorshipNotes().filter(n => n.mentorId === mentorId);
};

export const addMentorshipNote = (note: Omit<MentorshipNote, 'id' | 'createdAt'>): MentorshipNote => {
  const notes = getMentorshipNotes();
  const newNote: MentorshipNote = {
    ...note,
    id: `note-${generateId()}`,
    createdAt: new Date().toISOString()
  };
  notes.push(newNote);
  setItems(STORAGE_KEYS.MENTORSHIP_NOTES, notes);
  return newNote;
};

// EVALUATION OPERATIONS
export const getEvaluations = (): PerformanceEvaluation[] => getItems<PerformanceEvaluation>(STORAGE_KEYS.EVALUATIONS);

export const getEvaluationsByTrainee = (traineeId: string): PerformanceEvaluation[] => {
  return getEvaluations().filter(e => e.traineeId === traineeId);
};

export const getEvaluationsByProgramme = (programmeId: string): PerformanceEvaluation[] => {
  return getEvaluations().filter(e => e.programmeId === programmeId);
};

export const addEvaluation = (evaluation: Omit<PerformanceEvaluation, 'id' | 'createdAt'>): PerformanceEvaluation => {
  const evaluations = getEvaluations();
  const newEvaluation: PerformanceEvaluation = {
    ...evaluation,
    id: `eval-${generateId()}`,
    createdAt: new Date().toISOString()
  };
  evaluations.push(newEvaluation);
  setItems(STORAGE_KEYS.EVALUATIONS, evaluations);
  return newEvaluation;
};

// MATERIALS OPERATIONS
export const getMaterials = (): TrainingMaterial[] => getItems<TrainingMaterial>(STORAGE_KEYS.MATERIALS);

export const getMaterialsByProgramme = (programmeId: string): TrainingMaterial[] => {
  return getMaterials().filter(m => m.programmeId === programmeId);
};

export const addMaterial = (material: Omit<TrainingMaterial, 'id' | 'uploadedAt'>): TrainingMaterial => {
  const materials = getMaterials();
  const newMaterial: TrainingMaterial = {
    ...material,
    id: `mat-${generateId()}`,
    uploadedAt: new Date().toISOString()
  };
  materials.push(newMaterial);
  setItems(STORAGE_KEYS.MATERIALS, materials);
  return newMaterial;
};

export const deleteMaterial = (id: string): boolean => {
  const materials = getMaterials();
  const filtered = materials.filter(m => m.id !== id);
  if (filtered.length === materials.length) return false;
  setItems(STORAGE_KEYS.MATERIALS, filtered);
  return true;
};

// MESSAGE OPERATIONS
export const getMessages = (): Message[] => getItems<Message>(STORAGE_KEYS.MESSAGES);

export const getMessagesByUser = (userId: string): Message[] => {
  return getMessages().filter(m => m.senderId === userId || m.receiverId === userId);
};

export const getInboxMessages = (userId: string): Message[] => {
  return getMessages().filter(m => m.receiverId === userId);
};

export const getSentMessages = (userId: string): Message[] => {
  return getMessages().filter(m => m.senderId === userId);
};

export const addMessage = (message: Omit<Message, 'id' | 'createdAt' | 'isRead'>): Message => {
  const messages = getMessages();
  const newMessage: Message = {
    ...message,
    id: `msg-${generateId()}`,
    isRead: false,
    createdAt: new Date().toISOString()
  };
  messages.push(newMessage);
  setItems(STORAGE_KEYS.MESSAGES, messages);
  return newMessage;
};

export const markMessageAsRead = (id: string): boolean => {
  const messages = getMessages();
  const index = messages.findIndex(m => m.id === id);
  if (index === -1) return false;
  messages[index].isRead = true;
  setItems(STORAGE_KEYS.MESSAGES, messages);
  return true;
};

// NOTIFICATION OPERATIONS
export const getNotifications = (): Notification[] => getItems<Notification>(STORAGE_KEYS.NOTIFICATIONS);

export const getNotificationsByUser = (userId: string): Notification[] => {
  return getNotifications().filter(n => n.userId === userId);
};

export const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>): Notification => {
  const notifications = getNotifications();
  const newNotification: Notification = {
    ...notification,
    id: `notif-${generateId()}`,
    isRead: false,
    createdAt: new Date().toISOString()
  };
  notifications.push(newNotification);
  setItems(STORAGE_KEYS.NOTIFICATIONS, notifications);
  return newNotification;
};

export const markNotificationAsRead = (id: string): boolean => {
  const notifications = getNotifications();
  const index = notifications.findIndex(n => n.id === id);
  if (index === -1) return false;
  notifications[index].isRead = true;
  setItems(STORAGE_KEYS.NOTIFICATIONS, notifications);
  return true;
};

// STATS HELPERS
export const getAdminStats = () => {
  const users = getUsers();
  const programmes = getProgrammes();
  const attendance = getAttendance();
  
  const totalPresent = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const averageAttendance = attendance.length > 0 ? (totalPresent / attendance.length) * 100 : 0;
  
  return {
    totalUsers: users.length,
    totalTrainees: users.filter(u => u.role === 'trainee').length,
    totalTrainers: users.filter(u => u.role === 'trainer').length,
    totalMentors: users.filter(u => u.role === 'mentor').length,
    activeProgrammes: programmes.filter(p => p.status === 'ongoing').length,
    completedProgrammes: programmes.filter(p => p.status === 'completed').length,
    upcomingProgrammes: programmes.filter(p => p.status === 'upcoming').length,
    averageAttendance: Math.round(averageAttendance)
  };
};

export const getTrainerStats = (trainerId: string) => {
  const programmes = getProgrammes().filter(p => p.trainerId === trainerId);
  const programmeIds = programmes.map(p => p.id);
  const enrollments = getEnrollments().filter(e => programmeIds.includes(e.programmeId));
  const sessions = getSessions().filter(s => s.trainerId === trainerId);
  const materials = getMaterials().filter(m => programmeIds.includes(m.programmeId));
  
  const today = new Date().toISOString().split('T')[0];
  const upcomingSessions = sessions.filter(s => s.date >= today);
  
  return {
    assignedProgrammes: programmes.length,
    totalTrainees: new Set(enrollments.map(e => e.traineeId)).size,
    upcomingSessions: upcomingSessions.length,
    materialsUploaded: materials.length
  };
};

export const getMentorStats = (mentorId: string) => {
  const mentorships = getMentorshipsByMentor(mentorId);
  const notes = getMentorshipNotesByMentor(mentorId);
  
  return {
    assignedMentees: mentorships.length,
    activeMentorships: mentorships.filter(m => m.status === 'active').length,
    notesSubmitted: notes.length,
    averageMenteeProgress: 75 // Placeholder
  };
};

export const getTraineeStats = (traineeId: string) => {
  const enrollments = getEnrollmentsByTrainee(traineeId);
  const attendance = getAttendanceByTrainee(traineeId);
  const evaluations = getEvaluationsByTrainee(traineeId);
  const mentorships = getMentorshipsByTrainee(traineeId);
  
  const totalAttendance = attendance.length;
  const presentCount = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const attendanceRate = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;
  
  const avgPerformance = evaluations.length > 0
    ? evaluations.reduce((acc, e) => acc + e.overallScore, 0) / evaluations.length
    : 0;
  
  const activeMentor = mentorships.find(m => m.status === 'active');
  const mentor = activeMentor ? getUserById(activeMentor.mentorId) : null;
  
  return {
    enrolledProgrammes: enrollments.filter(e => e.status === 'active').length,
    completedProgrammes: enrollments.filter(e => e.status === 'completed').length,
    attendanceRate: Math.round(attendanceRate),
    averagePerformance: Math.round(avgPerformance * 20), // Convert to percentage
    assignedMentor: mentor ? `${mentor.firstName} ${mentor.lastName}` : undefined
  };
};

// Reset storage to initial state
export const resetStorage = () => {
  Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  initializeStorage();
};
