import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useStepStore, useMileStonesStore } from "state";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const GoalChart = ({ goal }: { goal: any; setProgress: any }) => {
  const steps = useStepStore((state) => state.steps);
  const sortedSteps = steps[goal?.id]
    ? steps[goal?.id].sort((a: any, b: any) => a.createdAt - b.createdAt)
    : [];
  const milestones = useMileStonesStore((state) => state.milestones);

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
            if (chart[0].label === "Goal") {
              return "Goal";
            }

            if (chart[0].dataset.label === "MileStones") {
              return chart[0].label;
            }

            const currentDescription =
              sortedSteps[sortedSteps.length - chart[0].dataIndex]?.description;
            return currentDescription ? currentDescription : "Starting Point";
          },
        },
      },
    },
  };

  const constuctLabels = () => {
    if (steps) {
      const labels = sortedSteps.map((step: any) => {
        return dayjs(dayjs.unix(step.createdAt)).format("DD/MM");
      });

      return ["Start", ...labels];
    }
  };

  const constructDataV2 = (type: string) => {
    if (steps) {
      const amountArray = sortedSteps.map((step: any, index: number) => {
        if (type === "Earn") {
          const nextStepOfEarn = sortedSteps[index + 1]?.amount;
          if (nextStepOfEarn && Math.sign(nextStepOfEarn) === 1) {
            const currentArr = sortedSteps.slice(0, index + 1);
            const currentTotalAmount = currentArr.reduce(
              (total: number, step: any) => {
                return (total += step.amount * 1);
              },
              0
            );
            return currentTotalAmount;
          }

          if (Math.sign(step.amount) === -1) {
            return null;
          }
          const currentArr = sortedSteps.slice(0, index + 1);
          const currentTotalAmount = currentArr.reduce(
            (total: number, step: any) => {
              return (total += step?.amount * 1);
            },
            0
          );

          return currentTotalAmount;
        } else {
          const nextStepOfLoss = sortedSteps[index + 1]?.amount;
          if (nextStepOfLoss && Math.sign(nextStepOfLoss) === -1) {
            const currentArr = sortedSteps.slice(0, index + 1);
            const currentTotalAmount = currentArr.reduce(
              (total: number, step: any) => {
                return (total += step.amount * 1);
              },
              0
            );
            return currentTotalAmount;
          }

          if (Math.sign(step.amount) === 1) {
            return null;
          }

          const currentArr = sortedSteps.slice(0, index + 1);
          const currentTotalAmount = currentArr.reduce(
            (total: number, step: any) => {
              return (total += step.amount * 1);
            },
            0
          );

          return currentTotalAmount;
        }
      });

      return [0, ...amountArray];
    }
  };
  const constructIds = () => {
    if (steps) {
      const stepIds = sortedSteps.map((step: any) => step.id);

      return stepIds;
    }
  };

  const constuctMileStones = () => {
    if (milestones[goal?.id]) {
      const currentLabels = constuctLabels();
      const milestonesPosition = milestones[goal.id]
        .map((milestone: any) => {
          return {
            x: currentLabels![currentLabels!.length - 1],
            y: milestone.amount,
          };
        })
        .sort((a: any, b: any) => a.y > b.y);

      return milestonesPosition.reverse();
    }

    return [];
  };

  const constructMileStonesBackgrounds = () => {
    if (milestones[goal?.id]) {
      const milestoneColor = milestones[goal.id]
        .map((milestone: any) => {
          return milestone.color;
        })
        .sort((a: any, b: any) => a.y > b.y);

      return milestoneColor;
    }

    return [];
  };

  const labels: any = constuctLabels();
  const data: any = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Earn",
        data: constructDataV2("Earn"),
        borderColor: "#1df024",
        backgroundColor: "#1df024",
        pointRadius: 3,
        ids: constructIds(),
      },
      {
        type: "line" as const,
        label: "Loss",
        data: constructDataV2("Loss"),
        borderColor: "#f70c30",
        backgroundColor: "#f70c30",
        pointRadius: 3,
        ids: constructIds(),
      },
      {
        type: "bar" as const,
        label: "MileStones",
        data: constuctMileStones(),
        borderColor: constructMileStonesBackgrounds(),
        backgroundColor: constructMileStonesBackgrounds(),
        pointRadius: 4,
      },
      {
        type: "line" as const,
        label: "Max",
        data: [
          {
            x: "Goal",
            y: goal.goal,
          },
        ],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 15,
      },
    ],
  };

  return <Chart type="bar" options={options} data={data} />;
};
