import React, { useState, useEffect } from 'react';
import { LogOut, Calendar, Bell, Plus, ChevronDown } from 'lucide-react';
import { User, Topic, Notification } from '../types';
import TimelineComponent from './TimelineComponent';
import AddTopicModal from './AddTopicModal';
import TopicProgressChart from './TopicProgressChart';

interface FacultyDashboardProps {
  user: User | null;
  onLogout: () => void;
  onPageChange: (page: string) => void;
}

const FacultyDashboard: React.FC<FacultyDashboardProps> = ({
  user,
  onLogout,
  onPageChange,
}) => {
  const [selectedYear, setSelectedYear] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddTopic, setShowAddTopic] = useState(false);

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      name: 'Introduction to Calculus',
      description: 'Basic concepts of differentiation and integration',
      scheduledDate: new Date('2024-01-15'),
      completedDate: new Date('2024-01-15'),
      isCompleted: true,
      subject: 'Mathematics',
      year: 1,
    },
    {
      id: '2',
      name: 'Linear Algebra',
      description: 'Vectors, matrices and linear transformations',
      scheduledDate: new Date('2024-01-20'),
      isCompleted: false,
      subject: 'Mathematics',
      year: 1,
    },
    {
      id: '3',
      name: 'Probability Theory',
      description: 'Basic probability concepts and distributions',
      scheduledDate: new Date('2024-01-25'),
      isCompleted: false,
      subject: 'Mathematics',
      year: 2,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Linear Algebra topic is 2 days behind schedule',
      type: 'warning',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      message: 'Calculus module completed successfully',
      type: 'success',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);

  const filteredTopics = topics.filter(topic => topic.year === selectedYear);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleTopicToggle = (topicId: string) => {
    setTopics(prev =>
      prev.map(topic =>
        topic.id === topicId
          ? {
              ...topic,
              isCompleted: !topic.isCompleted,
              completedDate: !topic.isCompleted ? new Date() : undefined,
            }
          : topic
      )
    );
  };

  const handleAddTopic = (newTopic: Omit<Topic, 'id'>) => {
    const topic: Topic = {
      ...newTopic,
      id: Math.random().toString(36),
    };
    setTopics(prev => [...prev, topic]);
    setShowAddTopic(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {showAddTopic && (
        <AddTopicModal
          onClose={() => setShowAddTopic(false)}
          onSubmit={handleAddTopic}
        />
      )}

      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Faculty Dashboard - {user?.name}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddTopic(true)}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Add Topic</span>
              </button>
              <button
                onClick={() => onPageChange('faculty-timetable')}
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
        {/* Year Selector */}
        <div className="mb-6">
          <div className="relative inline-block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Syllabus Progress - Year {selectedYear}
            </h2>
            <TimelineComponent
              topics={filteredTopics}
              onToggle={handleTopicToggle}
            />
          </div>

          {/* Topic Progress Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Topic Progress Overview
            </h2>
            <TopicProgressChart topics={filteredTopics} />
          </div>
        </div>
        <CollaborativeChecklist />
      </main>
    </div>
  );
};

export default FacultyDashboard;