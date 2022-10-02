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

export const GoalChart = ({
  goal,
  setProgress,
}: {
  goal: any;
  setProgress: any;
}) => {
  const steps = useStepStore((state) => state.steps);
  const sortedSteps = steps[goal?.id]
    ? steps[goal?.id].sort(
        (a: any, b: any) => a.createdAt.seconds - b.createdAt.seconds
      )
    : [];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      label: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: (chart: any) => {
            const currentDescription =
              sortedSteps[sortedSteps.length - chart[0].dataIndex]?.description;

            if (chart[0].label === "Goal") {
              return "Goal";
            }
            return currentDescription ? currentDescription : "Starting Point";
          },
        },
      },
    },
  };

  const constuctLabels = () => {
    if (steps) {
      const labels = sortedSteps.map((step: any) => {
        return dayjs(dayjs.unix(step.createdAt.seconds)).format("DD/MM");
      });

      return ["0", ...labels];
    }
  };
  const constructData = () => {
    if (steps) {
      const amountArray = sortedSteps.map((step: any, index: number) => {
        let currentAmount = 0;
        let start = 0;
        while (start <= index && index <= sortedSteps.length - 1) {
          currentAmount = currentAmount + sortedSteps[start].amount * 1;
          start++;
        }
        return currentAmount;
      });

      if (amountArray[amountArray.length - 1]) {
        setProgress(
          Math.round(
            (amountArray[amountArray.length - 1] / goal?.goal) * 100 * 10
          ) / 10
        );
      } else {
        setProgress(0);
      }

      return [0, ...amountArray];
    }
  };
  const constructIds = () => {
    if (steps) {
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
