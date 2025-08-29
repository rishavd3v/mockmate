import { Routes, Route, Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import InterviewDashboard from '../pages/InterviewDashboard';
import Interview from '@/pages/Interview';
import Feedback from '@/pages/Feedback';
import Upgrade from '@/pages/Upgrade';
import Profile from '@/pages/Profile';
import Landing from '@/pages/Landing';
import PublicRoute from '@/components/Auth/PublicRoute';
import Login from '@/pages/Login';

export default function AppRoutes(){
  return(
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<MainLayout/>}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/feedback/:mock_id" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
        <Route path="/interview/:mock_id" element={<ProtectedRoute><InterviewDashboard/></ProtectedRoute>} />
        <Route path="/upgrade" element={<ProtectedRoute><Upgrade/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
      </Route>
      <Route path="/interview/:mock_id/start" element={<ProtectedRoute><Interview/></ProtectedRoute>} />
      <Route path="/signin" element={<PublicRoute><Login/></PublicRoute>} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

function NotFound(){
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-4">404 - Page Not Found!</h1>
        <p className="text-sm mb-6">Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/dashboard" className="text-sm text-blue-500 underline">
          Go back to dashboard
        </Link>
      </div>
    );
};