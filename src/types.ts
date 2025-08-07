export interface User {
  id: string;
  name: string;
  type: 'student' | 'faculty';
  email: string;
  year?: number;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  scheduledDate: Date;
  completedDate?: Date;
  isCompleted: boolean;
  subject: string;
  year: number;
}

export interface Subject {
  id: string;
  name: string;
  totalTopics: number;
  completedTopics: number;
  color: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  timestamp: Date;
  read: boolean;
}

export interface TimetableSlot {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial';
}