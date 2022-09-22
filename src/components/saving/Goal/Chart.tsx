import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    label: {
      display: false,
    },
    title: {
      display: true,
      font: {
        size: 30,
      },
      text: "Saving Goal Description",
    },
  },
};

export const GoalChart = ({ goal }: { goal: any }) => {
  // dummy data
  const labels: any[] = ["22/09", "23/09", "24/09", "25/09", "26/09", "27/09"];

  console.log("goal", goal);

  const data: any = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: [0, 300, 500, 700, 1000, 1200],
        borderColor: "rgba(93, 93, 93, 0.8)",
        backgroundColor: "rgba(93, 93, 93, 0.8)",
        pointRadius: 0,
      },
      {
        label: "Max",
        data: [
          {
            x: "26/09",
            y: goal.goal,
          },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 10,
      },
    ],
  };

  return <Line options={options} data={data} />;
};
