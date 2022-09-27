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
import { useEffect } from "react";
import { useStepStore } from "state";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const GoalChart = ({ goal }: { goal: any }) => {
  const steps = useStepStore((state) => state.steps);
  const fetchStepsByGoalId = useStepStore((state) => state.fetchStepsByGoalId);

  useEffect(() => {
    if (!steps?.legnth) {
      fetchStepsByGoalId({ goalId: goal.id });
    }
  }, [goal.id]);

  const options = {
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
        text: goal.description,
      },
      tooltip: {
        callbacks: {
          title: (chart: any) => {
            const sortedSteps = steps.sort(
              (a: any, b: any) => a.createdAt.seconds > b.createdAt.seconds
            );
            return sortedSteps[chart[0].dataIndex - 1]?.description
              ? sortedSteps[chart[0].dataIndex - 1]?.description
              : "Starting Point";
          },
        },
      },
    },
  };

  const constuctLabels = () => {
    if (steps) {
      const labels = steps.map((step: any) =>
        dayjs(step.createdAt.seconds).format("DD/M")
      );
      return ["0", ...labels];
    }
  };
  const constructData = () => {
    if (steps) {
      const sortedSteps = steps.sort(
        (a: any, b: any) => a.createdAt.seconds > b.createdAt.seconds
      );
      const amountArray = sortedSteps.map((step: any, index: number) => {
        let currentAmount = 0;
        let start = 0;
        while (start <= index && index <= sortedSteps.length - 1) {
          currentAmount = currentAmount + sortedSteps[start].amount * 1;
          start++;
        }
        return currentAmount;
      });

      return [0, ...amountArray];
    }
  };
  const constructIds = () => {
    if (steps) {
      const sortedSteps = steps.sort(
        (a: any, b: any) => a.createdAt.seconds > b.createdAt.seconds
      );
      const stepIds = sortedSteps.map((step: any) => step.id);

      return stepIds;
    }
  };

  const labels: any = constuctLabels();
  const data: any = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: constructData(),
        borderColor: "rgba(93, 93, 93, 0.8)",
        backgroundColor: "rgba(93, 93, 93, 0.8)",
        pointRadius: 3,
        ids: constructIds(),
      },
      {
        label: "Max",
        data: [
          {
            x: "Goal",
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
