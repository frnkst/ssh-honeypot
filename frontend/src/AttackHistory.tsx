import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { AttackHistoryData } from "./App";

type AttackHistoryProps = {
  data: AttackHistoryData;
};

export function AttacksHistory(props: AttackHistoryProps) {
  //const dataNames = props.data.map((i) => i.password);

  //Chart style
  const style = {
    height: "30vh",
    width: "100vw",
  };

  const option = {
    xAxis: {
      type: "category",
      data: props.data.map((it) => it.date_trunc),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: props.data.map((it) => it.count),
        type: "bar",
      },
    ],
  };

  return <ReactEcharts option={option} style={style} className="pie-chart" />;
}
