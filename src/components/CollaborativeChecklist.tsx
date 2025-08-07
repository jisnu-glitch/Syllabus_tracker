import React, { useState } from 'react';
import { Check, Users, Plus } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedBy?: string;
  timestamp?: Date;
}

const CollaborativeChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: '1',
      text: 'Complete Chapter 5 exercises',
      completed: true,
      completedBy: 'John Doe',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Submit lab report',
      completed: false,
    },
    {
      id: '3',
      text: 'Review lecture notes',
      completed: true,
      completedBy: 'Jane Smith',
      timestamp: new Date(Date.now() - 7200000),
    },
  ]);

  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
              completedBy: !item.completed ? 'Current User' : undefined,
              timestamp: !item.completed ? new Date() : undefined,
            }
          : item
      )
    );
  };

  const addItem = () => {
    if (newItem.trim()) {
      const item: ChecklistItem = {
        id: Math.random().toString(36),
        text: newItem.trim(),
        completed: false,
      };
      setItems(prev => [...prev, item]);
      setNewItem('');
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const progress = (completedCount / items.length) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-600" />
          Collaborative Checklist
        </h2>
        <div className="text-sm text-gray-600">
          {completedCount}/{items.length} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Add New Item */}
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button
          onClick={addItem}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
              item.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <button
              onClick={() => toggleItem(item.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                item.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 hover:border-blue-500'
              }`}
            >
              {item.completed && <Check className="w-4 h-4 text-white" />}
            </button>
            <div className="flex-1">
              <p className={`text-sm ${item.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                {item.text}
              </p>
              {item.completed && item.completedBy && (
                <p className="text-xs text-gray-500 mt-1">
                  Completed by {item.completedBy}
                  {item.timestamp && ` • ${item.timestamp.toLocaleString()}`}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborativeChecklist;