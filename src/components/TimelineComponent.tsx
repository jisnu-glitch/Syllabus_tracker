import React from 'react';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { Topic } from '../types';
import { format, isPast, isToday } from 'date-fns';

interface TimelineComponentProps {
  topics: Topic[];
  onToggle: (topicId: string) => void;
}

const TimelineComponent: React.FC<TimelineComponentProps> = ({ topics, onToggle }) => {
  const getTopicStatus = (topic: Topic) => {
    if (topic.isCompleted) return 'completed';
    if (isToday(topic.scheduledDate)) return 'today';
    if (isPast(topic.scheduledDate)) return 'overdue';
    return 'upcoming';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'today':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'today':
        return 'border-blue-500 bg-blue-50';
      case 'overdue':
        return 'border-red-500 bg-red-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {topics.map((topic, index) => {
          const status = getTopicStatus(topic);
          const isLast = index === topics.length - 1;

          return (
            <li key={topic.id}>
              <div className="relative pb-8">
                {!isLast && (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-3">
                  <div
                    className={`relative px-1 py-1 rounded-full ${getStatusColor(status)} border-2 flex items-center justify-center`}
                  >
                    {getStatusIcon(status)}
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-sm font-medium text-gray-900 ${topic.isCompleted ? '' : ''}`}>
                          {topic.name}
                        </h3>
                        <button
                          onClick={() => onToggle(topic.id)}
                          className={`ml-4 px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                            topic.isCompleted
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {topic.isCompleted ? 'Completed' : 'Mark Complete'}
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{topic.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                        <span>Scheduled: {format(topic.scheduledDate, 'MMM dd, yyyy')}</span>
                        {topic.completedDate && (
                          <span>Completed: {format(topic.completedDate, 'MMM dd, yyyy')}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TimelineComponent;