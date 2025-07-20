import { Routes, Route, Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import InterviewDashboard from '../pages/InterviewDashboard';
import Interview from '@/pages/Interview';
import Feedback from '@/pages/Feedback';

export default function AppRoutes(){
  return(
    <Routes>
      <Route element={<MainLayout/>}>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/feedback/:mock_id" element={<ProtectedRoute><Feedback/></ProtectedRoute>} />
        <Route path="/interview/:mock_id" element={<ProtectedRoute><InterviewDashboard/></ProtectedRoute>} />
        <Route path="/interview/:mock_id/start" element={<ProtectedRoute><Interview/></ProtectedRoute>} />
      </Route>
      <Route path="/signin" element={<Login />} />
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
          Go back to homepage
        </Link>
      </div>
    );
};