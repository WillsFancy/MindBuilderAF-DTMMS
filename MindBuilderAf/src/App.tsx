import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/UsersPage";
import ProgrammesPage from "./pages/admin/ProgrammesPage";

// Trainer Pages
import TrainerDashboard from "./pages/trainer/TrainerDashboard";

// Mentor Pages
import MentorDashboard from "./pages/mentor/MentorDashboard";

// Trainee Pages
import TraineeDashboard from "./pages/trainee/TraineeDashboard";

// Shared Pages
import AttendancePage from "./pages/shared/AttendancePage";
import MessagesPage from "./pages/shared/MessagesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/programmes" element={<ProtectedRoute allowedRoles={['admin']}><ProgrammesPage /></ProtectedRoute>} />
            <Route path="/admin/sessions" element={<ProtectedRoute allowedRoles={['admin']}><ProgrammesPage /></ProtectedRoute>} />
            <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={['admin']}><AttendancePage /></ProtectedRoute>} />
            <Route path="/admin/mentorships" element={<ProtectedRoute allowedRoles={['admin']}><UsersPage /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={['admin']}><MessagesPage /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

            {/* Trainer Routes */}
            <Route path="/trainer" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/trainer/programmes" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/trainer/sessions" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/trainer/attendance" element={<ProtectedRoute allowedRoles={['trainer']}><AttendancePage /></ProtectedRoute>} />
            <Route path="/trainer/materials" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/trainer/evaluations" element={<ProtectedRoute allowedRoles={['trainer']}><TrainerDashboard /></ProtectedRoute>} />
            <Route path="/trainer/messages" element={<ProtectedRoute allowedRoles={['trainer']}><MessagesPage /></ProtectedRoute>} />

            {/* Mentor Routes */}
            <Route path="/mentor" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
            <Route path="/mentor/mentees" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
            <Route path="/mentor/progress" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
            <Route path="/mentor/notes" element={<ProtectedRoute allowedRoles={['mentor']}><MentorDashboard /></ProtectedRoute>} />
            <Route path="/mentor/messages" element={<ProtectedRoute allowedRoles={['mentor']}><MessagesPage /></ProtectedRoute>} />

            {/* Trainee Routes */}
            <Route path="/trainee" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/programmes" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/schedule" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/materials" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/attendance" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/performance" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/mentor" element={<ProtectedRoute allowedRoles={['trainee']}><TraineeDashboard /></ProtectedRoute>} />
            <Route path="/trainee/messages" element={<ProtectedRoute allowedRoles={['trainee']}><MessagesPage /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
