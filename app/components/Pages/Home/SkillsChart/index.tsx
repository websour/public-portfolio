import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface SkillsChartProps {
  activeData: number | null; // activeDataが数値であると仮定
}
const SkillsChart = ({ activeData }: SkillsChartProps): JSX.Element => {

  const options = {
    responsive: true,
    plugins: {
      align: 'top',
      legend: {
        display: false,
        position: 'top' as const,
      },
    },
    layout: {
      padding: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    scale: {
      ticks: { beginAtZero: true },
    },
    scales: {
      r: {
        min: 0,
        max: 10,
        stepSize: 1,
      },
    },
  };

  const labels = ['スキルレベル', '成果', 'コミュニケーション', '理解力'];
  const borderWidth = 3;

  interface FrameworksData {
    [key: number]: { borderColor: string; data: number[]; };
  }

  const frameworksData: FrameworksData = {
    1: { borderColor: '#5ed3f3', data: [5, 5, 5, 5] },
    2: { borderColor: '#bd002e', data: [4, 4, 4, 4] },
    3: { borderColor: '#3fb27f', data: [7, 5, 5, 8] },
    4: { borderColor: '#207195', data: [9, 9, 9, 9] },
    5: { borderColor: '#dd4b25', data: [10, 10, 10, 10] },
    6: { borderColor: '#146eb1', data: [10, 10, 10, 10] },
    7: { borderColor: '#efd81d', data: [8, 8, 8, 8] },
    8: { borderColor: '#4d588e', data: [8, 8, 8, 8] },
  };

  const getDataset = (activeData: number | null) => {
    const isValidIndex = typeof activeData === 'number';
    return {
      labels: labels,
      datasets: [
        {
          label: '評価指数',
          data: isValidIndex ? frameworksData[activeData].data : [],
          backgroundColor: '#fff',
          borderColor: isValidIndex ? frameworksData[activeData].borderColor : '#ddd',
          borderWidth: borderWidth,
        },
      ],
    };
  };

  const [data, setData] = useState(getDataset(activeData));

  useEffect(() => {
    setData(getDataset(activeData));
  }, [activeData]);

  return <Radar width={420} height={420} data={data} options={options} />;
};

export default SkillsChart;