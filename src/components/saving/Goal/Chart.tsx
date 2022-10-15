import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BarController,
  LineElement,
  LineController,
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
  BarController,
  PointElement,
  LineElement,
  LineController,
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
      let increment = 0;
      const labels = sortedSteps.map((step: any, index: number) => {
        const dateNTime = dayjs(dayjs.unix(step.createdAt)).format("DD/MM");

        if (index > 0 && index < sortedSteps.length) {
          const dateNTimePlus =
            index !== sortedSteps.length - 1 &&
            dayjs(dayjs.unix(sortedSteps[index + 1].createdAt)).format("DD/MM");

          const dateNTimeMinus = dayjs(
            dayjs.unix(sortedSteps[index - 1].createdAt)
          ).format("DD/MM");

          if (dateNTime === dateNTimePlus || dateNTime === dateNTimeMinus) {
            increment++;
            return `${dateNTime} [${increment - 1}]`;
          }
        }

        return dateNTime;
      });

      const newLabel = ["Start", ...labels];

      return newLabel;
    }
  };
  const currentLabels = constuctLabels();

  const constructData = () => {
    if (steps) {
      let total = 0;
      const amountArray = sortedSteps.map((step: any, index: number) => {
        total += step.amount * 1;
        return total;
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

  // up & down to compare current y value of a line element to the next one
  // link for help : https://www.youtube.com/watch?v=st2O-pvhWM4
  const up = (ctx: any, value: any) =>
    ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;

  const down = (ctx: any, value: any) =>
    ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

  const labels: any = constuctLabels();
  const data: any = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Data",
        data: constructData(),
        pointRadius: 3,
        ids: constructIds(),
        segment: {
          borderColor: (ctx: any) => up(ctx, "#1df024") || down(ctx, "#f70c30"),
          backgroundColor: (ctx: any) =>
            up(ctx, "#1df024") || down(ctx, "#f70c30"),
        },
      },
      {
        type: "bar" as const,
        label: "MileStones",
        data: constuctMileStones(),
        borderColor: constructMileStonesBackgrounds(),
        backgroundColor: constructMileStonesBackgrounds(),
      },
      {
        type: "line",
        label: "Max",
        data: [
          {
            x: currentLabels![currentLabels!.length - 1],
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
