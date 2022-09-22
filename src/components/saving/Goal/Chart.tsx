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
import { useState, useEffect } from "react";
import { db } from "initialization/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
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
  const [steps, setSteps] = useState<any>(null);

  useEffect(() => {
    if (!steps?.legnth) {
      queryRelatedSteps();
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
    },
  };

  const queryRelatedSteps = async () => {
    const queries = query(
      collection(db, "steps"),
      where("parentId", "==", goal.id)
    );
    const { docs } = await getDocs(queries);
    const steps = docs.map((doc) => {
      const step = {
        id: doc.id,
        ...doc.data(),
      };

      return step;
    });
    setSteps(steps);
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

  const labels: any = constuctLabels();
  const data: any = {
    labels,
    datasets: [
      {
        label: "Steps",
        data: constructData(),
        borderColor: "rgba(93, 93, 93, 0.8)",
        backgroundColor: "rgba(93, 93, 93, 0.8)",
        pointRadius: 0,
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
