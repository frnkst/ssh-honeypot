import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { forIn } from "lodash";
import countBy from "lodash/countBy";
import { Logins } from "./App";

ChartJS.register(ArcElement, Tooltip, Legend);

type TestChartProps = {
  data: Logins;
};

export function TestChart(props: TestChartProps) {
  const countByUsername: any = [];
  forIn(countBy(props.data, "username"), function (value, key) {
    countByUsername.push({ username: key, count: value });
  });

  const data = {
    labels: countByUsername.map((it: any) => it.username),
    datasets: [
      {
        label: "# of Votes",
        data: countByUsername.map((it: any) => it.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={data} />;
}
