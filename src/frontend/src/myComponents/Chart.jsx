import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const data = [
  { Role: 'HIGH_OFFICIAL', count: 0 },
  { Role: 'LOCAL_LEADER', count: 5 },
  { Role: 'CITIZEN', count: 5},
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
          'rgba(75, 192, 192, 0.6)', // High Official
          'rgba(255, 206, 86, 0.6)', // Local Leader
          'rgba(54, 162, 235, 0.6)', // Citizen
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Distribution by Role',
      },
    },
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <h2 className="text-lg font-bold mb-4 text-center">Users by Role</h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default Chart;
