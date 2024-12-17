import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import { useAuth } from './context/AuthContext';
import ViewIdeasPage from './pages/ViewIdeasPage';
import ReportsPage from './pages/ReportsPage';
import TimesheetsPage from './pages/TimesheetPage';
import PayrollPage from './pages/PayrollPage';

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin" element={user?.role === 'manager' ? <AdminDashboard /> : <LoginPage />} />
        <Route path="/employee" element={user?.role === 'employee' ? <EmployeeDashboard /> : <LoginPage />} />
        <Route path="/" element={<LoginPage />} />
  <Route path="/admin" element={user?.role === 'manager' ? <AdminDashboard /> : <LoginPage />} />
  <Route path="/employee" element={user?.role === 'employee' ? <EmployeeDashboard /> : <LoginPage />} />
  <Route path="/view-ideas" element={<ViewIdeasPage />} /> {/* New route */}
  <Route path= "/admin/reports" element={<ReportsPage/>}/>
  <Route path="/employee/timesheets" element ={<TimesheetsPage/>}/>    
  <Route path="/admin/payroll" element={<PayrollPage />} />
      </Routes>
    </Router>
  );
};

export default App;

