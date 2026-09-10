import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import UploadCsv from '../pages/UploadCsv.jsx';
import Jobs from '../pages/Jobs.jsx';
import DebugPanel from '../pages/DebugPanel.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload" element={<ProtectedRoute><UploadCsv /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/debug" element={<DebugPanel />} />
    </Routes>
  );
}
