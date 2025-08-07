import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Subject } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SubjectBarChartProps {
  subjects: Subject[];
}

const SubjectBarChart: React.FC<SubjectBarChartProps> = ({ subjects }) => {
  const data = {
    labels: subjects.map(subject => subject.name),
    datasets: [
      {
        label: 'Completed Topics',
        data: subjects.map(subject => subject.completedTopics),
        backgroundColor: subjects.map(subject => `${subject.color}80`),
        borderColor: subjects.map(subject => subject.color),
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Total Topics',
        data: subjects.map(subject => subject.totalTopics),
        backgroundColor: '#e5e7eb80',
        borderColor: '#e5e7eb',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SubjectBarChart;