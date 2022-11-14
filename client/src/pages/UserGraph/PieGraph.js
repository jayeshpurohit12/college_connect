import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieGraph = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.heading,
        data: props.data,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <div>
        <Pie data={data} />
        {/* <Pie data={data2}/> */}
      </div>
    </div>
  );
};

export default PieGraph;
