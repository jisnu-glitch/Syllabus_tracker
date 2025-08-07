import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import StudentDashboard from './components/StudentDashboard';
import FacultyDashboard from './components/FacultyDashboard';
import StudentTimetable from './components/StudentTimetable';
import FacultyTimetable from './components/FacultyTimetable';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('login');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage(user.type === 'student' ? 'student-dashboard' : 'faculty-dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'student-dashboard':
        return (
          <StudentDashboard
            user={currentUser}
            onLogout={handleLogout}
            onPageChange={handlePageChange}
          />
        );
      case 'faculty-dashboard':
        return (
          <FacultyDashboard
            user={currentUser}
            onLogout={handleLogout}
            onPageChange={handlePageChange}
          />
        );
      case 'student-timetable':
        return (
          <StudentTimetable
            user={currentUser}
            onBack={() => setCurrentPage('student-dashboard')}
          />
        );
      case 'faculty-timetable':
        return (
          <FacultyTimetable
            user={currentUser}
            onBack={() => setCurrentPage('faculty-dashboard')}
          />
        );
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {renderCurrentPage()}
    </div>
  );
}

export default App;