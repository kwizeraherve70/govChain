import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProfileThunk } from '@/Redux/action/GetAllProfile';

ChartJS.register(ArcElement, Tooltip, Legend);

const ROLES = ['HIGH_OFFICIAL', 'LOCAL_LEADER', 'CITIZEN'];

const Chart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProfileThunk());
  }, [dispatch]);

  const { GetAllProfile } = useSelector((state) => state.AllProfile);
  const profiles = GetAllProfile || [];

  const roleCounts = ROLES.map(
    (role) => profiles.filter((p) => Object.keys(p.Role)[0] === role).length
  );

  const chartData = {
    labels: ROLES,
    datasets: [
      {
        label: 'Number of Users by Role',
        data: roleCounts,
        backgroundColor: [
          'rgba(234, 179,   8, 0.85)',  // Gold  — High Official
          'rgba(  6, 182, 212, 0.85)',  // Teal  — Local Leader
          'rgba(247,  37, 133, 0.85)',  // Pink  — Citizen
        ],
        borderColor: [
          'rgba(234, 179,   8, 1)',
          'rgba(  6, 182, 212, 1)',
          'rgba(247,  37, 133, 1)',
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
