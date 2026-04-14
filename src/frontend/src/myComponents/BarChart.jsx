import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProgramThunk } from '@/Redux/action/GetAllProgram';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GroupedBarChart = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProgramThunk());
  }, [dispatch]);

  const { Allprogram } = useSelector((state) => state.AllProgram);
  const programs = Allprogram || [];

  const programNames          = programs.map((p) => p.Name);
  const localLeadersCounts    = programs.map((p) => p.LocalLeaders.length);
  const requestCitizensCounts = programs.map((p) => p.RequestCitizens.length);
  const citizensCounts        = programs.map((p) => p.Citizens.length);
  const beneficialsCounts     = programs.map((p) => p.Beneficials);

  const chartData = {
    labels: programNames,
    datasets: [
      {
        label: 'Local Leaders',
        data: localLeadersCounts,
        backgroundColor: 'rgba(124, 58, 237, 0.75)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Requested Citizens',
        data: requestCitizensCounts,
        backgroundColor: 'rgba(247, 37, 133, 0.75)',
        borderColor: 'rgba(247, 37, 133, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Citizens',
        data: citizensCounts,
        backgroundColor: 'rgba(147, 51, 234, 0.75)',
        borderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Beneficials',
        data: beneficialsCounts,
        backgroundColor: 'rgba(16, 185, 129, 0.75)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 6,
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
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      title: { display: false },
    },
    scales: {
      x: {
        ticks:  { color: 'rgba(255,255,255,0.5)', font: { size: 11 } },
        grid:   { color: 'rgba(255,255,255,0.05)' },
        border: { color: 'rgba(255,255,255,0.1)' },
      },
      y: {
        beginAtZero: true,
        ticks:  { color: 'rgba(255,255,255,0.5)', font: { size: 11 } },
        grid:   { color: 'rgba(255,255,255,0.05)' },
        border: { color: 'rgba(255,255,255,0.1)' },
      },
    },
  };

  return (
    <div className="col-span-full xl:col-span-8
                    bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                    rounded-2xl p-6 shadow-card">
      <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
        Program Overview
      </h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GroupedBarChart;
