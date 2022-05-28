import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { BasicStats, Passwords } from "../App";

type BasicStatsProps = {
  data: BasicStats;
};

export function TestChart(props: BasicStatsProps) {
  const rate = (Number(props.data.count15mins[0].count) / 15).toFixed(2);

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
        min: 1,
        max: 10,
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
            value: rate,
            name: "apm",
          },
        ],
      },
    ],
  };
  return <ReactEcharts option={option} style={style} className="pie-chart" />;
}
