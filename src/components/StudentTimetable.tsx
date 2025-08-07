import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { User, TimetableSlot } from '../types';

interface StudentTimetableProps {
  user: User | null;
  onBack: () => void;
}

const StudentTimetable: React.FC<StudentTimetableProps> = ({ user, onBack }) => {
  const timetableData: TimetableSlot[] = [
    { id: '1', day: 'Monday', time: '09:00-10:00', subject: 'Mathematics', room: 'Room 101', type: 'lecture' },
    { id: '2', day: 'Monday', time: '10:00-11:00', subject: 'Physics', room: 'Room 102', type: 'lecture' },
    { id: '3', day: 'Monday', time: '11:00-12:00', subject: 'Chemistry', room: 'Lab 201', type: 'lab' },
    { id: '4', day: 'Tuesday', time: '09:00-10:00', subject: 'Biology', room: 'Room 103', type: 'lecture' },
    { id: '5', day: 'Tuesday', time: '10:00-11:00', subject: 'English', room: 'Room 104', type: 'lecture' },
    { id: '6', day: 'Tuesday', time: '11:00-12:00', subject: 'Mathematics', room: 'Room 101', type: 'tutorial' },
    { id: '7', day: 'Wednesday', time: '09:00-10:00', subject: 'Physics', room: 'Lab 202', type: 'lab' },
    { id: '8', day: 'Wednesday', time: '10:00-11:00', subject: 'Chemistry', room: 'Room 102', type: 'lecture' },
    { id: '9', day: 'Thursday', time: '09:00-10:00', subject: 'Biology', room: 'Lab 203', type: 'lab' },
    { id: '10', day: 'Thursday', time: '10:00-11:00', subject: 'English', room: 'Room 104', type: 'tutorial' },
    { id: '11', day: 'Friday', time: '09:00-10:00', subject: 'Mathematics', room: 'Room 101', type: 'lecture' },
    { id: '12', day: 'Friday', time: '10:00-11:00', subject: 'Physics', room: 'Room 102', type: 'tutorial' },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00-10:00', '10:00-11:00', '11:00-12:00'];

  const getTimetableSlot = (day: string, time: string) => {
    return timetableData.find(slot => slot.day === day && slot.time === time);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lecture':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'lab':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'tutorial':
        return 'bg-purple-100 border-purple-300 text-purple-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">
                My Timetable - {user?.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center mb-6">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Weekly Schedule</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-50 p-3 text-left font-semibold text-gray-700">
                    Time
                  </th>
                  {days.map(day => (
                    <th key={day} className="border border-gray-300 bg-gray-50 p-3 text-center font-semibold text-gray-700">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(time => (
                  <tr key={time}>
                    <td className="border border-gray-300 bg-gray-50 p-3 font-medium text-gray-700 text-center">
                      {time}
                    </td>
                    {days.map(day => {
                      const slot = getTimetableSlot(day, time);
                      return (
                        <td key={`${day}-${time}`} className="border border-gray-300 p-2">
                          {slot ? (
                            <div className={`p-3 rounded-lg border-2 ${getTypeColor(slot.type)}`}>
                              <div className="font-semibold text-sm">{slot.subject}</div>
                              <div className="text-xs mt-1">{slot.room}</div>
                              <div className="text-xs mt-1 capitalize">
                                <span className="inline-block px-2 py-1 rounded-full bg-white bg-opacity-50">
                                  {slot.type}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="h-20 flex items-center justify-center text-gray-400">
                              Free
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded mr-2"></div>
              <span>Lecture</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded mr-2"></div>
              <span>Lab</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-100 border-2 border-purple-300 rounded mr-2"></div>
              <span>Tutorial</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentTimetable;