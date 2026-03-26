import React,{useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProgramThunk } from '@/Redux/action/GetAllProgram';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const programs = [

//   {
//     ProgramId: '2',
//     Name: 'Program B',
//     LocalLeaders: ['Leader 3'],
//     RequestCitizens: ['Citizen 4', 'Citizen 5'],
//     Citizens: ['Citizen 6'],
//     Beneficials: 80,
//   },
//   {
//     ProgramId: '3',
//     Name: 'Program C',
//     LocalLeaders: [],
//     RequestCitizens: [],
//     Citizens: ['Citizen 7', 'Citizen 8', 'Citizen 9'],
//     Beneficials: 150,
//   },
// ];

const GroupedBarChart = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
  }, [dispatch])
  const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
  const programs = Allprogram || []
  const programNames = programs.map((program) => program.Name);
  const localLeadersCounts = programs.map((program) => program.LocalLeaders.length);
  const requestCitizensCounts = programs.map((program) => program.RequestCitizens.length);
  const citizensCounts = programs.map((program) => program.Citizens.length);
  const beneficialsCounts = programs.map((program) => program.Beneficials);

  const chartData = {
    labels: programNames,
    datasets: [
      {
        label: 'Local Leaders',
        data: localLeadersCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Request Citizens',
        data: requestCitizensCounts,
        backgroundColor: 'rgba(255, 206, 86, 0.6)', // Yellow
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
      {
        label: 'Citizens',
        data: citizensCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Green
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Beneficials',
        data: beneficialsCounts,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: 'Program Details Comparison',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Programs',
        },
        stacked: false,
        grid: {
          display: false, // Disable grid lines for X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        beginAtZero: true,
        stacked: false,
        grid: {
          drawBorder: false,
          drawTicks: true,
          drawOnChartArea: false, // Disable grid lines for Y-axis
        },
      },
    },
  };

  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl P-6">
      <h2 className="text-lg font-bold mb-4 text-center mt-2">Programs</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default GroupedBarChart;
