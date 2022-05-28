import { BasicStats } from "../App";

type BasicStatsProps = {
  data: BasicStats;
};

export function BasicStatsView(props: BasicStatsProps) {
  return (
    <>
      <div>
        <span>Last 15 minutes</span>
        <span>{props.data.count15mins[0].count}</span>
      </div>
      <div>
        <span>Last 1 hour</span>
        <span>{props.data.count1h[0].count}</span>
      </div>
      <div>
        <span>Last 24 hour</span>
        <span>{props.data.count24h[0].count}</span>
      </div>
      <div>
        <span>Since beginning</span>
        <span>{props.data.countAll[0].count}</span>
      </div>
    </>
  );
}
