import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { Passwords } from "../App";

type TestChartProps = {
  data: Passwords;
};

export function TestChart(props: TestChartProps) {
  //Chart style
  const style = {
    height: "30vh",
    width: "30vw",
  };

  const option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        data: [
          {
            value: 50,
            name: "Attacks per minute",
          },
        ],
      },
    ],
  };
  return <ReactEcharts option={option} style={style} className="pie-chart" />;
}
