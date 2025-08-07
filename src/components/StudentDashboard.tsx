import React, { useState, useEffect } from 'react';
import { LogOut, Calendar, Bell, CheckSquare, BarChart3 } from 'lucide-react';
import { User, Subject, Notification } from '../types';
import ProgressPieChart from './ProgressPieChart';
import SubjectBarChart from './SubjectBarChart';
import CollaborativeChecklist from './CollaborativeChecklist';

interface StudentDashboardProps {
  user: User | null;
  onLogout: () => void;
  onPageChange: (page: string) => void;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({
  user,
  onLogout,
  onPageChange,
}) => {
  const [subjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', totalTopics: 20, completedTopics: 15, color: '#3B82F6' },
    { id: '2', name: 'Physics', totalTopics: 18, completedTopics: 12, color: '#10B981' },
    { id: '3', name: 'Chemistry', totalTopics: 16, completedTopics: 14, color: '#F59E0B' },
    { id: '4', name: 'Biology', totalTopics: 22, completedTopics: 8, color: '#EF4444' },
    { id: '5', name: 'English', totalTopics: 15, completedTopics: 13, color: '#8B5CF6' },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Physics exam in 3 days - Chapter 5 & 6',
      type: 'warning',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      message: 'Math assignment due tomorrow',
      type: 'warning',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '3',
      message: 'Complete Chemistry lab report by Friday',
      type: 'info',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
  ]);

  const [showNotifications, setShowNotifications] = useState(false);

  const totalTopics = subjects.reduce((sum, subject) => sum + subject.totalTopics, 0);
  const totalCompleted = subjects.reduce((sum, subject) => sum + subject.completedTopics, 0);
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome back, {user?.name}!
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onPageChange('student-timetable')}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Timetable"
              >
                <Calendar className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                title="Notifications"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-20 z-50 bg-white rounded-lg shadow-xl border w-80 max-h-96 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Notifications</h3>
          </div>
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <p className="text-sm text-gray-800">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
              Overall Course Progress
            </h2>
            <ProgressPieChart subjects={subjects} />
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Subject Progress</h2>
            <SubjectBarChart subjects={subjects} />
          </div>
        </div>

        {/* Tasks and Deadlines */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Tasks & Deadlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-red-400 font-bold">!</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Physics Exam</h3>
                  <p className="text-sm text-red-700">Due in 3 days</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-yellow-400 font-bold">⚠</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">Math Assignment</h3>
                  <p className="text-sm text-yellow-700">Due tomorrow</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-blue-400 font-bold">ℹ</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Lab Report</h3>
                  <p className="text-sm text-blue-700">Due Friday</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collaborative Checklist */}
        <CollaborativeChecklist />
      </main>
    </div>
  );
};

export default StudentDashboard;