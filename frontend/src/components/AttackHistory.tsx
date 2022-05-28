import * as React from "react";
import ReactEcharts from "echarts-for-react";
import { AttackHistoryData } from "../App";

type AttackHistoryProps = {
  data: AttackHistoryData;
};

export function AttacksHistory(props: AttackHistoryProps) {
  //const dataNames = props.data.map((i) => i.password);

  const dateList = props.data.map(function (item) {
    return new Date(item.date_trunc).toLocaleString();
  });
  const valueList = props.data.map(function (item) {
    return item.count;
  });

  const option = {
    // Make gradient line here
    visualMap: [
      {
        show: false,
        type: "continuous",
        seriesIndex: 0,
        min: 0,
        max: 400,
      },
      {
        show: false,
        type: "continuous",
        seriesIndex: 1,
        dimension: 0,
        min: 0,
        max: dateList.length - 1,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
    xAxis: [
      {
        data: dateList,
      },
    ],
    yAxis: [{}],
    series: [
      {
        type: "line",
        showSymbol: false,
        data: valueList,
      },
    ],
  };

  return <ReactEcharts option={option} />;
}
