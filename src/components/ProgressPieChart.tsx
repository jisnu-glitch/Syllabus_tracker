import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Subject } from '../types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProgressPieChartProps {
  subjects: Subject[];
}

const ProgressPieChart: React.FC<ProgressPieChartProps> = ({ subjects }) => {
  const data = {
    labels: subjects.map(subject => subject.name),
    datasets: [
      {
        data: subjects.map(subject => 
          Math.round((subject.completedTopics / subject.totalTopics) * 100)
        ),
        backgroundColor: subjects.map(subject => subject.color),
        borderColor: subjects.map(subject => subject.color),
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const subject = subjects[context.dataIndex];
            return [
              `${context.label}: ${context.parsed}%`,
              `Completed: ${subject.completedTopics}/${subject.totalTopics} topics`,
              `Remaining: ${subject.totalTopics - subject.completedTopics} topics`
            ];
          },
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const totalTopics = subjects.reduce((sum, subject) => sum + subject.totalTopics, 0);
  const totalCompleted = subjects.reduce((sum, subject) => sum + subject.completedTopics, 0);
  const overallProgress = Math.round((totalCompleted / totalTopics) * 100);

  return (
    <div className="relative">
      <div className="h-64 mb-4">
        <Pie data={data} options={options} />
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-gray-800 mb-2">{overallProgress}%</div>
        <div className="text-sm text-gray-600">
          Overall Progress ({totalCompleted}/{totalTopics} topics completed)
        </div>
      </div>
    </div>
  );
};

export default ProgressPieChart;