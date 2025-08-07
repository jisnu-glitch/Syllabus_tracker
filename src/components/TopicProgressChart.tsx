import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Topic } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TopicProgressChartProps {
  topics: Topic[];
}

const TopicProgressChart: React.FC<TopicProgressChartProps> = ({ topics }) => {
  const subjects = [...new Set(topics.map(topic => topic.subject))];
  
  const chartData = subjects.map(subject => {
    const subjectTopics = topics.filter(topic => topic.subject === subject);
    const completedTopics = subjectTopics.filter(topic => topic.isCompleted).length;
    return {
      subject,
      total: subjectTopics.length,
      completed: completedTopics,
      percentage: subjectTopics.length > 0 ? Math.round((completedTopics / subjectTopics.length) * 100) : 0,
    };
  });

  const data = {
    labels: chartData.map(item => item.subject),
    datasets: [
      {
        label: 'Completed',
        data: chartData.map(item => item.completed),
        backgroundColor: '#10B981',
        borderColor: '#059669',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Remaining',
        data: chartData.map(item => item.total - item.completed),
        backgroundColor: '#E5E7EB',
        borderColor: '#D1D5DB',
        borderWidth: 1,
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
        callbacks: {
          afterLabel: function(context: any) {
            const dataIndex = context.dataIndex;
            const percentage = chartData[dataIndex].percentage;
            return `Progress: ${percentage}%`;
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (topics.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No topics available for this year
      </div>
    );
  }

  return (
    <div className="h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TopicProgressChart;