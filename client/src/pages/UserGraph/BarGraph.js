import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.heading,
        barPercentage: 0.5,
        barThickness: 6,
        maxBarThickness: 8,
        minBarLength: 2,
        backgroundColor: "#24b5b5",
        borderColor: "rgb(54,162,235)",
        data: props.data,
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar data={data} />
        {/* <Pie data={data2}/> */}
      </div>
    </div>
  );
};

export default BarGraph;
