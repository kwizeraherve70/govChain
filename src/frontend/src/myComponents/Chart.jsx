import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = [
  { Role: 'HIGH_OFFICIAL', count: 0 },
  { Role: 'LOCAL_LEADER', count: 5 },
  { Role: 'CITIZEN', count: 5 },
];

const Chart = () => {
  const roleLabels = data.map((item) => item.Role);
  const roleCounts = data.map((item) => item.count);

  const chartData = {
    labels: roleLabels,
    datasets: [
      {
        label: 'Number of Users by Role',
        data: roleCounts,
        backgroundColor: [
          'rgba(124, 58, 237, 0.75)',  // Violet — High Official
          'rgba(147, 51, 234, 0.75)',  // Purple — Local Leader
          'rgba(247, 37, 133, 0.75)', // Pink   — Citizen
        ],
        borderColor: [
          'rgba(124, 58, 237, 1)',
          'rgba(147, 51, 234, 1)',
          'rgba(247, 37, 133, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: 'rgba(255,255,255,0.65)',
          padding: 16,
          font: { size: 12 },
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4
                    bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                    rounded-2xl p-6 shadow-card">
      <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Users by Role
      </h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
