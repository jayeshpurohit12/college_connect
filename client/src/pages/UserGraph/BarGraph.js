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
        backgroundColor: "#24b5b5",
        borderColor: "rgb(54,162,235)",
        data: props.data,
      },
    ],
  };

  return (
    <div>
      <div>
        <Bar
          data={data}
          options={{
            barThickness: 6,
            minBarLength: 2,
            scales: {
              y: {
                ticks: {
                  beginAtZero: true,
                  stepSize: 1,
                  max: 10,
                },
              },
            },
          }}
        />
        {/* <Pie data={data2}/> */}
      </div>
    </div>
  );
};

export default BarGraph;
